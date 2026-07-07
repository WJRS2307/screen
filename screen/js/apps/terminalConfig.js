export const terminalConfig = {
    title: 'Terminal',
    className: 'window--terminal',
    width: 680,
    height: 440,
    noScroll: true,
    content: () => `
        <div class="terminal">
            <div id="terminal-output"></div>
        </div>
    `,
};
