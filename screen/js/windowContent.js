import { aboutConfig } from './apps/about.js';
import { skillsConfig } from './apps/skills.js';
import { projectsConfig } from './apps/projects.js';
import { contactConfig } from './apps/contact.js';
import { resumeConfig } from './apps/resume.js';
import { terminalConfig } from './apps/terminalConfig.js';
import { musicConfig } from './apps/music.js';

export const WINDOW_CONTENT = {
    terminal: terminalConfig,
    about: aboutConfig,
    skills: skillsConfig,
    projects: projectsConfig,
    contact: contactConfig,
    resume: resumeConfig,
    music: musicConfig,
};



export const TERMINAL_LINES = [
        { type: 'comment', text: '# Welcome to SeanOS v1.0' },
        { type: 'empty' },
        { type: 'prompt', command: 'whoami' },
        { type: 'output', text: 'Sean Wee' },
        { type: 'empty' },
        { type: 'prompt', command: 'open role.txt' },
        { type: 'output', text: '🔧 Full Stack Developer' },
        { type: 'empty' },
        { type: 'prompt', command: 'open location.txt' },
        { type: 'output', text: '📍 Singapore' },
        { type: 'empty' },
        { type: 'prompt', command: 'open education.txt' },
        { type: 'output', text: '🎓 Year 2 @ Nanyang Technological University' },
        { type: 'empty' },
        { type: 'prompt', command: 'open hobbies.txt' },
        { type: 'output', text: '🎨 3D Modelling · 🏃 Running' },
        { type: 'empty' },
        { type: 'prompt', command: 'echo "Welcome to my portfolio!"' },
        { type: 'output', text: 'Welcome to my portfolio!' },
        { type: 'empty' },
        { type: 'prompt', command: 'ls projects/', typing: true },
    ];