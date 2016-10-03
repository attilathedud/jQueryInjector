//chrome.contextMenus.removeAll(function callback)

var options = {
    "jQueryURL"     : ''
};

chrome.storage.local.get({
    jQueryURL           : '//code.jquery.com/jquery-2.2.4.min.js'
}, function ( items ) {
    for( key in items ) {
        options[ key ] = items[ key ];
    }

    document.getElementById( 'jQueryURLInput' ).value = options[ "jQueryURL" ];

    document.getElementById( 'saveSettings' ).onclick = function() {
    	chrome.storage.local.set( { jQueryURL : document.getElementById( 'jQueryURLInput' ).value } );
    };
});
