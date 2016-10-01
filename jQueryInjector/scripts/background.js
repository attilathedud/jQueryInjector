function contextMenu_onclick( info, tab ) {
    var url_to_download = info.linkUrl;
    var tab_id          = 0;

    chrome.tabs.query({
        "active"        : true,
        "currentWindow" : true
    }, function (tabs) {
        tab_id = tabs[ 0 ].id;

        chrome.tabs.sendMessage( tab_id, { "function" : "inject" });
    }); 
};

chrome.contextMenus.create({
    "title"     : "jQuery Injector",
    "contexts"  :[ "page" ],
    "onclick"   : contextMenu_onclick
});  
