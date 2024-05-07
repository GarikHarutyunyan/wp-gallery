import {Collapse, Divider, Paper, Typography} from '@mui/material';
import clsx from 'clsx';
import {Aligner, ExpandMore} from 'core-components';
import React, {ReactNode, useState} from 'react';
import {TypeUtils} from 'utils';
import './section.css';

interface ISectionProps {
  header: ReactNode | string;
  body: ReactNode;
  canExpand?: boolean;
  defaultExpanded?: boolean;
  outlined?: boolean;
  className?: string;
}

const Section: React.FC<ISectionProps> = ({
  header,
  body,
  canExpand = true,
  defaultExpanded = true,
  outlined = true,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);

  const onExpand = (): void => {
    canExpand && setIsExpanded((prevState: boolean) => !prevState);
  };

  const renderHeader = (): ReactNode => {
    return (
      <Aligner
        onClick={onExpand}
        className={clsx('reacg-section__header', {
          'reacg-section__header_clickable': canExpand,
        })}
      >
        {TypeUtils.isString(header) ? (
          <Typography
            gutterBottom
            variant="subtitle1"
            component="div"
            className={'reacg-section__title'}
          >
            {header}
          </Typography>
        ) : (
          header
        )}
        <span>
          <ExpandMore
            expand={isExpanded}
            className={'reacg-section__expand-more'}
          />
        </span>
      </Aligner>
    );
  };

  const renderBody = (): ReactNode => {
    return (
      <Collapse in={isExpanded} timeout={'auto'} unmountOnExit>
        <div className={'reacg-section__body'}>{body}</div>
      </Collapse>
    );
  };

  return (
    <Paper
      variant={outlined ? 'outlined' : undefined}
      className={clsx(
        'reacg-section',
        {'reacg-section_outlined': outlined},
        className
      )}
    >
      {renderHeader()}
      {isExpanded || !outlined ? <Divider variant={'middle'} /> : null}
      {renderBody()}
    </Paper>
  );
};

export {Section};
