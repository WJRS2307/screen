import { projectCard } from '../components.js';

const PROJECTS_DATA = [
    {
        title: 'Project 1',
        description: 'Add your project description here. Briefly describe what it does and why it matters.',
        tags: ['React', 'Node.js', 'MongoDB'],
        emoji: '🚀'
    },
    {
        title: 'Project 2',
        description: 'Add your project description here. Briefly describe what it does and why it matters.',
        tags: ['Next.js', 'PostgreSQL'],
        emoji: '🎨'
    },
    {
        title: 'Project 3',
        description: 'Add your project description here. Briefly describe what it does and why it matters.',
        tags: ['Three.js', 'JavaScript'],
        emoji: '🌐'
    },
    {
        title: 'Project 4',
        description: 'Add your project description here. Briefly describe what it does and why it matters.',
        tags: ['Python', 'SQL'],
        emoji: '⚙️'
    }
];

export const projectsConfig = {
    title: 'Projects',
    width: 750,
    height: 550,
    content: () => `
        <div class="projects">
            <div class="projects__grid">
                ${PROJECTS_DATA.map(p => projectCard(p.title, p.description, p.tags, p.emoji)).join('')}
            </div>
        </div>
    `,
};
