import { skillBadge } from '../components.js';

const SKILLS_DATA = [
    {
        category: 'Frontend',
        skills: [
            { name: 'HTML5/CSS3', type: 'frontend' },
            { name: 'JavaScript', type: 'frontend' },
            { name: 'TypeScript', type: 'frontend' },
            { name: 'React', type: 'frontend' },
            { name: 'ThreeJS', type: 'frontend' },
            { name: 'NextJS', type: 'frontend' },
        ]
    },
    {
        category: 'Backend',
        skills: [
            { name: 'NodeJS', type: 'backend' },
            { name: 'ExpressJS', type: 'backend' },
            { name: 'ASP.NET', type: 'backend' },
            { name: 'Java', type: 'backend' },
            { name: 'Python', type: 'backend' },
            { name: 'C', type: 'backend' },
            { name: 'C++', type: 'backend' },
            { name: 'C#', type: 'backend' },
            { name: 'PHP', type: 'backend' },
            { name: 'SQL', type: 'backend' },
            { name: 'Dart', type: 'backend' },
        ]
    },
    {
        category: 'Mobile Development',
        skills: [
            { name: 'Flutter', type: 'Mobile Dev' }
        ]
    },
    {
        category: 'UI/UX Design',
        skills: [
            { name: 'Figma', type: 'UI/UX' },
            { name: 'Canva', type: 'UI/UX' },
            { name: 'Adobe', type: 'UI/UX' }
        ]
    },
    {
        category: '3D Modelling',
        skills: [
            { name: 'Blender', type: 'Modelling' },
            { name: 'Onshape', type: 'Modelling' }
        ]
    },
    {
        category: 'Development Tools',
        skills: [
            { name: 'Git', type: 'Tools' }
        ]
    },
    {
        category: 'Methodologies',
        skills: [
            { name: 'Agile', type: 'Tools' }
        ]
    }
];

export const skillsConfig = {
    title: 'Skills',
    width: 600,
    height: 520,
    content: () => `
        <div class="skills">
            ${SKILLS_DATA.map(group => `
                <div class="skills__category">
                    <div class="skills__category-title">${group.category}</div>
                    <div class="skills__grid">
                        ${group.skills.map(skill => skillBadge(skill.name, skill.type)).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `,
};
