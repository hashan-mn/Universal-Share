# UniversalShare Plugin

A lightweight, customizable JavaScript plugin for adding social media sharing buttons to your website.

## Features

- **12+ Built-in Platforms**: Facebook, Twitter, LinkedIn, WhatsApp, Telegram, Reddit, Pinterest, Tumblr, Email, SMS, Copy Link, and Print
- **Multiple Themes**: Default, minimal, rounded, and dark themes
- **Flexible Layouts**: Horizontal, vertical, and grid layouts
- **Positioning Options**: Inline, floating, sticky-top, and sticky-bottom
- **Popup Window Support**: Open shares in small popup windows instead of new tabs
- **Dual Icon Library Support**: FontAwesome and IcoMoon icons with configurable options
- **Flexible Element Selection**: Pass either CSS selector strings or DOM elements directly
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

## Constructor

### UniversalShare(selectorOrElement, options)

The constructor accepts two parameters:

- **selectorOrElement**: Can be either:
  - A CSS selector string (e.g., `"#share-buttons"`, `.share-container`)
  - A DOM element object (e.g., `document.getElementById('share-buttons')`)
- **options**: Configuration object (optional)

## Quick Start

### Basic Usage with CSS Selector

```html
<!-- HTML -->
<div id="share-buttons"></div>

<script>
  // JavaScript - Using CSS selector string
  const shareButtons = new UniversalShare("#share-buttons", {
    openMethod: "popup",
  });
</script>
```

### Basic Usage with DOM Element

```html
<!-- HTML -->
<div id="share-buttons"></div>

<script>
  // JavaScript - Using DOM element directly
  const element = document.getElementById("share-buttons");
  const shareButtons = new UniversalShare(element, {
    openMethod: "popup",
  });
</script>
```

### Advanced Element Selection Examples

```html
<div class="article-share"></div>
<div class="sidebar-share"></div>

<script>
  // Method 1: Using CSS selector
  const articleShare = new UniversalShare(".article-share", {
    platforms: ["facebook", "twitter", "linkedin"],
    theme: "rounded",
  });

  // Method 2: Using querySelector result
  const sidebarElement = document.querySelector(".sidebar-share");
  const sidebarShare = new UniversalShare(sidebarElement, {
    platforms: ["copy", "email"],
    layout: "vertical",
  });

  // Method 3: Using getElementsByClassName result
  const shareContainers = document.getElementsByClassName("share-container");
  if (shareContainers.length > 0) {
    const firstShare = new UniversalShare(shareContainers[0], {
      theme: "minimal",
    });
  }

  // Method 4: Dynamically created element
  const dynamicContainer = document.createElement("div");
  document.body.appendChild(dynamicContainer);
  const dynamicShare = new UniversalShare(dynamicContainer, {
    platforms: ["whatsapp", "telegram"],
    position: "floating",
  });
</script>
```

### Error Handling

The plugin includes built-in error handling for invalid selectors or elements:

```javascript
// Invalid selector - will log error and return early
const invalidShare = new UniversalShare("#non-existent-element");

// Invalid parameter type - will log error and return early
const invalidShare2 = new UniversalShare(123); // Numbers not allowed

// Null/undefined element - will log error and return early
const nullElement = null;
const invalidShare3 = new UniversalShare(nullElement);
```

Error messages you might see:

- `"UniversalShare: First parameter must be either a CSS selector string or a DOM element"`
- `"UniversalShare: Element with selector "#invalid-selector" not found"`
- `"UniversalShare: Element not found"` (when DOM element is passed but is null/undefined)

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

### Multiple Instances with Different Element Types

```javascript
// Using CSS selector for header
const headerShare = new UniversalShare("#header-share", {
  platforms: ["facebook", "twitter", "copy"],
  theme: "minimal",
  size: "small",
  openMethod: "newtab",
});

// Using DOM element for article
const articleElement = document.querySelector(
  ".article-content .share-buttons"
);
const articleShare = new UniversalShare(articleElement, {
  platforms: ["facebook", "twitter", "linkedin", "whatsapp", "email"],
  theme: "rounded",
  layout: "vertical",
  openMethod: "popup",
});

// Using dynamically created element for floating buttons
const floatingContainer = document.createElement("div");
floatingContainer.className = "floating-share";
document.body.appendChild(floatingContainer);

const floatingShare = new UniversalShare(floatingContainer, {
  platforms: ["copy", "email", "whatsapp"],
  position: "floating",
  theme: "dark",
  layout: "vertical",
  showText: false,
  openMethod: "popup",
});
```

### Dynamic Element Creation and Initialization

```javascript
function createShareButtons(containerId, platforms) {
  // Create container element
  const container = document.createElement("div");
  container.id = containerId;
  container.className = "dynamic-share-container";

  // Append to page
  document.body.appendChild(container);

  // Initialize UniversalShare with the created element
  return new UniversalShare(container, {
    platforms: platforms,
    theme: "rounded",
    openMethod: "popup",
  });
}

// Usage
const blogShare = createShareButtons("blog-share", [
  "facebook",
  "twitter",
  "linkedin",
]);
const productShare = createShareButtons("product-share", [
  "whatsapp",
  "email",
  "copy",
]);
```

### Working with Form Elements or Complex DOM Structures

```html
<form id="contact-form">
  <div class="form-group">
    <label>Share this page:</label>
    <div class="share-wrapper"></div>
  </div>
</form>

<script>
  // Method 1: Using nested selector
  const formShare1 = new UniversalShare("#contact-form .share-wrapper", {
    platforms: ["copy", "email"],
    showText: false,
  });

  // Method 2: Using DOM traversal
  const form = document.getElementById("contact-form");
  const shareWrapper = form.querySelector(".share-wrapper");
  const formShare2 = new UniversalShare(shareWrapper, {
    platforms: ["copy", "email"],
    showText: false,
  });
</script>
```

### Popup Window Configuration

```javascript
// Using CSS selector with popup settings
const shareButtons = new UniversalShare("#share-buttons", {
  openMethod: "popup",
  popupSettings: {
    width: 800,
    height: 600,
    scrollbars: 1,
    resizable: 1,
    toolbar: 1,
  },
});

// Using DOM element with popup settings
const element = document.getElementById("share-container");
const shareButtons2 = new UniversalShare(element, {
  openMethod: "popup",
  popupSettings: {
    width: 550,
    height: 450,
  },
});
```

### Icon Library Configuration

#### Using IcoMoon Icons

```javascript
// With CSS selector
const shareButtons = new UniversalShare("#share-buttons", {
  iconLibrary: "icomoon",
  iconPrefix: {
    icomoon: "icon",
  },
});

// With DOM element
const element = document.querySelector(".share-container");
const shareButtons2 = new UniversalShare(element, {
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

### Custom Platforms

```javascript
// Works with both selector and DOM element
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
// Using CSS selector
const shareButtons = new UniversalShare("#share-buttons", {
  openMethod: "popup",
  onShare: function (platform, method) {
    console.log(`User shared on ${platform} via ${method}`);
  },
});

// Using DOM element
const element = document.getElementById("share-container");
const shareButtons2 = new UniversalShare(element, {
  openMethod: "popup",
  onShare: function (platform, method) {
    console.log(`User shared on ${platform} via ${method}`);
  },
});
```

## Methods

All methods work regardless of whether the instance was created with a CSS selector or DOM element.

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
shareButtons.setOpenMethod("popup");
shareButtons.setOpenMethod("newtab");
shareButtons.setOpenMethod("same");
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

### Minimal Setup with CSS Selector

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

### Minimal Setup with DOM Element

```html
<div id="share-minimal"></div>
<script>
  const element = document.getElementById("share-minimal");
  new UniversalShare(element, {
    platforms: ["facebook", "twitter", "copy"],
    theme: "minimal",
    showText: false,
    openMethod: "popup",
  });
</script>
```

### Floating Share Bar with DOM Element Selection

```html
<div class="floating-share-container"></div>
<script>
  const floatingElement = document.querySelector(".floating-share-container");
  new UniversalShare(floatingElement, {
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

### Dynamic Element Creation and Management

```html
<button onclick="createShareButtons()">Create Share Buttons</button>
<button onclick="removeShareButtons()">Remove Share Buttons</button>

<script>
  let dynamicShare = null;
  let dynamicContainer = null;

  function createShareButtons() {
    if (dynamicContainer) return; // Already created

    // Create container element
    dynamicContainer = document.createElement("div");
    dynamicContainer.className = "dynamic-share";
    document.body.appendChild(dynamicContainer);

    // Initialize UniversalShare with the created element
    dynamicShare = new UniversalShare(dynamicContainer, {
      platforms: ["facebook", "twitter", "linkedin", "copy"],
      theme: "rounded",
      openMethod: "popup",
      onShare: function (platform, method) {
        console.log(`Shared on ${platform} via ${method}`);
      },
    });
  }

  function removeShareButtons() {
    if (dynamicShare) {
      dynamicShare.destroy();
      dynamicShare = null;
    }
    if (dynamicContainer) {
      dynamicContainer.remove();
      dynamicContainer = null;
    }
  }
</script>
```

### Multiple Instances with Mixed Element Types

```html
<div id="header-share"></div>
<div class="article-share"></div>
<div class="sidebar-share"></div>

<script>
  // Header: Using CSS selector
  const headerShare = new UniversalShare("#header-share", {
    platforms: ["facebook", "twitter", "copy"],
    theme: "minimal",
    size: "small",
    openMethod: "newtab",
  });

  // Article: Using querySelector result
  const articleElement = document.querySelector(".article-share");
  const articleShare = new UniversalShare(articleElement, {
    platforms: ["facebook", "twitter", "linkedin", "whatsapp", "email"],
    theme: "rounded",
    layout: "vertical",
    openMethod: "popup",
  });

  // Sidebar: Using CSS selector with different config
  const sidebarShare = new UniversalShare(".sidebar-share", {
    platforms: ["copy", "email"],
    layout: "vertical",
    showText: false,
    theme: "dark",
    openMethod: "popup",
    popupSettings: {
      width: 500,
      height: 400,
    },
  });
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
// Works with both CSS selectors and DOM elements
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

**Q: "Element not found" error**
A: When using CSS selectors, ensure the element exists in the DOM before initialization. When using DOM elements, make sure the element is not null or undefined.

```javascript
// Bad: Element might not exist yet
const share = new UniversalShare("#share-buttons");

// Good: Check if element exists first
const element = document.getElementById("share-buttons");
if (element) {
  const share = new UniversalShare(element);
}

// Or with CSS selector
if (document.querySelector("#share-buttons")) {
  const share = new UniversalShare("#share-buttons");
}
```

**Q: Icons are not showing**
A: Make sure your chosen icon library (FontAwesome or IcoMoon) is properly loaded before initializing UniversalShare.

**Q: Share buttons not appearing**
A: Check that the target element exists in the DOM and is accessible. Use browser developer tools to verify the element is present.

**Q: Popup windows are being blocked**
A: Some browsers block popup windows by default. Users may need to allow popups for your site, or you can fall back to `openMethod: 'newtab'`.

**Q: Copy to clipboard not working**
A: The clipboard API requires HTTPS. On HTTP, it falls back to the `document.execCommand` method.

## Migration Guide

### From v1.x to v2.x

Key changes in v2.0:

1. **Enhanced constructor flexibility**:

   ```javascript
   // Both methods now supported
   new UniversalShare("#share-buttons"); // CSS selector
   new UniversalShare(document.getElementById("share-buttons")); // DOM element
   ```

2. **New openMethod configuration**:

   ```javascript
   // Old way (still works)
   target: "_blank";

   // New way
   openMethod: "popup"; // or 'newtab', 'same'
   ```

3. **Icon library support**:

   ```javascript
   // New configuration
   iconLibrary: 'icomoon',
   iconPrefix: { icomoon: 'icon' }
   ```

4. **Enhanced platform definitions**:
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

### v2.1.0

- **NEW**: Constructor now accepts both CSS selector strings and DOM elements directly
- **NEW**: Enhanced error handling for invalid selectors and elements
- **IMPROVED**: Better flexibility for dynamic element creation and management
- **IMPROVED**: More robust element validation and error messages

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
