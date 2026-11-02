import { useEffect, useRef } from 'react';

const portraitImages = {
    dark: '/images/no_sunglasses.png',
    light: '/images/with_sunglasses.png',
};
const portraitVideos = {
    dark: '/images/darkmode_web.mp4',
    light: '/images/lightmode_web.mp4',
};

export default function HeroPortrait({ theme }) {
    const imageRef = useRef(null);
    const videoRef = useRef(null);
    const initialTheme = useRef(theme);

    useEffect(() => {
        const image = imageRef.current;
        const video = videoRef.current;
        if (!image || !video) return;
        const source = portraitImages[theme];

        const showImage = () => {
            image.src = source;
            image.hidden = false;
            video.pause();
            video.hidden = true;
        };

        if (initialTheme.current === theme) {
            showImage();
            return;
        }
        initialTheme.current = theme;
        video.src = portraitVideos[theme];
        video.hidden = false;
        image.hidden = true;
        video.onended = showImage;
        video.onerror = () => {
            console.warn(`Unable to play the ${theme} mode portrait transition.`);
            showImage();
        };
        video.load();
        video.play().catch((error) => {
            console.warn(`Unable to play the ${theme} mode portrait transition.`, error);
            showImage();
        });
        return () => {
            video.pause();
            video.onended = null;
            video.onerror = null;
        };
    }, [theme]);

    return (
        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div aria-hidden="true" className="absolute -inset-6 rounded-[3rem] bg-coral/40 blur-3xl" />
            <div className="hero-portrait-frame relative rounded-[2.5rem] bg-panel p-3.5">
                <div className="relative aspect-338/455 w-full overflow-hidden rounded-[1.75rem] bg-white">
                    <img ref={imageRef} src={portraitImages[theme]} alt="Portrait of Mark-dj Villar" width="338" height="455" className="absolute inset-0 h-full w-full object-cover" />
                    <video ref={videoRef} aria-hidden="true" muted playsInline preload="none" hidden className="absolute inset-0 h-full w-full object-cover" />
                </div>
            </div>
        </div>
    );
}
