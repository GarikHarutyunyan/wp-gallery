import TextField from '@mui/material/TextField';
import {TranslationsContext} from 'contexts/TranslationsContext';
import {ICategoryDTO, IGeneralSettings} from 'data-structures';
import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {useDebouncedSearch} from 'utils';
import {useData} from '../data-context/useData';
import './FilterProvider.css';

interface IFilterProviderProps {
  onSearch?: (newSearchTerm?: string) => void;
  settings: IGeneralSettings;
}

interface IDropdownOption {
  value: string;
  label: React.ReactNode;
}

interface IFilterDropdownProps {
  value: string;
  options: IDropdownOption[];
  onChange: (value: string) => void;
  align?: 'left' | 'right';
  activeColor?: string;
  activeTextColor?: string;
  inactiveColor?: string;
  inactiveTextColor?: string;
  borderRadius?: number;
  fontSize?: number;
  className?: string;
}

const FilterDropdown: React.FC<IFilterDropdownProps> = ({
  value,
  options,
  onChange,
  align = 'left',
  activeColor = '#1976d2',
  activeTextColor = '#ffffff',
  inactiveColor = '#f4f6f8',
  inactiveTextColor = '#333333',
  borderRadius = 4,
  fontSize = 13,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const selectedOption =
    options.find((opt) => opt.value === value) || options[0];

  return (
    <div
      ref={containerRef}
      className={`reacg-filter-dropdown-container ${className}`}
    >
      <button
        type="button"
        className={`reacg-filter-dropdown-trigger ${
          isOpen ? 'reacg-filter-dropdown-trigger--open' : ''
        }`}
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          backgroundColor: inactiveColor,
          color: inactiveTextColor,
          borderRadius: `${borderRadius}px`,
          fontSize: `${fontSize}px`,
          padding: '0 16px',
          gap: '12px',
        }}
      >
        <span>{selectedOption?.label}</span>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s ease',
            color: inactiveTextColor,
            flexShrink: 0,
          }}
        >
          <path
            d="M1 1L5 5L9 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`reacg-filter-dropdown-menu reacg-filter-dropdown-menu--${align}`}
          style={{
            borderRadius: `${borderRadius}px`,
            minWidth: '100%',
          }}
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <div
                key={option.value}
                className={`reacg-filter-dropdown-item ${
                  isSelected ? 'reacg-filter-dropdown-item--selected' : ''
                }`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                style={{
                  fontSize: `${fontSize}px`,
                  color: isSelected ? activeTextColor : '#2c3338',
                  backgroundColor: isSelected ? activeColor : 'transparent',
                }}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const SORTING_OPTIONS: IDropdownOption[] = [
  {value: 'default', label: 'DEFAULT SORTING'},
  {value: 'date_desc', label: 'DATE: NEW TO OLD'},
  {value: 'date_asc', label: 'DATE: OLD TO NEW'},
  {value: 'title_asc', label: 'TITLE: A–Z'},
  {value: 'title_desc', label: 'TITLE: Z–A'},
];

const FilterProvider: React.FC<IFilterProviderProps> = ({
  onSearch: propsOnSearch,
  settings,
}) => {
  const {
    enableFiltering,
    filterType = 'buttons',
    filterShowAll = true,
    filterAllText = '',
    filterShowCount = true,
    filterAlignment = 'left',
    filterActiveColor = '#1976d2',
    filterActiveTextColor = '#ffffff',
    filterInactiveColor = '#f4f6f8',
    filterInactiveTextColor = '#333333',
    filterBorderRadius = 4,
    filterFontSize = 13,
    showFrontendSorting = false,
    enableSearch = false,
    searchPlaceholderText,
  } = settings;

  const {
    images = [],
    selectedCategory = 'all',
    onCategoryChange,
    availableCategories = [],
    selectedSorting = 'default',
    onSortingChange,
    onSearch: contextOnSearch,
  } = useData();

  const handleSearch = propsOnSearch || contextOnSearch;
  const {searchPlaceholder, allText} = useContext(TranslationsContext);
  const effectiveAllText = filterAllText ? filterAllText : (allText || 'All');
  const previousTerm = useRef<string>('');

  const debouncedSearch = useDebouncedSearch((searchTerm: string) => {
    if (handleSearch && searchTerm !== previousTerm.current) {
      previousTerm.current = searchTerm;
      handleSearch(searchTerm);
    }
  }, 700);

  // Derive categories list from availableCategories or loaded images
  const categoriesList: ICategoryDTO[] = useMemo(() => {
    if (availableCategories && availableCategories.length > 0) {
      return availableCategories;
    }
    if (images && images.length > 0) {
      const catsMap: {[key: string]: ICategoryDTO} = {};
      images.forEach((img) => {
        if (Array.isArray(img.categories)) {
          img.categories.forEach((cat) => {
            const key = cat.slug || cat.name;
            if (!catsMap[key]) {
              catsMap[key] = {id: cat.id, name: cat.name, slug: key, count: 0};
            }
            catsMap[key].count = (catsMap[key].count || 0) + 1;
          });
        }
      });
      return Object.values(catsMap);
    }
    return [];
  }, [availableCategories, images]);

  const hasCategories = categoriesList.length > 0;

  // Render Pill Buttons
  const renderPillButtons = () => {
    return (
      <div className="reacg-filter-provider-group">
        {filterShowAll && (
          <button
            type="button"
            className={`reacg-filter-pill ${
              !selectedCategory || selectedCategory === 'all'
                ? 'reacg-filter-pill--active'
                : ''
            }`}
            onClick={() => onCategoryChange?.('all')}
            style={{
              backgroundColor:
                !selectedCategory || selectedCategory === 'all'
                  ? filterActiveColor
                  : filterInactiveColor,
              color:
                !selectedCategory || selectedCategory === 'all'
                  ? filterActiveTextColor
                  : filterInactiveTextColor,
              borderRadius: `${filterBorderRadius}px`,
              fontSize: `${filterFontSize}px`,
              padding: '0 16px',
            }}
          >
            {effectiveAllText}
          </button>
        )}
        {categoriesList.map((cat) => {
          const isActive =
            selectedCategory === cat.slug ||
            selectedCategory === String(cat.id) ||
            selectedCategory === cat.name;
          return (
            <button
              key={cat.id || cat.slug || cat.name}
              type="button"
              className={`reacg-filter-pill ${
                isActive ? 'reacg-filter-pill--active' : ''
              }`}
              onClick={() => onCategoryChange?.(cat.slug || cat.name)}
              style={{
                backgroundColor: isActive
                  ? filterActiveColor
                  : filterInactiveColor,
                color: isActive
                  ? filterActiveTextColor
                  : filterInactiveTextColor,
                borderRadius: `${filterBorderRadius}px`,
                fontSize: `${filterFontSize}px`,
                padding: '0 16px',
              }}
            >
              <span>{cat.name}</span>
              {filterShowCount && cat.count !== undefined && (
                <span
                  style={{
                    marginLeft: '4px',
                    opacity: 0.85,
                    fontSize: '0.9em',
                  }}
                >
                  ({cat.count})
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  };

  // Render Dropdown
  const renderCategoryDropdown = () => {
    const options: IDropdownOption[] = [];
    if (filterShowAll) {
      options.push({
        value: 'all',
        label: effectiveAllText,
      });
    }
    categoriesList.forEach((cat) => {
      options.push({
        value: cat.slug || cat.name,
        label: (
          <span>
            {cat.name}
            {filterShowCount && cat.count !== undefined && (
              <span
                style={{
                  marginLeft: '4px',
                  opacity: 0.85,
                  fontSize: '0.9em',
                }}
              >
                ({cat.count})
              </span>
            )}
          </span>
        ),
      });
    });

    return (
      <FilterDropdown
        value={
          !selectedCategory || selectedCategory === 'all'
            ? 'all'
            : selectedCategory
        }
        options={options}
        onChange={(val) => onCategoryChange?.(val)}
        align="left"
        activeColor={filterActiveColor}
        activeTextColor={filterActiveTextColor}
        inactiveColor={filterInactiveColor}
        inactiveTextColor={filterInactiveTextColor}
        borderRadius={filterBorderRadius}
        fontSize={filterFontSize}
      />
    );
  };

  // Render Categories Section
  const renderCategoryControls = () => {
    if (!enableFiltering || (!hasCategories && !filterShowAll)) {
      return null;
    }

    if (filterType === 'buttons') {
      return renderPillButtons();
    }

    if (filterType === 'dropdown') {
      return renderCategoryDropdown();
    }

    // Auto mode: responsive buttons on desktop, dropdown on mobile
    return (
      <>
        <div className="reacg-filter-auto--buttons">{renderPillButtons()}</div>
        <div className="reacg-filter-auto--dropdown">
          {renderCategoryDropdown()}
        </div>
      </>
    );
  };

  // Render Sorting Control
  const renderSortingControl = () => {
    if (!showFrontendSorting) {
      return null;
    }

    return (
      <FilterDropdown
        value={selectedSorting || 'default'}
        options={SORTING_OPTIONS}
        onChange={(val) => onSortingChange?.(val)}
        align={
          filterAlignment === 'right' || filterAlignment === 'space-between'
            ? 'right'
            : 'left'
        }
        activeColor={filterActiveColor}
        activeTextColor={filterActiveTextColor}
        inactiveColor={filterInactiveColor}
        inactiveTextColor={filterInactiveTextColor}
        borderRadius={filterBorderRadius}
        fontSize={filterFontSize}
      />
    );
  };

  // Render Search Control
  const renderSearchControl = () => {
    if (!enableSearch) {
      return null;
    }

    return (
      <div className="reacg-filter-search-wrapper">
        <TextField
          className="filter-provider__search-input"
          placeholder={
            searchPlaceholderText ? searchPlaceholderText : searchPlaceholder
          }
          variant="outlined"
          size="small"
          onChange={(e) => debouncedSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
          fullWidth
          InputProps={{
            sx: {
              '.filter-provider__search-input & input': {
                padding: '8px 14px',
                minHeight: '0',
                margin: '0',
                border: '0',
                borderRadius: `${filterBorderRadius}px`,
                fontSize: `${filterFontSize}px`,
                boxShadow: 'unset',
                color: 'inherit',
                '&:focus, &:hover, &:active, &:focus-visible, &:focus-within': {
                  boxShadow: 'none',
                  outline: 'none',
                  borderColor: 'unset',
                },
              },
              'height': '38px',
              'borderRadius': `${filterBorderRadius}px`,
              'fontSize': `${filterFontSize}px`,
              'backgroundColor': filterInactiveColor,
              'color': filterInactiveTextColor,
            },
          }}
        />
      </div>
    );
  };

  const getJustifyContent = (alignment?: string) => {
    switch (alignment) {
      case 'center':
        return 'center';
      case 'right':
        return 'flex-end';
      case 'space-between':
        return 'space-between';
      case 'left':
      default:
        return 'flex-start';
    }
  };

  if (filterAlignment === 'space-between') {
    return (
      <div
        className="reacg-filter-provider-container"
        style={{justifyContent: 'space-between'}}
      >
        <div className="reacg-filter-provider-group">
          {renderCategoryControls()}
        </div>
        <div className="reacg-filter-provider-group">
          {renderSortingControl()}
          {renderSearchControl()}
        </div>
      </div>
    );
  }

  return (
    <div
      className="reacg-filter-provider-container"
      style={{justifyContent: getJustifyContent(filterAlignment)}}
    >
      {renderCategoryControls()}
      {renderSortingControl()}
      {renderSearchControl()}
    </div>
  );
};

export {FilterProvider};
export default FilterProvider;
