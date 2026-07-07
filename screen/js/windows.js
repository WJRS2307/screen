  const drag = {
    active: false,
    windowEl: null,
    offsetX: 0,
    offsetY: 0,
  };

  const resize = {
    active: false,
    windowEl: null,
    direction: '',
    startWidth: 0,
    startHeight: 0,
    startX: 0,
    startY: 0,
  };

  const RESIZE_BORDER = 8;

  const OPEN_ANIM_MS = 250;
  const CLOSE_ANIM_MS = 200;
  const MIN_VISIBLE_PX = 100;
  const DEFAULT_WIDTH = 700;
  const DEFAULT_HEIGHT = 500;
  const DESKTOP_TOP = 0;
  const DESKTOP_BOTTOM = 48;

  function getContainer() {
    return document.getElementById('windows-container');
  }

  function getCenteredPosition(width, height) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight - DESKTOP_BOTTOM;

    const x = Math.max(0, (screenWidth - width) / 2) + (Math.random() * 30 - 15);
    const y = Math.max(0, (screenHeight - height) / 2) + (Math.random() * 30 - 15);

    return { x, y };
  }

  export const WindowManager = {
    windows: {},
    zIndexCounter: 100,
    activeWindowId: null,

    isWindowOpen(id) {
      return !!this.windows[id];
    },

    isWindowMinimized(id) {
      return this.windows[id] && this.windows[id].classList.contains('window--minimized');
    },

    createWindow(id, title, contentHTML, options = {}) {
      if (this.isWindowOpen(id)) {
        if (this.isWindowMinimized(id)) {
          this.restoreWindow(id);
        } else {
          this.focusWindow(id);
        }
        return this.windows[id];
      }

      const width = options.width || DEFAULT_WIDTH;
      const height = options.height || DEFAULT_HEIGHT;
      const pos = getCenteredPosition(width, height);
      const x = options.x !== undefined ? options.x : pos.x;
      const y = options.y !== undefined ? options.y : pos.y;

      const isMobile = window.innerWidth < 768;

      const windowEl = document.createElement('div');
      windowEl.id = `window-${id}`;
      
      this.zIndexCounter++;
      windowEl.style.zIndex = this.zIndexCounter;

      if (isMobile) {
        windowEl.className = `window window--opening window--maximized ${options.className || ''}`;
        windowEl.style.width = '100vw';
        windowEl.style.height = `calc(100vh - ${DESKTOP_BOTTOM}px)`;
        windowEl.style.left = '0px';
        windowEl.style.top = '0px';
      } else {
        windowEl.className = `window window--opening ${options.className || ''}`;
        windowEl.style.width = `${width}px`;
        windowEl.style.height = `${height}px`;
        windowEl.style.left = `${x}px`;
        windowEl.style.top = `${y}px`;
      }

      const scrollClass = options.noScroll ? 'window__content--no-scroll' : '';

      windowEl.innerHTML = `
        <div class="window__titlebar">
          <div class="window__titlebar-left">
            <span class="window__title">${title}</span>
          </div>
          <div class="window__titlebar-buttons">
            <button class="window__btn window__btn--minimize" title="Minimize">
              <svg width="10" height="10" viewBox="0 0 10 10"><line x1="0" y1="5" x2="10" y2="5" stroke="currentColor" stroke-width="1"/></svg>
            </button>
            <button class="window__btn window__btn--maximize" title="Maximize">
              <svg width="10" height="10" viewBox="0 0 10 10"><rect x="0.5" y="0.5" width="9" height="9" fill="none" stroke="currentColor" stroke-width="1"/></svg>
            </button>
            <button class="window__btn window__btn--close" title="Close">
              <svg width="10" height="10" viewBox="0 0 10 10"><line x1="0" y1="0" x2="10" y2="10" stroke="currentColor" stroke-width="1"/><line x1="10" y1="0" x2="0" y2="10" stroke="currentColor" stroke-width="1"/></svg>
            </button>
          </div>
        </div>
        <div class="window__content ${scrollClass}">
          ${contentHTML}
        </div>
      `;

      getContainer().appendChild(windowEl);
      this.windows[id] = windowEl;

      setTimeout(() => {
        windowEl.classList.remove('window--opening');
      }, OPEN_ANIM_MS);

      this.setupWindowEvents(id, windowEl);
      this.focusWindow(id);

      const taskbarBtn = document.querySelector(`.taskbar__btn[data-app="${id}"]`);
      if (taskbarBtn) {
        taskbarBtn.classList.add('taskbar__btn--active');
      }

      return windowEl;
    },

    closeWindow(id) {
      const windowEl = this.windows[id];
      if (!windowEl) return;

      windowEl.classList.add('window--closing');
      
      const taskbarBtn = document.querySelector(`.taskbar__btn[data-app="${id}"]`);
      if (taskbarBtn) {
        taskbarBtn.classList.remove('taskbar__btn--active');
      }

      setTimeout(() => {
        if (windowEl.parentNode) {
          windowEl.parentNode.removeChild(windowEl);
        }
        delete this.windows[id];
        
        if (this.activeWindowId === id) {
          this.activeWindowId = null;
          this.autoFocusNext();
        }
      }, CLOSE_ANIM_MS);
    },

    minimizeWindow(id) {
      const windowEl = this.windows[id];
      if (!windowEl) return;

      windowEl.classList.add('window--minimized');
      windowEl.classList.remove('window--focused');
      
      if (this.activeWindowId === id) {
        this.activeWindowId = null;
        this.autoFocusNext();
      }
    },

    restoreWindow(id) {
      const windowEl = this.windows[id];
      if (!windowEl) return;

      windowEl.classList.remove('window--minimized');
      this.focusWindow(id);
    },

    maximizeWindow(id) {
      const windowEl = this.windows[id];
      if (!windowEl) return;

      if (windowEl.classList.contains('window--maximized')) {
        windowEl.classList.remove('window--maximized');
        delete windowEl.dataset.userMaximized;
        windowEl.style.width = windowEl.dataset.prevWidth || `${DEFAULT_WIDTH}px`;
        windowEl.style.height = windowEl.dataset.prevHeight || `${DEFAULT_HEIGHT}px`;
        windowEl.style.left = windowEl.dataset.prevLeft || '50px';
        windowEl.style.top = windowEl.dataset.prevTop || '50px';
      } else {
        windowEl.dataset.prevWidth = windowEl.style.width;
        windowEl.dataset.prevHeight = windowEl.style.height;
        windowEl.dataset.prevLeft = windowEl.style.left;
        windowEl.dataset.prevTop = windowEl.style.top;
        windowEl.dataset.userMaximized = 'true';
        windowEl.classList.add('window--maximized');
        windowEl.style.width = '100vw';
        windowEl.style.height = `calc(100vh - ${DESKTOP_BOTTOM}px)`;
        windowEl.style.left = '0px';
        windowEl.style.top = '0px';
      }
    },

    focusWindow(id) {
      const windowEl = this.windows[id];
      if (!windowEl) return;

      if (windowEl.classList.contains('window--minimized')) {
        this.restoreWindow(id);
        return;
      }

      Object.values(this.windows).forEach(win => {
        win.classList.remove('window--focused');
      });

      this.zIndexCounter++;
      windowEl.style.zIndex = this.zIndexCounter;
      windowEl.classList.add('window--focused');
      this.activeWindowId = id;
    },

    autoFocusNext() {
      const openWindows = Object.entries(this.windows)
        .filter(([_, win]) => !win.classList.contains('window--minimized'))
        .sort((a, b) => parseInt(a[1].style.zIndex) - parseInt(b[1].style.zIndex));

      if (openWindows.length > 0) {
        const nextId = openWindows[openWindows.length - 1][0];
        this.focusWindow(nextId);
      }
    },

    setupWindowEvents(id, windowEl) {
      const titlebar = windowEl.querySelector('.window__titlebar');
      const minBtn = windowEl.querySelector('.window__btn--minimize');
      const maxBtn = windowEl.querySelector('.window__btn--maximize');
      const closeBtn = windowEl.querySelector('.window__btn--close');

      windowEl.addEventListener('mousedown', () => {
        this.focusWindow(id);
      });

      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeWindow(id);
      });

      minBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.minimizeWindow(id);
      });

      maxBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.maximizeWindow(id);
      });

      titlebar.addEventListener('dblclick', (e) => {
        if (e.target.closest('.window__btn')) return;
        this.maximizeWindow(id);
      });

      titlebar.addEventListener('mousedown', (e) => {
        if (e.target.closest('.window__btn')) return;
        if (windowEl.classList.contains('window--maximized')) return;

        drag.active = true;
        drag.windowEl = windowEl;
        drag.offsetX = e.clientX - windowEl.offsetLeft;
        drag.offsetY = e.clientY - windowEl.offsetTop;
        
        windowEl.classList.add('window--dragging');
        this.focusWindow(id);

        e.preventDefault();
      });

      windowEl.addEventListener('mousemove', (e) => {
        if (windowEl.classList.contains('window--maximized')) return;
        if (drag.active || resize.active) return;

        const rect = windowEl.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const onRight = rect.width - x <= RESIZE_BORDER;
        const onBottom = rect.height - y <= RESIZE_BORDER;

        if (onRight && onBottom) {
          windowEl.style.cursor = 'se-resize';
        } else if (onRight) {
          windowEl.style.cursor = 'e-resize';
        } else if (onBottom) {
          windowEl.style.cursor = 's-resize';
        } else {
          windowEl.style.cursor = 'default';
        }
      });

      windowEl.addEventListener('mousedown', (e) => {
        if (windowEl.classList.contains('window--maximized')) return;

        const rect = windowEl.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const onRight = rect.width - x <= RESIZE_BORDER;
        const onBottom = rect.height - y <= RESIZE_BORDER;

        if (onRight || onBottom) {
          resize.active = true;
          resize.windowEl = windowEl;
          resize.direction = (onRight && onBottom) ? 'se' : (onRight ? 'e' : 's');
          resize.startWidth = rect.width;
          resize.startHeight = rect.height;
          resize.startX = e.clientX;
          resize.startY = e.clientY;

          windowEl.classList.add('window--resizing');
          this.focusWindow(id);

          e.preventDefault();
          e.stopPropagation();
        }
      });
    }
  };


  document.addEventListener('mousemove', (e) => {
    if (drag.active && drag.windowEl) {
      let x = e.clientX - drag.offsetX;
      let y = e.clientY - drag.offsetY;

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const winWidth = drag.windowEl.offsetWidth;
      const winHeight = drag.windowEl.offsetHeight;


      x = Math.max(MIN_VISIBLE_PX - winWidth, Math.min(x, screenWidth - MIN_VISIBLE_PX));
      y = Math.max(0, Math.min(y, screenHeight - DESKTOP_BOTTOM - MIN_VISIBLE_PX));

      drag.windowEl.style.left = `${x}px`;
      drag.windowEl.style.top = `${y}px`;
    } else if (resize.active && resize.windowEl) {
      const deltaX = e.clientX - resize.startX;
      const deltaY = e.clientY - resize.startY;

      if (resize.direction.includes('e')) {
        const newWidth = Math.max(320, resize.startWidth + deltaX);
        resize.windowEl.style.width = `${newWidth}px`;
      }
      if (resize.direction.includes('s')) {
        const newHeight = Math.max(200, resize.startHeight + deltaY);
        resize.windowEl.style.height = `${newHeight}px`;
      }
    }
  });

  document.addEventListener('mouseup', () => {
    if (drag.active && drag.windowEl) {
      drag.windowEl.classList.remove('window--dragging');
      drag.active = false;
      drag.windowEl = null;
    }
    if (resize.active && resize.windowEl) {
      resize.windowEl.classList.remove('window--resizing');
      resize.windowEl.style.cursor = 'default';
      resize.active = false;
      resize.windowEl = null;
    }
  });

  window.addEventListener('resize', () => {
    const isMobile = window.innerWidth < 768;
    Object.values(WindowManager.windows).forEach(windowEl => {
      if (isMobile) {
        if (!windowEl.classList.contains('window--maximized')) {

          windowEl.dataset.prevWidth = windowEl.style.width;
          windowEl.dataset.prevHeight = windowEl.style.height;
          windowEl.dataset.prevLeft = windowEl.style.left;
          windowEl.dataset.prevTop = windowEl.style.top;
          windowEl.classList.add('window--maximized');
        }
        windowEl.style.width = '100vw';
        windowEl.style.height = `calc(100vh - ${DESKTOP_BOTTOM}px)`;
        windowEl.style.left = '0px';
        windowEl.style.top = '0px';
      } else {

        if (windowEl.dataset.prevWidth && windowEl.classList.contains('window--maximized') && !windowEl.dataset.userMaximized) {
          windowEl.classList.remove('window--maximized');
          windowEl.style.width = windowEl.dataset.prevWidth;
          windowEl.style.height = windowEl.dataset.prevHeight;
          windowEl.style.left = windowEl.dataset.prevLeft;
          windowEl.style.top = windowEl.dataset.prevTop;
        }
      }
    });
  });

