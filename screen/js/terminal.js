import { TERMINAL_LINES } from './windowContent.js';

export async function runTerminalAnimation() {
    const output = document.getElementById('terminal-output');
    if (!output) return;

    output.innerHTML = '';

    for (const line of TERMINAL_LINES) {
        await sleep(80);
        const lineEl = document.createElement('div');
        lineEl.className = 'terminal__line';

        if (line.type === 'comment') {
            lineEl.innerHTML = `<span class="terminal__comment">${line.text}</span>`;
            output.appendChild(lineEl);
        } else if (line.type === 'empty') {
            lineEl.innerHTML = '&nbsp;';
            output.appendChild(lineEl);
        } else if (line.type === 'prompt') {
            const prompt = `<span class="terminal__prompt">sean@portfolio ~ $&nbsp;</span>`;
            lineEl.innerHTML = prompt;
            output.appendChild(lineEl);

            const cmdSpan = document.createElement('span');
            cmdSpan.className = 'terminal__command';
            lineEl.appendChild(cmdSpan);

            for (const char of line.command) {
                await sleep(35 + Math.random() * 30);
                cmdSpan.textContent += char;
                scrollTerminal(output);
            }

            if (line.typing) {
                const cursor = document.createElement('span');
                cursor.className = 'terminal__cursor';
                lineEl.appendChild(cursor);
            }

            await sleep(200);
        } else if (line.type === 'output') {
            lineEl.innerHTML = `<span class="terminal__output">${line.text}</span>`;
            output.appendChild(lineEl);
        }

        scrollTerminal(output);
    }
}

function scrollTerminal(container) {
    const parent = container.closest('.terminal');
    if (parent) parent.scrollTop = parent.scrollHeight;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
