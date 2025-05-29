# UniversalShare Plugin

A lightweight, customizable JavaScript plugin for adding social media sharing buttons to your website.

## Features

- **12+ Built-in Platforms**: Facebook, Twitter, LinkedIn, WhatsApp, Telegram, Reddit, Pinterest, Tumblr, Email, SMS, Copy Link, and Print
- **Multiple Themes**: Default, minimal, rounded, and dark themes
- **Flexible Layouts**: Horizontal, vertical, and grid layouts
- **Positioning Options**: Inline, floating, sticky-top, and sticky-bottom
- **Popup Window Support**: Open shares in small popup windows instead of new tabs
- **Dual Icon Library Support**: FontAwesome and IcoMoon icons with configurable options
- **Responsive Design**: Automatically adapts to different screen sizes
- **Custom Platforms**: Add your own sharing platforms
- **Analytics Integration**: Built-in Google Analytics tracking
- **No Dependencies**: Pure vanilla JavaScript

## Installation

### Option 1: Direct Download

Download the `universal-share.js` file and include it in your project:

```html
<script src="path/to/universal-share.js"></script>
```

### CSS Dependencies

Choose your preferred icon library:

#### FontAwesome (default)

```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
/>
```

#### IcoMoon

```html
<link rel="stylesheet" href="path/to/your/icomoon/style.css" />
```

#### Both Libraries (for maximum compatibility)

```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
/>
<link rel="stylesheet" href="path/to/your/icomoon/style.css" />
```

## Quick Start

### Basic Usage

```html
<!-- HTML -->
<div id="share-buttons"></div>

<script>
  // JavaScript - Opens in popup windows by default
  const shareButtons = new UniversalShare("#share-buttons", {
    openMethod: "popup",
  });
</script>
```

### With Custom Options

```html
<div id="my-share-buttons"></div>

<script>
  const shareButtons = new UniversalShare("#my-share-buttons", {
    platforms: ["facebook", "twitter", "linkedin", "whatsapp", "copy"],
    theme: "rounded",
    size: "large",
    layout: "horizontal",
    showText: true,
    openMethod: "popup",
    iconLibrary: "fontawesome",
    title: "Check out this awesome article!",
    url: "https://example.com/article",
  });
</script>
```

## Configuration Options

| Option            | Type     | Default                                                            | Description                                                   |
| ----------------- | -------- | ------------------------------------------------------------------ | ------------------------------------------------------------- |
| `platforms`       | Array    | `['facebook', 'twitter', 'linkedin', 'whatsapp', 'email', 'copy']` | Platforms to display                                          |
| `theme`           | String   | `'default'`                                                        | Theme style: `default`, `minimal`, `rounded`, `dark`          |
| `size`            | String   | `'medium'`                                                         | Button size: `small`, `medium`, `large`                       |
| `layout`          | String   | `'horizontal'`                                                     | Layout style: `horizontal`, `vertical`, `grid`                |
| `position`        | String   | `'inline'`                                                         | Position: `inline`, `floating`, `sticky-top`, `sticky-bottom` |
| `showText`        | Boolean  | `true`                                                             | Show platform names alongside icons                           |
| `showCounter`     | Boolean  | `false`                                                            | Show share counters (if supported)                            |
| `title`           | String   | `document.title`                                                   | Title to share                                                |
| `url`             | String   | `window.location.href`                                             | URL to share                                                  |
| `description`     | String   | Meta description                                                   | Description for sharing                                       |
| `openMethod`      | String   | `'popup'`                                                          | How to open share links: `popup`, `newtab`, `same`            |
| `iconLibrary`     | String   | `'fontawesome'`                                                    | Icon library: `fontawesome`, `icomoon`, `both`                |
| `iconPrefix`      | Object   | `{fontawesome: 'fa', icomoon: 'icon'}`                             | Icon prefixes for different libraries                         |
| `popupSettings`   | Object   | See popup settings below                                           | Customize popup window behavior                               |
| `onShare`         | Function | `null`                                                             | Callback function when share button is clicked                |
| `customIcons`     | Object   | `{}`                                                               | Custom icon classes for platforms                             |
| `customPlatforms` | Object   | `{}`                                                               | Add custom sharing platforms                                  |

### Popup Settings

Default popup window configuration:

```javascript
popupSettings: {
  width: 600,        // Window width
  height: 400,       // Window height
  scrollbars: 1,     // Enable scrollbars
  resizable: 1,      // Allow resizing
  toolbar: 0,        // Hide toolbar
  location: 0,       // Hide location bar
  directories: 0,    // Hide directories
  status: 0,         // Hide status bar
  menubar: 0,        // Hide menu bar
  copyhistory: 0     // Don't copy history
}
```

## Supported Platforms

### Built-in Platforms

- **facebook** - Facebook sharing
- **twitter** - Twitter/X sharing
- **linkedin** - LinkedIn sharing
- **whatsapp** - WhatsApp sharing
- **telegram** - Telegram sharing
- **reddit** - Reddit sharing
- **pinterest** - Pinterest sharing
- **tumblr** - Tumblr sharing
- **email** - Email sharing
- **sms** - SMS sharing
- **copy** - Copy link to clipboard
- **print** - Print current page

## Advanced Usage

### Popup Window Configuration

```javascript
const shareButtons = new UniversalShare("#share-buttons", {
  openMethod: "popup",
  popupSettings: {
    width: 800,
    height: 600,
    scrollbars: 1,
    resizable: 1,
    toolbar: 1, // Show toolbar for this instance
  },
});
```

### Icon Library Configuration

#### Using IcoMoon Icons

```javascript
const shareButtons = new UniversalShare("#share-buttons", {
  iconLibrary: "icomoon",
  iconPrefix: {
    icomoon: "icon",
  },
});
```

#### Using Both Icon Libraries

```javascript
const shareButtons = new UniversalShare("#share-buttons", {
  iconLibrary: "both", // Uses both FontAwesome and IcoMoon classes
  iconPrefix: {
    fontawesome: "fa",
    icomoon: "icon",
  },
});
```

#### Custom Icon Mapping

```javascript
const shareButtons = new UniversalShare("#share-buttons", {
  iconLibrary: "icomoon",
  customIcons: {
    facebook: "icon-facebook-custom",
    twitter: "icon-twitter-custom",
  },
});
```

### Custom Platforms

```javascript
const shareButtons = new UniversalShare("#share-buttons", {
  platforms: ["facebook", "twitter", "custom-platform"],
  openMethod: "popup",
  customPlatforms: {
    "custom-platform": {
      name: "My Platform",
      icons: {
        fontawesome: "fas fa-star",
        icomoon: "icon-star",
      },
      color: "#ff6b6b",
      url: (url, title) =>
        `https://myplatform.com/share?url=${encodeURIComponent(
          url
        )}&title=${encodeURIComponent(title)}`,
    },
  },
});
```

### Event Handling

```javascript
const shareButtons = new UniversalShare("#share-buttons", {
  openMethod: "popup",
  onShare: function (platform, method) {
    console.log(`User shared on ${platform} via ${method}`);
    // Custom analytics or tracking code
  },
});
```

### Multiple Instances with Different Configurations

```javascript
// Header share buttons - new tab opening
const headerShare = new UniversalShare("#header-share", {
  platforms: ["facebook", "twitter", "copy"],
  theme: "minimal",
  size: "small",
  openMethod: "newtab",
  iconLibrary: "fontawesome",
});

// Article share buttons - popup windows
const articleShare = new UniversalShare("#article-share", {
  platforms: ["facebook", "twitter", "linkedin", "whatsapp", "email"],
  theme: "rounded",
  layout: "vertical",
  position: "sticky-top",
  openMethod: "popup",
  iconLibrary: "icomoon",
  popupSettings: {
    width: 700,
    height: 500,
  },
});
```

## Methods

### updateConfig(newConfig)

Update the configuration and re-render the buttons:

```javascript
shareButtons.updateConfig({
  theme: "dark",
  size: "large",
  openMethod: "popup",
  platforms: ["facebook", "twitter", "linkedin"],
});
```

### setOpenMethod(method)

Change how share links open:

```javascript
shareButtons.setOpenMethod("popup"); // Switch to popup windows
shareButtons.setOpenMethod("newtab"); // Switch to new tabs
shareButtons.setOpenMethod("same"); // Open in same window
```

### setIconLibrary(library)

Switch icon libraries:

```javascript
shareButtons.setIconLibrary("fontawesome");
shareButtons.setIconLibrary("icomoon");
shareButtons.setIconLibrary("both");
```

### updatePopupSettings(settings)

Modify popup window settings:

```javascript
shareButtons.updatePopupSettings({
  width: 900,
  height: 700,
  toolbar: 1,
});
```

### addPlatform(key, platform)

Add a new platform dynamically:

```javascript
shareButtons.addPlatform("youtube", {
  name: "YouTube",
  icons: {
    fontawesome: "fab fa-youtube",
    icomoon: "icon-youtube",
  },
  color: "#ff0000",
  url: (url, title) =>
    `https://youtube.com/share?url=${encodeURIComponent(url)}`,
});
```

### removePlatform(key)

Remove a platform:

```javascript
shareButtons.removePlatform("facebook");
```

### destroy()

Remove all share buttons and cleanup:

```javascript
shareButtons.destroy();
```

## Styling

### CSS Classes

The plugin generates the following CSS structure:

```html
<div class="universal-share [theme] [position]">
  <div class="share-buttons [layout]">
    <a class="share-btn [platform] [size] [icon-only]">
      <i class="[icon-class]"></i>
      <span class="btn-text">[Platform Name]</span>
    </a>
  </div>
</div>
```

### Custom Styling Example

```css
/* Custom theme */
.universal-share.my-theme .share-btn {
  border-radius: 50%;
  margin: 0 5px;
  transition: transform 0.3s ease;
}

.universal-share.my-theme .share-btn:hover {
  transform: scale(1.1);
}

/* Custom colors */
.share-btn.facebook {
  background-color: #1877f2;
}
.share-btn.twitter {
  background-color: #1da1f2;
}
.share-btn.linkedin {
  background-color: #0077b5;
}

/* Notification styling */
.share-notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #333;
  color: white;
  padding: 10px 15px;
  border-radius: 4px;
  z-index: 10000;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.share-notification.show {
  opacity: 1;
}
```

## Examples

### Minimal Setup with Popup Windows

```html
<div id="share-minimal"></div>
<script>
  new UniversalShare("#share-minimal", {
    platforms: ["facebook", "twitter", "copy"],
    theme: "minimal",
    showText: false,
    openMethod: "popup",
  });
</script>
```

### Floating Share Bar with IcoMoon Icons

```html
<div id="share-floating"></div>
<script>
  new UniversalShare("#share-floating", {
    platforms: ["facebook", "twitter", "linkedin", "whatsapp"],
    position: "floating",
    theme: "dark",
    layout: "vertical",
    iconLibrary: "icomoon",
    openMethod: "popup",
    popupSettings: {
      width: 550,
      height: 450,
    },
  });
</script>
```

### Blog Article Sharing with Mixed Icons

```html
<div id="article-share"></div>
<script>
  new UniversalShare("#article-share", {
    platforms: ["facebook", "twitter", "linkedin", "reddit", "email", "copy"],
    title: "Amazing Blog Post Title",
    description: "This blog post will change your life!",
    theme: "rounded",
    size: "large",
    iconLibrary: "both", // Uses both FontAwesome and IcoMoon
    openMethod: "popup",
    popupSettings: {
      width: 650,
      height: 500,
      scrollbars: 1,
      resizable: 1,
    },
    onShare: function (platform, method) {
      // Track sharing events
      gtag("event", "share", {
        method: platform,
        content_type: "blog_post",
        custom_parameters: {
          open_method: method,
        },
      });
    },
  });
</script>
```

### Dynamic Configuration Changes

```html
<div id="dynamic-share"></div>
<button onclick="switchToPopup()">Use Popup Windows</button>
<button onclick="switchToNewTab()">Use New Tabs</button>
<button onclick="switchIcons()">Switch to IcoMoon</button>

<script>
  const dynamicShare = new UniversalShare("#dynamic-share", {
    platforms: ["facebook", "twitter", "linkedin"],
  });

  function switchToPopup() {
    dynamicShare.setOpenMethod("popup");
  }

  function switchToNewTab() {
    dynamicShare.setOpenMethod("newtab");
  }

  function switchIcons() {
    dynamicShare.setIconLibrary("icomoon");
  }
</script>
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Android Browser 81+

**Note**: Popup windows may be blocked by popup blockers in some browsers. The plugin handles this gracefully by falling back to new tab behavior.

## Analytics Integration

### Google Analytics 4

The plugin automatically tracks share events if Google Analytics is detected:

```javascript
// Automatic tracking (if gtag is available)
gtag("event", "share", {
  method: platform,
  content_type: "article",
  item_id: url,
  custom_parameters: {
    open_method: openMethod,
  },
});
```

### Custom Analytics

```javascript
new UniversalShare("#share-buttons", {
  openMethod: "popup",
  onShare: function (platform, method) {
    // Your custom analytics code
    analytics.track("Content Shared", {
      platform: platform,
      openMethod: method,
      url: this.config.url,
      title: this.config.title,
    });
  },
});
```

## Troubleshooting

### Common Issues

**Q: Icons are not showing**
A: Make sure your chosen icon library (FontAwesome or IcoMoon) is properly loaded before initializing UniversalShare.

**Q: Share buttons not appearing**
A: Check that the target element exists in the DOM and the selector is correct.

**Q: Popup windows are being blocked**
A: Some browsers block popup windows by default. Users may need to allow popups for your site, or you can fall back to `openMethod: 'newtab'`.

**Q: Copy to clipboard not working**
A: The clipboard API requires HTTPS. On HTTP, it falls back to the `document.execCommand` method.

**Q: IcoMoon icons not displaying**
A: Ensure your IcoMoon CSS file is loaded and the icon prefix matches your configuration (`iconPrefix.icomoon`).

**Q: Mixed icon libraries causing conflicts**
A: When using `iconLibrary: 'both'`, make sure both libraries use different prefixes to avoid CSS conflicts.

## Migration Guide

### From v1.x to v2.x

Key changes in v2.0:

1. **New openMethod configuration**:

   ```javascript
   // Old way (still works)
   target: "_blank";

   // New way
   openMethod: "popup"; // or 'newtab', 'same'
   ```

2. **Icon library support**:

   ```javascript
   // New configuration
   iconLibrary: 'icomoon',
   iconPrefix: { icomoon: 'icon' }
   ```

3. **Enhanced platform definitions**:
   ```javascript
   // Platforms now support multiple icon libraries
   customPlatforms: {
     myplatform: {
       name: "My Platform",
       icons: {
         fontawesome: "fas fa-star",
         icomoon: "icon-star"
       }
     }
   }
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

### v2.0.0

- **NEW**: Popup window support with configurable settings
- **NEW**: Dual icon library support (FontAwesome + IcoMoon)
- **NEW**: Enhanced platform definitions with multiple icon options
- **NEW**: Additional public methods for dynamic configuration
- **IMPROVED**: Better analytics tracking with open method information
- **IMPROVED**: Enhanced notification system
- **IMPROVED**: Better error handling and fallbacks

### v1.0.0

- Initial release
- Support for 12+ platforms
- Multiple themes and layouts
- Responsive design
- Analytics integration

---

**Made with ❤️ by Hashan Madhushanka**
