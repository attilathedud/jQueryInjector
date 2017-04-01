var options = {
    'alwaysInjectURLs'  : []
};

chrome.storage.local.get({
    alwaysInjectURLs 	: []
}, function ( items ) {
    for( key in items ) {
        options[ key ] = items[ key ];
    }

    chrome.tabs.query({
        "active"        : true,
        "currentWindow" : true
    }, function ( tabs ) {
        tab_id = tabs[ 0 ].id;

        for( url in options[ 'alwaysInjectURLs'] ) {
            if( tabs[ 0 ].url.indexOf( options[ 'alwaysInjectURLs'][ url ] ) != -1 ) {
                document.getElementById( 'alwaysInject' ).style.display = 'none';
            }
        }

        document.getElementById( 'inject' ).onclick = function() {
            chrome.tabs.sendMessage( tab_id, { "function" : "inject" } );
        }

        document.getElementById( 'alwaysInject' ).onclick = function() {
            options[ 'alwaysInjectURLs' ].push( tabs[ 0 ].url );
            chrome.storage.local.set( { alwaysInjectURLs : options[ 'alwaysInjectURLs' ] } );
            document.getElementById( 'alwaysInject' ).style.display = 'none';
        };

        document.getElementById( 'showOptions' ).onclick = function() {
            chrome.runtime.openOptionsPage();
        };
    });     
});
