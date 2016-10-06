# jQuery Injector
![Settings screenshot](/promos/promo_1.png?raw=true "Settings")

[Play Store](https://chrome.google.com/webstore/detail/jquery-injector/ekkjohcjbjcjjifokpingdbdlfekjcgi "Play Store")

### About
jQuery Injector allows you to inject jQuery into every frame on a page so that you can use jQuery in the dev console. 

Features:
- Set the jQuery URL to inject any version you want.
- Specify websites and page patterns to automatically inject into.
- Entry in context-menu to make injection even easier.

### Details

jQuery URL
A non-protocol encoded URL to the version of jQuery you want to use. A list can be found here.

Always Inject
Can either be a full URL (e.g., https://www.google.com) or part of a URL (e.g., "test" would match https://www.google.com/test, http://www.test.com, etc.). jQuery will be automatically injected after the DOM completes.

Notes
Firewalls (like uMatrix) will block jQuery from loading until you allow code.jquery.com to load scripts on that domain.
Background by Carlos Aguilar.
