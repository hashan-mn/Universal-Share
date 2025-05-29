class UniversalShare {
    constructor(selector, options = {}) {
        this.selector = selector;
        this.element = document.querySelector(selector);

        if (!this.element) {
            console.error(`UniversalShare: Element with selector "${selector}" not found`);
            return;
        }

        // Default configuration
        this.config = {
            // Platform settings
            platforms: ['facebook', 'twitter', 'linkedin', 'whatsapp', 'email', 'copy'],

            // Appearance settings
            theme: 'default', // default, minimal, rounded, dark
            size: 'medium', // small, medium, large
            layout: 'horizontal', // horizontal, vertical, grid
            position: 'inline', // inline, floating, sticky-top, sticky-bottom
            showText: true,
            showCounter: false,

            // Content settings
            title: document.title,
            url: window.location.href,
            description: document.querySelector('meta[name="description"]')?.content || '',

            // Icon library settings
            iconLibrary: 'fontawesome', // 'fontawesome', 'icomoon', or 'both'
            iconPrefix: {
                fontawesome: 'fa', // FontAwesome prefix (fa, fas, fab, etc.)
                icomoon: 'icon' // IcoMoon prefix
            },

            // Window settings
            openMethod: 'popup', // 'popup', 'newtab', 'same'
            popupSettings: {
                width: 600,
                height: 400,
                scrollbars: 1,
                resizable: 1,
                toolbar: 0,
                location: 0,
                directories: 0,
                status: 0,
                menubar: 0,
                copyhistory: 0
            },

            // Callbacks and customization
            onShare: null,
            customIcons: {},
            customPlatforms: {},

            ...options
        };

        // Default platform configurations with multiple icon options
        this.platforms = {
            facebook: {
                name: 'Facebook',
                icons: {
                    fontawesome: 'fab fa-facebook-f',
                    icomoon: 'icon-facebook'
                },
                color: '#1877f2',
                url: (url, title) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
            },
            twitter: {
                name: 'Twitter',
                icons: {
                    fontawesome: 'fab fa-twitter',
                    icomoon: 'icon-twitter'
                },
                color: '#1da1f2',
                url: (url, title) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
            },
            linkedin: {
                name: 'LinkedIn',
                icons: {
                    fontawesome: 'fab fa-linkedin-in',
                    icomoon: 'icon-linkedin'
                },
                color: '#0077b5',
                url: (url, title) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
            },
            whatsapp: {
                name: 'WhatsApp',
                icons: {
                    fontawesome: 'fab fa-whatsapp',
                    icomoon: 'icon-whatsapp'
                },
                color: '#25d366',
                url: (url, title) => `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`
            },
            telegram: {
                name: 'Telegram',
                icons: {
                    fontawesome: 'fab fa-telegram-plane',
                    icomoon: 'icon-telegram'
                },
                color: '#0088cc',
                url: (url, title) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
            },
            reddit: {
                name: 'Reddit',
                icons: {
                    fontawesome: 'fab fa-reddit-alien',
                    icomoon: 'icon-reddit'
                },
                color: '#ff4500',
                url: (url, title) => `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
            },
            pinterest: {
                name: 'Pinterest',
                icons: {
                    fontawesome: 'fab fa-pinterest-p',
                    icomoon: 'icon-pinterest'
                },
                color: '#bd081c',
                url: (url, title) => `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`
            },
            tumblr: {
                name: 'Tumblr',
                icons: {
                    fontawesome: 'fab fa-tumblr',
                    icomoon: 'icon-tumblr'
                },
                color: '#00cf35',
                url: (url, title) => `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
            },
            email: {
                name: 'Email',
                icons: {
                    fontawesome: 'fas fa-envelope',
                    icomoon: 'icon-mail'
                },
                color: '#34495e',
                url: (url, title) => `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`
            },
            copy: {
                name: 'Copy Link',
                icons: {
                    fontawesome: 'fas fa-link',
                    icomoon: 'icon-link'
                },
                color: '#6c5ce7',
                action: 'copy'
            },
            print: {
                name: 'Print',
                icons: {
                    fontawesome: 'fas fa-print',
                    icomoon: 'icon-printer'
                },
                color: '#95a5a6',
                action: 'print'
            },
            sms: {
                name: 'SMS',
                icons: {
                    fontawesome: 'fas fa-sms',
                    icomoon: 'icon-mobile'
                },
                color: '#2ecc71',
                url: (url, title) => `sms:?body=${encodeURIComponent(title + ' ' + url)}`
            }
        };

        // Merge custom platforms
        this.platforms = { ...this.platforms, ...this.config.customPlatforms };

        this.init();
    }

    init() {
        this.render();
        this.bindEvents();
    }

    render() {
        const container = document.createElement('div');
        container.className = this.getContainerClasses();

        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = this.getButtonsContainerClasses();

        this.config.platforms.forEach(platformKey => {
            if (this.platforms[platformKey]) {
                const button = this.createButton(platformKey);
                buttonsContainer.appendChild(button);
            }
        });

        container.appendChild(buttonsContainer);
        this.element.appendChild(container);

        // Apply custom styles if needed
        this.applyCustomStyles(container);
    }

    getContainerClasses() {
        let classes = ['universal-share'];

        if (this.config.theme !== 'default') {
            classes.push(this.config.theme);
        }

        if (this.config.position !== 'inline') {
            classes.push(this.config.position);
        }

        return classes.join(' ');
    }

    getButtonsContainerClasses() {
        let classes = ['share-buttons'];

        if (this.config.layout !== 'horizontal') {
            classes.push(this.config.layout);
        }

        return classes.join(' ');
    }

    getIconClass(platformKey) {
        const platform = this.platforms[platformKey];

        // Check for custom icon first
        if (this.config.customIcons[platformKey]) {
            return this.config.customIcons[platformKey];
        }

        // Handle icon library selection
        if (this.config.iconLibrary === 'both') {
            // Return both classes for maximum compatibility
            const faIcon = platform.icons?.fontawesome || '';
            const icIcon = platform.icons?.icomoon || '';
            return `${faIcon} ${icIcon}`.trim();
        } else if (this.config.iconLibrary === 'icomoon') {
            return platform.icons?.icomoon || platform.icons?.fontawesome || '';
        } else {
            // Default to fontawesome
            return platform.icons?.fontawesome || platform.icons?.icomoon || '';
        }
    }

    createButton(platformKey) {
        const platform = this.platforms[platformKey];
        const button = document.createElement('a');

        // Set classes
        let buttonClasses = ['share-btn', platformKey];
        if (this.config.size !== 'medium') {
            buttonClasses.push(this.config.size);
        }
        if (!this.config.showText) {
            buttonClasses.push('icon-only');
        }
        button.className = buttonClasses.join(' ');

        // Set icon
        const iconClass = this.getIconClass(platformKey);
        const icon = document.createElement('i');
        icon.className = iconClass;

        // Set text
        const text = document.createElement('span');
        text.className = 'btn-text';
        text.textContent = platform.name;

        button.appendChild(icon);
        button.appendChild(text);

        // Set href and click handler
        if (platform.action) {
            button.href = '#';
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleAction(platform.action, platformKey);
            });
        } else if (platform.url) {
            const shareUrl = platform.url(this.config.url, this.config.title);
            button.href = shareUrl;

            // Handle different opening methods
            if (this.config.openMethod === 'popup') {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.openPopup(shareUrl, platformKey);
                    this.handleShare(platformKey);
                });
            } else if (this.config.openMethod === 'newtab') {
                button.target = '_blank';
                button.rel = 'noopener noreferrer';
                button.addEventListener('click', () => {
                    this.handleShare(platformKey);
                });
            } else {
                // Same window
                button.addEventListener('click', () => {
                    this.handleShare(platformKey);
                });
            }
        }

        return button;
    }

    openPopup(url, platformKey) {
        const settings = this.config.popupSettings;
        const platform = this.platforms[platformKey];

        // Calculate center position
        const screenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
        const screenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;
        const width = window.innerWidth || document.documentElement.clientWidth || window.screen.width;
        const height = window.innerHeight || document.documentElement.clientHeight || window.screen.height;

        const left = ((width / 2) - (settings.width / 2)) + screenLeft;
        const top = ((height / 2) - (settings.height / 2)) + screenTop;

        // Build window features string
        const features = [
            `width=${settings.width}`,
            `height=${settings.height}`,
            `top=${top}`,
            `left=${left}`,
            `scrollbars=${settings.scrollbars}`,
            `resizable=${settings.resizable}`,
            `toolbar=${settings.toolbar}`,
            `location=${settings.location}`,
            `directories=${settings.directories}`,
            `status=${settings.status}`,
            `menubar=${settings.menubar}`,
            `copyhistory=${settings.copyhistory}`
        ].join(',');

        // Open popup window
        const popup = window.open(url, `share_${platformKey}`, features);

        // Focus the popup window if it was successfully opened
        if (popup) {
            popup.focus();
        }

        return popup;
    }

    handleAction(action, platformKey) {
        switch (action) {
            case 'copy':
                this.copyToClipboard();
                break;
            case 'print':
                window.print();
                break;
        }
        this.handleShare(platformKey);
    }

    handleShare(platformKey) {
        // Track share
        this.trackShare(platformKey);

        // Call custom callback
        if (typeof this.config.onShare === 'function') {
            this.config.onShare(platformKey, this.config.openMethod);
        }
    }

    copyToClipboard() {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(this.config.url).then(() => {
                this.showNotification('Link copied to clipboard! 📋');
            }).catch(() => {
                this.fallbackCopyTextToClipboard();
            });
        } else {
            this.fallbackCopyTextToClipboard();
        }
    }

    fallbackCopyTextToClipboard() {
        const textArea = document.createElement('textarea');
        textArea.value = this.config.url;
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
            this.showNotification('Link copied to clipboard! 📋');
        } catch (err) {
            this.showNotification('Could not copy link ❌');
        }

        document.body.removeChild(textArea);
    }

    showNotification(message) {
        let notification = document.getElementById('share-notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'share-notification';
            notification.className = 'share-notification';
            document.body.appendChild(notification);
        }

        notification.textContent = message;
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    trackShare(platform) {
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'share', {
                'method': platform,
                'content_type': 'article',
                'item_id': this.config.url,
                'custom_parameters': {
                    'open_method': this.config.openMethod
                }
            });
        }

        // Custom tracking
        console.log(`Shared on ${platform} via ${this.config.openMethod}:`, this.config.url);
    }

    applyCustomStyles(container) {
        // Apply any custom styles based on configuration
        if (this.config.position === 'floating') {
            // Additional floating styles can be applied here
        }
    }

    bindEvents() {
        // Handle window resize for responsive behavior
        window.addEventListener('resize', () => {
            // Responsive adjustments if needed
        });
    }

    // Public methods
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        this.element.innerHTML = '';
        this.render();
    }

    setOpenMethod(method) {
        if (['popup', 'newtab', 'same'].includes(method)) {
            this.config.openMethod = method;
            this.element.innerHTML = '';
            this.render();
        }
    }

    setIconLibrary(library) {
        if (['fontawesome', 'icomoon', 'both'].includes(library)) {
            this.config.iconLibrary = library;
            this.element.innerHTML = '';
            this.render();
        }
    }

    updatePopupSettings(settings) {
        this.config.popupSettings = { ...this.config.popupSettings, ...settings };
    }

    destroy() {
        this.element.innerHTML = '';
        // Remove notification if exists
        const notification = document.getElementById('share-notification');
        if (notification) {
            notification.remove();
        }
    }

    addPlatform(key, platform) {
        this.platforms[key] = platform;
        if (!this.config.platforms.includes(key)) {
            this.config.platforms.push(key);
            this.element.innerHTML = '';
            this.render();
        }
    }

    removePlatform(key) {
        const index = this.config.platforms.indexOf(key);
        if (index > -1) {
            this.config.platforms.splice(index, 1);
            this.element.innerHTML = '';
            this.render();
        }
    }
}
