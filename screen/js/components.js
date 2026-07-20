export function skillBadge(name, category) {
    const colors = {
        frontend: '#89b4fa',
        backend: '#a6e3a1',
        language: '#cba6f7',
        tools: '#fab387',
    };
    const color = colors[category] || '#cdd6f4';
    return `
        <div class="skill-badge">
            <span class="skill-badge__dot" style="background: ${color}"></span>
            <span>${name}</span>
        </div>
    `;
}

export function projectCard({ title, description, tags, emoji, url, image }) {
    const tagHTML = tags.map(t => `<span class="project-card__tag">${t}</span>`).join('');
    
    let thumbHTML = '';
    if (image) {
        thumbHTML = `<img src="${image}" alt="${title}" class="project-card__img">`;
    } else {
        let hash = 0;
        for (let i = 0; i < title.length; i++) {
            hash = title.charCodeAt(i) + ((hash << 5) - hash);
        }
        const hue1 = Math.abs(hash % 360);
        const hue2 = (hue1 + 60) % 360;
        const hue3 = (hue1 + 120) % 360;
        
        const gradient = `
            background-color: hsl(${hue1}, 70%, 15%);
            background-image: 
                radial-gradient(at 0% 0%, hsla(${hue2}, 80%, 50%, 0.5) 0px, transparent 70%),
                radial-gradient(at 100% 100%, hsla(${hue3}, 80%, 50%, 0.5) 0px, transparent 70%);
        `;
        
        thumbHTML = `
            <div class="project-card__pattern" style="${gradient}">
                <span class="project-card__placeholder-icon">${emoji}</span>
            </div>
        `;
    }

    return `
        <a class="project-card" href="${url || '#'}" target="_blank" rel="noopener noreferrer">
            <div class="project-card__thumbnail">
                ${thumbHTML}
            </div>
            <div class="project-card__body">
                <div class="project-card__title">${title}</div>
                <div class="project-card__desc">${description}</div>
                <div class="project-card__tags">${tagHTML}</div>
            </div>
        </a>
    `;
}
