import { WindowManager } from './windows.js';
import { WINDOW_CONTENT } from './windowContent.js';
import { runTerminalAnimation } from './terminal.js';


    function updateClock() {
        const timeEl = document.getElementById('taskbar-time');
        const dateEl = document.getElementById('taskbar-date');
        if (!timeEl || !dateEl) return;

        const now = new Date();
        const timeOptions = {
            timeZone: 'Asia/Singapore',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        };
        timeEl.textContent = now.toLocaleString('en-SG', timeOptions);
        
        const dateOptions = {
            timeZone: 'Asia/Singapore',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        };
        dateEl.textContent = now.toLocaleString('en-SG', dateOptions);
    }

    function setupTaskbar() {
        const taskbarBtns = document.querySelectorAll('.taskbar__btn[data-app]');
        taskbarBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const appId = btn.dataset.app;
                openAppWindow(appId);
            });
        });
    }

    function setupStartMenu() {
        const startBtn = document.getElementById('start-btn');
        const startMenu = document.getElementById('start-menu');
        if (!startBtn || !startMenu) return;

        startBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            startMenu.classList.toggle('start-menu--open');
            startBtn.classList.toggle('taskbar__btn--active');
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.start-menu') && !e.target.closest('#start-btn')) {
                startMenu.classList.remove('start-menu--open');
                startBtn.classList.remove('taskbar__btn--active');
            }
        });

        const appBtns = startMenu.querySelectorAll('.start-menu__app');
        appBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const appId = btn.dataset.app;
                startMenu.classList.remove('start-menu--open');
                startBtn.classList.remove('taskbar__btn--active');

                openAppWindow(appId);
            });
        });

        const powerBtn = startMenu.querySelector('.start-menu__power');
        if (powerBtn) {
            powerBtn.addEventListener('click', () => {
                sessionStorage.removeItem('os_logged_in');
                
                startMenu.classList.remove('start-menu--open');
                startBtn.classList.remove('taskbar__btn--active');
                
                const loginScreen = document.getElementById('login-screen');
                const passwordInput = document.getElementById('login-password');
                const loginBtn = document.getElementById('login-btn');
                const loginError = document.getElementById('login-error');
                
                if (loginScreen) {
                    loginScreen.style.display = 'flex';
                    loginScreen.classList.remove('login-screen--hidden');
                    
                    if (passwordInput) {
                        passwordInput.value = '';
                        passwordInput.disabled = false;
                        passwordInput.focus();
                    }
                    if (loginBtn) {
                        loginBtn.disabled = false;
                    }
                    if (loginError) {
                        loginError.textContent = '';
                    }
                }
                
                document.querySelectorAll('.window').forEach(win => win.remove());
            });
        }
    }

    function setupDesktopIcons() {
        const desktopIcons = document.querySelectorAll('.desktop-icon[data-app]');
        desktopIcons.forEach(icon => {
            icon.addEventListener('click', () => {
                const appId = icon.dataset.app;
                openAppWindow(appId);
            });
        });
    }

    function openAppWindow(windowId) {
        if (WindowManager.isWindowOpen(windowId)) {
            if (WindowManager.isWindowMinimized(windowId)) {
                WindowManager.restoreWindow(windowId);
            } else {
                WindowManager.focusWindow(windowId);
            }
            return;
        }

        const config = WINDOW_CONTENT[windowId];
        if (!config) return;

        const contentHTML = config.content();
        WindowManager.createWindow(windowId, config.title, contentHTML, {
            width: config.width,
            height: config.height,
            className: config.className || '',
            noScroll: config.noScroll || false,
        });

        const taskbarBtn = document.querySelector(`.taskbar__btn[data-app="${windowId}"]`);
        if (taskbarBtn) taskbarBtn.classList.add('taskbar__btn--active');

        if (windowId === 'terminal') {
            setTimeout(() => runTerminalAnimation(), 350);
        }
    }

    function setupLogin() {
        const passwordInput = document.getElementById('login-password');
        const loginBtn = document.getElementById('login-btn');
        const loginError = document.getElementById('login-error');
        const loginScreen = document.getElementById('login-screen');
        const bootScreen = document.getElementById('boot-screen');

        if (!passwordInput || !loginBtn || !loginScreen) return;

        function attemptLogin() {
            const password = passwordInput.value.trim().toLowerCase();
            
            if (password === 'sean') {
                sessionStorage.setItem('os_logged_in', 'true');
                loginError.textContent = '';
                passwordInput.disabled = true;
                loginBtn.disabled = true;
                
                if (bootScreen) {
                    bootScreen.style.display = 'flex';
                    bootScreen.offsetHeight;
                    bootScreen.classList.remove('boot-screen--hidden');
                    
                    let welcomeText = bootScreen.querySelector('.boot-screen__welcome');
                    if (!welcomeText) {
                        welcomeText = document.createElement('div');
                        welcomeText.className = 'boot-screen__welcome';
                        welcomeText.textContent = 'Welcome';
                        welcomeText.style.color = '#cdd6f4';
                        welcomeText.style.fontSize = '20px';
                        welcomeText.style.fontWeight = '500';
                        welcomeText.style.marginTop = '16px';
                        welcomeText.style.fontFamily = 'var(--font-primary)';
                        bootScreen.querySelector('.boot-screen__content').appendChild(welcomeText);
                    }
                }
                
                setTimeout(() => {
                    if (bootScreen) {
                        bootScreen.classList.add('boot-screen--hidden');
                    }
                    loginScreen.classList.add('login-screen--hidden');
                    
                    setTimeout(() => {
                        if (bootScreen) bootScreen.style.display = 'none';
                        loginScreen.style.display = 'none';
                        openAppWindow('terminal');
                    }, 800);
                }, 2000);
            } else {
                loginError.textContent = 'Incorrect password. Try again.';
                passwordInput.value = '';
                passwordInput.focus();
                
                passwordInput.classList.add('shake');
                setTimeout(() => {
                    passwordInput.classList.remove('shake');
                }, 400);
            }
        }

        loginBtn.addEventListener('click', attemptLogin);

        passwordInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                attemptLogin();
            }
        });
    }

    function boot() {
        const bootScreen = document.getElementById('boot-screen');
        const loginScreen = document.getElementById('login-screen');
        const passwordInput = document.getElementById('login-password');

        if (sessionStorage.getItem('os_logged_in') === 'true') {
            if (bootScreen) bootScreen.style.display = 'none';
            if (loginScreen) {
                loginScreen.style.display = 'none';
                loginScreen.classList.add('login-screen--hidden');
            }
            openAppWindow('terminal');
            return;
        }

        if (bootScreen) {
            bootScreen.style.display = 'none';
            bootScreen.classList.add('boot-screen--hidden');
        }
        
        if (passwordInput) {
            passwordInput.focus();
        }
    }

    function init() {
        history.pushState(null, document.title, location.href);
        window.addEventListener('popstate', () => {
            history.pushState(null, document.title, location.href);
        });

        updateClock();
        setInterval(updateClock, 1000);

        setupTaskbar();
        setupStartMenu();
        setupDesktopIcons();
        setupLogin();

        boot();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
