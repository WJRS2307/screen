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

export function projectCard(title, description, tags, emoji) {
    const tagHTML = tags.map(t => `<span class="project-card__tag">${t}</span>`).join('');
    return `
        <div class="project-card">
            <div class="project-card__thumbnail">
                <span class="project-card__placeholder-icon">${emoji}</span>
            </div>
            <div class="project-card__body">
                <div class="project-card__title">${title}</div>
                <div class="project-card__desc">${description}</div>
                <div class="project-card__tags">${tagHTML}</div>
            </div>
        </div>
    `;
}
