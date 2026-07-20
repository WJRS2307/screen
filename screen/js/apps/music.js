export const musicConfig = {
    title: 'Music Player',
    width: 350,
    height: 400,
    noScroll: true,
    content: () => `
        <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #121212;">
            <iframe 
                style="border-radius:12px; width:100%; height:100%; border:0;" 
                src="https://open.spotify.com/embed/playlist/5UPQVjwUSXUg3F6cUe2xn8?utm_source=generator&theme=0" 
                allowfullscreen="" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy">
            </iframe>
        </div>
    `,
};
