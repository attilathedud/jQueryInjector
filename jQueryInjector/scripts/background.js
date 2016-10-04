var options = {
    'alwaysInjectURLs'     : []
};

function contextMenu_onclick( info, tab ) {
    var tab_id          = 0;

    chrome.tabs.query({
        "active"        : true,
        "currentWindow" : true
    }, function (tabs) {
        tab_id = tabs[ 0 ].id;

        chrome.tabs.sendMessage( tab_id, { "function" : "inject" } );
    }); 
};

chrome.contextMenus.create({
    "title"     : "jQuery Injector",
    "contexts"  :[ "page" ],
    "onclick"   : contextMenu_onclick
});  

chrome.tabs.onUpdated.addListener( function( tabId, changeInfo, tab ) { 
    for( url in options[ 'alwaysInjectURLs'] ) {
        if( tab.url.indexOf( options[ 'alwaysInjectURLs'][ url ] ) != -1 ) {
            chrome.tabs.sendMessage( tabId, { "function" : "inject" } );
        }
    }
});

chrome.storage.onChanged.addListener( function( changes, namespace ) {
    for (key in changes) {
        var storageChange = changes[key];

        options[ key ] = storageChange.newValue;
    }
});

chrome.storage.local.get({
    alwaysInjectURLs           : []
}, function ( items ) {
    for( key in items ) {
        options[ key ] = items[ key ];
    }
});
