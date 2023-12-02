import {Collapse, Divider, Paper, Typography} from '@mui/material';
import {Aligner, ExpandMore} from 'core-components';
import React, {ReactNode, useState} from 'react';
import clsx from 'clsx';
import './section.css';

interface ISectionProps {
  header: ReactNode | string;
  body: ReactNode;
  canExpand?: boolean;
  defaultExpanded?: boolean;
}

const Section: React.FC<ISectionProps> = ({
  header,
  body,
  canExpand,
  defaultExpanded = true,
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
        <Typography
          gutterBottom
          variant="subtitle1"
          component="div"
          className={'reacg-section__title'}
        >
          {header}
        </Typography>
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
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <div className={'reacg-section__body'}>{body}</div>
      </Collapse>
    );
  };

  return (
    <Paper variant={'outlined'} className={'reacg-section'}>
      {renderHeader()}
      {isExpanded && <Divider variant="middle" />}
      {renderBody()}
    </Paper>
  );
};

export {Section};
