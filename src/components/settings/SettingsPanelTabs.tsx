import Fullscreen from '@mui/icons-material/Fullscreen';
import LockOutlined from '@mui/icons-material/LockOutlined';
import MoreHorizOutlined from '@mui/icons-material/MoreHorizOutlined';
import OpenWith from '@mui/icons-material/OpenWith';
import PaletteOutlined from '@mui/icons-material/PaletteOutlined';
import PhotoLibrary from '@mui/icons-material/PhotoLibrary';
import RestartAltOutlined from '@mui/icons-material/RestartAltOutlined';
import SaveOutlined from '@mui/icons-material/SaveOutlined';
import TextFieldsOutlined from '@mui/icons-material/TextFieldsOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import {Box, Menu, MenuItem, Tab, Tabs, Tooltip} from '@mui/material';
import clsx from 'clsx';
import {Aligner} from 'core-components/aligner';
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

interface ISettingsPanelTabsProps {
  activeTab: string;
  onActiveTabChange: (_: any, newActiveTab: string) => void;
  onSave: () => void;
  onReset: () => void;
  hideLightboxOptions: boolean;
  isSmall: boolean;
}

const SettingsPanelTabs: React.FC<ISettingsPanelTabsProps> = ({
  activeTab,
  onActiveTabChange,
  onSave,
  onReset,
  hideLightboxOptions,
  isSmall,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isReseting, setIsReseting] = useState(false);
  const [overflowMenuAnchor, setOverflowMenuAnchor] =
    useState<HTMLElement | null>(null);
  const [visibleTabValues, setVisibleTabValues] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);
  const measureMoreRef = useRef<HTMLButtonElement | null>(null);
  const measureTabRefs = useRef<Record<string, HTMLElement | null>>({});

  const tabItems = useMemo(
    () => [
      {
        value: 'gallery',
        label: 'Gallery',
        menuLabel: 'Gallery',
        icon: <PhotoLibrary />,
      },
      {
        value: 'text-metadata',
        label: 'Text & Metadata',
        menuLabel: 'Text & Metadata',
        icon: <TextFieldsOutlined />,
      },
      {
        value: 'appearance',
        label: 'Appearance',
        menuLabel: 'Appearance',
        icon: <PaletteOutlined />,
      },
      {
        value: 'general',
        label: 'Navigation',
        menuLabel: 'Navigation',
        icon: <OpenWith />,
      },
      {
        value: 'protection',
        label: 'Protection',
        menuLabel: 'Protection',
        icon: <LockOutlined />,
      },
      {
        value: 'lightbox',
        label: (
          <Tooltip
            title={
              hideLightboxOptions
                ? 'To enable Lightbox, change the Image Click Action from Gallery settings.'
                : ''
            }
          >
            <span>Lightbox</span>
          </Tooltip>
        ),
        menuLabel: 'Lightbox',
        icon: <Fullscreen />,
        isDisabled: hideLightboxOptions,
      },
    ],
    [hideLightboxOptions]
  );

  const overflowTabValues = tabItems
    .filter((tab) => !visibleTabValues.includes(tab.value))
    .map((tab) => tab.value);
  const visibleTabs = tabItems.filter((tab) =>
    visibleTabValues.includes(tab.value)
  );
  const overflowTabs = tabItems.filter((tab) =>
    overflowTabValues.includes(tab.value)
  );
  const isOverflowActive = overflowTabValues.includes(activeTab);

  const save = async () => {
    setIsSaving(true);
    await onSave();
    setIsSaving(false);
  };

  const reset = async () => {
    setIsReseting(true);
    await onReset();
    setIsReseting(false);
  };

  useLayoutEffect(() => {
    const updateVisibleTabs = () => {
      if (!containerRef.current) {
        return;
      }

      const actionsWidth = isSmall ? 0 : actionsRef.current?.offsetWidth ?? 0;
      const availableWidth =
        containerRef.current.clientWidth - actionsWidth - 24;
      const moreWidth = measureMoreRef.current?.offsetWidth ?? 0;
      const tabWidths = tabItems.map(
        (tab) => measureTabRefs.current[tab.value]?.offsetWidth ?? 0
      );

      if (!availableWidth || tabWidths.some((width) => width === 0)) {
        return;
      }

      const totalTabsWidth = tabWidths.reduce((sum, width) => sum + width, 0);

      if (totalTabsWidth <= availableWidth) {
        setVisibleTabValues(tabItems.map((tab) => tab.value));
        return;
      }

      const reservedWidth = Math.max(availableWidth - moreWidth, 0);
      const nextVisibleValues: string[] = [];
      let usedWidth = 0;

      tabItems.forEach((tab, index) => {
        const tabWidth = tabWidths[index] ?? 0;
        if (usedWidth + tabWidth <= reservedWidth) {
          nextVisibleValues.push(tab.value);
          usedWidth += tabWidth;
        }
      });

      if (!nextVisibleValues.length) {
        setVisibleTabValues([tabItems[0].value]);
        return;
      }

      setVisibleTabValues(
        tabItems
          .map((tab) => tab.value)
          .filter((value) => nextVisibleValues.includes(value))
      );
    };

    updateVisibleTabs();

    const resizeObserver = new ResizeObserver(() => {
      updateVisibleTabs();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [activeTab, isSmall, tabItems]);

  useEffect(() => {
    if (!overflowTabs.length && overflowMenuAnchor) {
      setOverflowMenuAnchor(null);
    }
  }, [overflowMenuAnchor, overflowTabs.length]);

  const renderTab = (tab: (typeof tabItems)[number]) => (
    <Tab
      key={tab.value}
      disabled={Boolean(tab.isDisabled)}
      icon={tab.icon}
      label={tab.label}
      value={tab.value}
      iconPosition="start"
      className="reacg-settings-panel-tabs__tab"
      sx={{
        color: tab.isDisabled ? 'rgba(0, 0, 0, 0.38)' : 'initial',
        cursor: tab.isDisabled ? 'default' : 'pointer',
      }}
    />
  );

  const renderActionButtons = (showText: boolean, renderOutside = false) => (
    <Box
      className={clsx('reacg-settings-panel-tabs__actions', {
        'reacg-settings-panel-tabs__actions_outside': renderOutside,
      })}
      ref={actionsRef}
    >
      <Tooltip title={'Save options'}>
        <span>
          <LoadingButton
            loading={isSaving}
            loadingPosition={'center'}
            variant={'outlined'}
            onClick={save}
            className={clsx(
              'button',
              'button-large',
              'button-primary',
              'options-panel_body-button',
              'reacg-settings-panel-tabs__action-button',
              'reacg-settings-panel-tabs__action-button_save',
              {
                'reacg-settings-panel-tabs__action-button_text': showText,
              }
            )}
            aria-label="Save options"
          >
            {showText ? 'Save options' : <SaveOutlined />}
          </LoadingButton>
        </span>
      </Tooltip>
      <Tooltip title={'Reset options'}>
        <span>
          <LoadingButton
            loading={isReseting}
            loadingPosition={'center'}
            variant={'outlined'}
            onClick={reset}
            className={clsx(
              'button',
              'button-large',
              'options-panel_body-button',
              'reacg-settings-panel-tabs__action-button',
              {
                'reacg-settings-panel-tabs__action-button_text': showText,
              }
            )}
            aria-label="Reset options"
          >
            {showText ? 'Reset' : <RestartAltOutlined />}
          </LoadingButton>
        </span>
      </Tooltip>
    </Box>
  );

  return (
    <Aligner
      className={clsx('reacg-settings-panel', {
        'reacg-settings-panel--small': isSmall,
      })}
    >
      {isSmall ? renderActionButtons(false, true) : null}
      <Box className="reacg-settings-panel-tabs" ref={containerRef}>
        <Box className="reacg-settings-panel-tabs__nav">
          <Tabs
            value={visibleTabValues.includes(activeTab) ? activeTab : false}
            onChange={onActiveTabChange}
            className="reacg-settings-panel-tabs__tabs"
          >
            {visibleTabs.map(renderTab)}
          </Tabs>
          {overflowTabs.length ? (
            <button
              type="button"
              className={clsx(
                'reacg-settings-panel-tabs__tab',
                'reacg-settings-panel-tabs__more-button',
                {
                  'reacg-settings-panel-tabs__more-button_active':
                    isOverflowActive,
                }
              )}
              onClick={(event) => setOverflowMenuAnchor(event.currentTarget)}
            >
              <MoreHorizOutlined />
              <span>More</span>
            </button>
          ) : null}
        </Box>
        {!isSmall ? renderActionButtons(false) : null}
        <Box className="reacg-settings-panel-tabs__measure">
          <Tabs value={false} className="reacg-settings-panel-tabs__tabs">
            {tabItems.map((tab) => (
              <Tab
                key={tab.value}
                disabled={Boolean(tab.isDisabled)}
                ref={(node) => {
                  measureTabRefs.current[tab.value] = node;
                }}
                icon={tab.icon}
                label={tab.menuLabel}
                value={tab.value}
                iconPosition="start"
                className="reacg-settings-panel-tabs__tab"
              />
            ))}
          </Tabs>
          <button
            type="button"
            ref={measureMoreRef}
            className={clsx(
              'reacg-settings-panel-tabs__tab',
              'reacg-settings-panel-tabs__more-button'
            )}
          >
            <MoreHorizOutlined />
            <span>More</span>
          </button>
        </Box>
      </Box>
      <Menu
        anchorEl={overflowMenuAnchor}
        open={Boolean(overflowMenuAnchor)}
        onClose={() => setOverflowMenuAnchor(null)}
        disableAutoFocusItem
        disableScrollLock
        MenuListProps={{
          autoFocusItem: false,
          className: 'reacg-settings-panel-tabs__menu-list',
        }}
        slotProps={{
          paper: {className: 'reacg-settings-panel-tabs__menu-paper'},
        }}
      >
        {overflowTabs.map((tab) => (
          <MenuItem
            key={tab.value}
            selected={activeTab === tab.value}
            disabled={tab.isDisabled}
            className="reacg-settings-panel-tabs__menu-item"
            onClick={() => {
              onActiveTabChange(null, tab.value);
              setOverflowMenuAnchor(null);
            }}
          >
            <span className="reacg-settings-panel-tabs__menu-item-icon">
              {tab.icon}
            </span>
            {tab.menuLabel}
          </MenuItem>
        ))}
      </Menu>
    </Aligner>
  );
};

export {SettingsPanelTabs};
