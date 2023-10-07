import React from 'react'
import PhotoAlbum from 'react-photo-album';
const unsplashLink = (id: string, width: number, height: number) =>
    `https://source.unsplash.com/${id}/${width}x${height}`;

const unsplashPhotos = [
    { id: "8gVv6nxq6gY", width: 1080, height: 800 },
    { id: "Dhmn6ete6g8", width: 1080, height: 1620 },
    { id: "RkBTPqPEGDo", width: 1080, height: 720 },
    { id: "Yizrl9N_eDA", width: 1080, height: 721 },
    { id: "KG3TyFi0iTU", width: 1080, height: 1620 },
    { id: "Jztmx9yqjBw", width: 1080, height: 607 },
    { id: "-heLWtuAN3c", width: 1080, height: 608 },
    { id: "xOigCUcFdA8", width: 1080, height: 720 },
    { id: "1azAjl8FTnU", width: 1080, height: 1549 },
    { id: "ALrCdq-ui_Q", width: 1080, height: 720 },
    { id: "twukN12EN7c", width: 1080, height: 694 },
    { id: "9UjEyzA6pP4", width: 1080, height: 1620 },
    { id: "sEXGgun3ZiE", width: 1080, height: 720 },
    { id: "S-cdwrx-YuQ", width: 1080, height: 1440 },
    { id: "q-motCAvPBM", width: 1080, height: 1620 },
    { id: "Xn4L310ztMU", width: 1080, height: 810 },
    { id: "iMchCC-3_fE", width: 1080, height: 610 },
    { id: "X48pUOPKf7A", width: 1080, height: 160 },
    { id: "GbLS6YVXj0U", width: 1080, height: 810 },
    { id: "9CRd1J1rEOM", width: 1080, height: 720 },
    { id: "xKhtkhc9HbQ", width: 1080, height: 1440 },
    { id: "8gVv6nxq6gY", width: 1080, height: 800 },
    { id: "Dhmn6ete6g8", width: 1080, height: 1620 },
    { id: "RkBTPqPEGDo", width: 1080, height: 720 },
    { id: "Yizrl9N_eDA", width: 1080, height: 721 },
    { id: "KG3TyFi0iTU", width: 1080, height: 1620 },
    { id: "Jztmx9yqjBw", width: 1080, height: 607 },
    { id: "-heLWtuAN3c", width: 1080, height: 608 },
    { id: "xOigCUcFdA8", width: 1080, height: 720 },
    { id: "1azAjl8FTnU", width: 1080, height: 1549 },
    { id: "ALrCdq-ui_Q", width: 1080, height: 720 },
    { id: "twukN12EN7c", width: 1080, height: 694 },
    { id: "9UjEyzA6pP4", width: 1080, height: 1620 },
    { id: "sEXGgun3ZiE", width: 1080, height: 720 },
    { id: "S-cdwrx-YuQ", width: 1080, height: 1440 },
    { id: "q-motCAvPBM", width: 1080, height: 1620 },
    { id: "Xn4L310ztMU", width: 1080, height: 810 },
    { id: "iMchCC-3_fE", width: 1080, height: 610 },
    { id: "X48pUOPKf7A", width: 1080, height: 160 },
    { id: "GbLS6YVXj0U", width: 1080, height: 810 },
    { id: "9CRd1J1rEOM", width: 1080, height: 720 },
    { id: "xKhtkhc9HbQ", width: 1080, height: 1440 },
    { id: "8gVv6nxq6gY", width: 1080, height: 800 },
    { id: "Dhmn6ete6g8", width: 1080, height: 1620 },
    { id: "RkBTPqPEGDo", width: 1080, height: 720 },
    { id: "Yizrl9N_eDA", width: 1080, height: 721 },
    { id: "KG3TyFi0iTU", width: 1080, height: 1620 },
    { id: "Jztmx9yqjBw", width: 1080, height: 607 },
    { id: "-heLWtuAN3c", width: 1080, height: 608 },
    { id: "xOigCUcFdA8", width: 1080, height: 720 },
    { id: "1azAjl8FTnU", width: 1080, height: 1549 },
    { id: "ALrCdq-ui_Q", width: 1080, height: 720 },
    { id: "twukN12EN7c", width: 1080, height: 694 },
    { id: "9UjEyzA6pP4", width: 1080, height: 1620 },
    { id: "sEXGgun3ZiE", width: 1080, height: 720 },
    { id: "S-cdwrx-YuQ", width: 1080, height: 1440 },
    { id: "q-motCAvPBM", width: 1080, height: 1620 },
    { id: "Xn4L310ztMU", width: 1080, height: 810 },
    { id: "iMchCC-3_fE", width: 1080, height: 610 },
    { id: "X48pUOPKf7A", width: 1080, height: 160 },
    { id: "GbLS6YVXj0U", width: 1080, height: 810 },
    { id: "9CRd1J1rEOM", width: 1080, height: 720 },
    { id: "xKhtkhc9HbQ", width: 1080, height: 1440 },
];

const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

const photos = unsplashPhotos.map((photo) => ({
    src: unsplashLink(photo.id, photo.width, photo.height),
    width: photo.width,
    height: photo.height,
    srcSet: breakpoints.map((breakpoint) => {
        const height = Math.round((photo.height / photo.width) * breakpoint);
        return {
            src: unsplashLink(photo.id, breakpoint, height),
            width: breakpoint,
            height,
        };
    }),
}));

const Gallery2 = () => {
    const padding = 5;
    const spacing = 10;
const renderPhoto = React.useCallback(
    ({ imageProps: { alt, style, ...rest } }: any) => (
        <img
            alt={alt}
            style={{
                ...style,
                width: '80px',
                height: '80px',
                borderRadius: padding > 2 ? "4px" : 0,
                boxShadow:
                    spacing > 0
                        ? "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)"
                        : "none",
                transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            }}
            {...rest}
        />
    ),
    [spacing, padding]
);

const renderContainer: any = ({ containerProps, children, containerRef }: any) => (
        <div ref={containerRef} {...containerProps} style={{
            width:'400px',
            // height:'1000px',
            ...containerProps.style
        }}>
            {children}
        </div>
    );

  return (
    <PhotoAlbum
        photos={photos}
        layout={'rows'}
        // columns={4}
        spacing={spacing}
        padding={padding}
        // targetRowHeight={targetRowHeight}
        renderPhoto={renderPhoto}
        // sizes={{size: '500px'}}
        rowConstraints={{minPhotos : 4}}
        renderContainer={renderContainer}
        // targetRowHeight={150}
        
        renderRowContainer={({ rowContainerProps, children }) => <div {...rowContainerProps} style={{...rowContainerProps.style, width: '400px'}} >{children}</div>}
    />
  )
}

export {Gallery2}