import {
  Box,
  Button,
  ClickAwayListener,
  IconButton,
  Popper,
  Typography,
} from '@mui/material';
import React, {useState} from 'react';

import CodeIcon from '@mui/icons-material/Code';
import CropIcon from '@mui/icons-material/Crop';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import ImageIcon from '@mui/icons-material/Image';
import LinkIcon from '@mui/icons-material/Link';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import WarningIcon from '@mui/icons-material/Warning';
import {IImageDTO} from 'data-structures';
import {AspectRatioOptions} from './options';
interface ImageEditorPopoverProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  image: IImageDTO | null;
  setIsCropping: (val: boolean) => void;
  isCropping: boolean;
  onClose: () => void;
  cropedArea: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  setCropTransform: (transform: string) => void;
  onZoomChange: (value: number) => void;
  zoom: number;
  setAspect: (value: number) => void;
  aspect: number;
  setRotation: (value: number) => void;
  rotation: number;
  setDuotoneShadowColor: (color: string) => void;
  duotoneShadowColor: string;
  setDuotoneHighlightColor: (color: string) => void;
  duotoneHighlightColor: string;
}

const ImageEditorPopover: React.FC<ImageEditorPopoverProps> = ({
  anchorEl,
  open,
  image,
  setIsCropping,
  isCropping,
  onClose,
  cropedArea,
  setCropTransform,
  onZoomChange,
  zoom,
  aspect,
  setAspect,
  setRotation,
  rotation,
  setDuotoneShadowColor,
  duotoneShadowColor,
  setDuotoneHighlightColor,
  duotoneHighlightColor,
}) => {
  const popperRef = React.useRef<HTMLDivElement | null>(null);
  const [zoomAnchorEl, setZoomAnchorEl] = useState<HTMLElement | null>(null);
  const [aspectRatioEl, setAspectRatioEl] = useState<HTMLElement | null>(null);
  const handleClickZoom = (event: React.MouseEvent<HTMLElement>) => {
    setZoomAnchorEl(zoomAnchorEl ? null : event.currentTarget);
  };
  const handleClickAspectRatio = (event: React.MouseEvent<HTMLElement>) => {
    setAspectRatioEl(aspectRatioEl ? null : event.currentTarget);
  };

  const handleShadowChange = (color: string) => {
    if (!image) return;

    setDuotoneShadowColor(color);
  };

  const handleHighlightChange = (color: string) => {
    if (!image) return;
    setDuotoneHighlightColor(color);
  };

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      disablePortal
      sx={{
        zIndex: 1, // ensure it's above modals, tooltips, etc.
      }}
    >
      <ClickAwayListener
        onClickAway={(event) => {
          onClose();
        }}
      >
        <Box
          ref={popperRef}
          display="flex"
          flexDirection="column"
          gap={1}
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 12px',
            borderRadius: 2,
            boxShadow: 3,
            bgcolor: 'background.paper',
          }}
        >
          <Typography variant="subtitle2" fontWeight="bold">
            Edit Image
          </Typography>
          <Box display="flex" flexDirection="column" gap={1} alignItems="start">
            <Typography variant="caption" fontWeight="bold">
              Duotone
            </Typography>
            <Box display="flex" gap={1}>
              <label>
                <input
                  type="color"
                  value={duotoneShadowColor}
                  onChange={(e) => handleShadowChange(e.target.value)}
                />
              </label>
              <label>
                <input
                  type="color"
                  value={duotoneHighlightColor}
                  onChange={(e) => handleHighlightChange(e.target.value)}
                />
              </label>
            </Box>
          </Box>
          <Box display="flex" gap={1}>
            <IconButton size="small">
              <ImageIcon />
            </IconButton>
            <IconButton size="small">
              <CodeIcon />
            </IconButton>
            <IconButton size="small">
              <FormatAlignCenterIcon />
            </IconButton>
            <IconButton size="small">
              <WarningIcon />
            </IconButton>
            <IconButton size="small">
              <LinkIcon />
            </IconButton>
            {!isCropping ? (
              <IconButton
                size="small"
                onClick={() => setIsCropping(!isCropping)}
              >
                <CropIcon />
              </IconButton>
            ) : (
              <>
                <IconButton
                  size="small"
                  title="Zoom"
                  onClick={(e) => handleClickZoom(e)}
                >
                  🔍
                </IconButton>
                {
                  <Popper
                    open={!!zoomAnchorEl}
                    anchorEl={zoomAnchorEl}
                    modifiers={[
                      {
                        name: 'offset',
                        options: {
                          offset: [10, 18], // x=0, y=8px margin below anchor
                        },
                      },
                    ]}
                    style={{zIndex: 10}}
                  >
                    <Box
                      sx={{
                        bgcolor: 'background.paper',
                        p: 1,
                        borderRadius: 1,
                        boxShadow: 3,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        width: 180,
                      }}
                    >
                      <Typography variant="caption">Zoom</Typography>
                      <input
                        type="range"
                        min={1}
                        max={3}
                        step={0.01}
                        value={zoom}
                        onChange={(e) =>
                          onZoomChange(parseFloat(e.target.value))
                        }
                        style={{width: '100px'}}
                      />
                      <Typography variant="caption">
                        {Math.round(zoom * 100)}%
                      </Typography>
                    </Box>
                  </Popper>
                }
                <IconButton
                  size="small"
                  title="Aspect Ratio"
                  onClick={(e) => handleClickAspectRatio(e)}
                >
                  🧩
                </IconButton>

                <Popper
                  open={!!aspectRatioEl}
                  anchorEl={aspectRatioEl}
                  modifiers={[
                    {
                      name: 'offset',
                      options: {
                        offset: [10, 18],
                      },
                    },
                  ]}
                  style={{zIndex: 10}}
                >
                  <Box
                    sx={{
                      bgcolor: 'background.paper',
                      p: 1,
                      borderRadius: 1,
                      boxShadow: 3,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      width: 180,
                    }}
                  >
                    <select
                      value={aspect}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setAspect(value);
                      }}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        backgroundColor: '#f9f9f9',
                        fontWeight: 600,
                        fontSize: '14px',
                        width: '100%',
                      }}
                    >
                      {AspectRatioOptions.map(({value, title, isDisabled}) => (
                        <option key={value} value={value} disabled={isDisabled}>
                          {title}
                        </option>
                      ))}
                    </select>
                  </Box>
                </Popper>
                <IconButton
                  size="small"
                  title="Rotate"
                  onClick={() => setRotation((rotation + 90) % 360)}
                >
                  🔄
                </IconButton>

                {/* Right-aligned buttons */}
                <Box display="flex" gap={1} ml="auto">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setIsCropping(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      // TODO: Add apply crop logic here
                      setIsCropping(false);
                      const {x, y, width, height} = cropedArea;

                      const scaleX = 100 / width;
                      const scaleY = 100 / height;
                      const scale = Math.max(scaleX, scaleY);

                      const centerX = x + width / 2;
                      const centerY = y + height / 2;

                      const translateX = 50 - centerX;
                      const translateY = 50 - centerY;

                      const transform = `scale(${scale}) translate(${translateX}%, ${translateY}%) rotate(${rotation}deg)`;
                      setCropTransform(transform);
                    }}
                  >
                    Apply
                  </Button>
                </Box>
              </>
            )}
            <IconButton size="small" onClick={() => console.log(image)}>
              <ImageIcon />
            </IconButton>
            <Button size="small">Replace</Button>
            <IconButton size="small">
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Box>
      </ClickAwayListener>
    </Popper>
  );
};

export default ImageEditorPopover;
