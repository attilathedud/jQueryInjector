# jQuery Injector
![Settings screenshot](/promos/promo_1.png?raw=true "Settings")

[Play Store](https://chrome.google.com/webstore/detail/jquery-injector/ekkjohcjbjcjjifokpingdbdlfekjcgi "Play Store")

### About
jQuery Injector allows you to inject jQuery into every frame on a page so that you can use jQuery in the dev console. 

Features:
- Set the jQuery URL to inject any version you want.
- Specify websites and page patterns to automatically inject into.
- Entry in context-menu to make injection even easier.

### v1.1.0 Changelog
- Added the option to delete previous jQuery versions when injecting.
- Added an indicator for when jQuery is already present on the page.
- Added link to Options screen in the popup options panel.
- Bumped the default jQuery version to 3.2.1.
- Fixed a bug where the head tag would be placed after the body tag on pages with no original head tag.
- Fixed some styling/UI issues.

### v1.0.1 Changelog
- Added a context-menu entry for embedded pdfs.
- Fixed a bug that made it impossible to inject into pages with no head tag.
- Fixed font-rendering in settings for newer Chrome versions.

### Details
jQuery URL
A non-protocol encoded URL to the version of jQuery you want to use. A list can be found here.

Always Inject
Can either be a full URL (e.g., https://www.google.com) or part of a URL (e.g., "test" would match https://www.google.com/test, http://www.test.com, etc.). jQuery will be automatically injected after the DOM completes.

### Notes
Firewalls (like uMatrix) will block jQuery from loading until you allow code.jquery.com to load scripts on that domain.
Background by Carlos Aguilar.
