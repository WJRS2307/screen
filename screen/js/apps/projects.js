import { projectCard } from '../components.js';

const WEB_PROJECTS = [
    {
        title: 'VolleyHub',
        description: 'VolleyHub project.',
        tags: ['Sports', 'Web'],
        emoji: '🏐',
        url: 'https://github.com/WJRS2307/VolleyHub'
    },
    {
        title: 'Shopping Cart',
        description: 'E-commerce shopping cart website.',
        tags: ['E-Commerce', 'Web'],
        emoji: '🛒',
        url: 'https://github.com/WJRS2307/Shopping-Website',
        image: 'assets/shopping-cart.png'
    },
    {
        title: 'L1 WAD Chatbot',
        description: 'L1 WAD Chatbot and Food website project.',
        tags: ['Chatbot', 'Web'],
        emoji: '🍔',
        url: 'https://github.com/wilsontancherclass/l1-wad-project-kewlnoob'
    }
];

const TOOLS_PROJECTS = [
    {
        title: 'NTU Calendar',
        description: 'NTU Timetable Generator and Calendar Tool.',
        tags: ['Calendar', 'Tool'],
        emoji: '📅',
        url: 'https://ntu-timetable-generator.vercel.app/'
    },
    {
        title: 'ISP Productivity Tool',
        description: 'Project Management Productivity Tool.',
        tags: ['Management', 'Productivity'],
        emoji: '📊',
        url: 'https://github.com/WJRS2307/Project-Management-Productivity-Tool'
    },
    {
        title: 'Student Team Allocator',
        description: 'Python Project Sem 1 - Automated student team allocator.',
        tags: ['Python', 'Algorithm'],
        emoji: '👥',
        url: 'https://github.com/WJRS2307/Student-Team-Allocator'
    }
];

const GAMES_PROJECTS = [
    {
        title: 'Flutter To-Do List',
        description: 'Cross-platform To-Do List app built with Flutter and Dart.',
        tags: ['Flutter', 'Dart', 'Mobile'],
        emoji: '✅',
        url: 'https://github.com/WJRS2307/L1_sean',
        image: 'assets/todo-list.png'
    },
    {
        title: 'Snake Game',
        description: 'Classic Snake Game implementation.',
        tags: ['Game Dev', 'Classic'],
        emoji: '🐍',
        url: 'https://github.com/WJRS2307/Snake-Game',
        image: 'assets/snake-game.png'
    },
    {
        title: 'Turn-based Combat',
        description: 'Turn-based Combat Game Assignment for Sem 2.',
        tags: ['Game Dev', 'Logic'],
        emoji: '⚔️',
        url: 'https://github.com/WJRS2307/Turn-based-Combat-Assignment'
    }
];

export const projectsConfig = {
    title: 'Projects',
    width: 750,
    height: 550,
    content: () => `
        <div class="projects">
            <div class="projects-tabs">
                <input type="radio" id="tab-web" name="project-tabs" checked>
                <input type="radio" id="tab-tools" name="project-tabs">
                <input type="radio" id="tab-games" name="project-tabs">

                <div class="projects-tabs__nav">
                    <label for="tab-web">🌐 Web Apps</label>
                    <label for="tab-tools">🛠️ Software & Tools</label>
                    <label for="tab-games">🎮 Games & Mobile</label>
                </div>

                <div class="projects-tabs__content-wrapper">
                    <div class="projects-tabs__content" id="content-web">
                        <div class="projects__grid">
                            ${WEB_PROJECTS.map(p => projectCard(p)).join('')}
                        </div>
                    </div>

                    <div class="projects-tabs__content" id="content-tools">
                        <div class="projects__grid">
                            ${TOOLS_PROJECTS.map(p => projectCard(p)).join('')}
                        </div>
                    </div>

                    <div class="projects-tabs__content" id="content-games">
                        <div class="projects__grid">
                            ${GAMES_PROJECTS.map(p => projectCard(p)).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
};
