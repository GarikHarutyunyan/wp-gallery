import {Collapse, Divider, Typography} from '@mui/material';
import {Aligner, ExpandMore} from 'core-components';
import React, {ReactNode, useState} from 'react';

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

  return (
    <>
      <Aligner onClick={onExpand}>
        <Typography
          gutterBottom
          variant="subtitle1"
          component="div"
          style={{margin: '0 5px', cursor: 'default'}}
        >
          {header}
        </Typography>
        <span>
          <ExpandMore expand={isExpanded} />
        </span>
      </Aligner>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Divider variant="middle" style={{margin: '15px 0'}} />
        {body}
      </Collapse>
    </>
  );
};

export {Section};
