var options = {
    "jQueryURL"     : ''
};

// due to the fact content scripts are sandboxed, we can't check for existing instances of jquery
function safe_inject() {
	if( document.head.length === 0 ) {
		document.getElementsByTagName( 'html' )[ 0 ].appendChild( document.createElement('head') );
	}  

	var script = document.createElement( 'script' );

	script.src = options[ "jQueryURL" ];
	script.type = 'text/javascript';

	script.onload = function () {
		console.log( "jQuery(" + options[ "jQueryURL" ] + ") loaded." );
	};

	script.onerror = function () {
		delete jQuery;
		console.log( "Error while loading jQuery(" + options[ "jQueryURL" ] + ")." );
	};

	document.head.appendChild( script );
}

chrome.extension.onMessage.addListener( function ( message, sender, callback ) {
    if ( message.function == "inject" ) {
        safe_inject();
    }
});

chrome.storage.onChanged.addListener( function( changes, namespace ) {
    for (key in changes) {
        var storageChange = changes[key];

        options[ key ] = storageChange.newValue;
    }
});

chrome.storage.local.get({
    jQueryURL           : '//code.jquery.com/jquery-2.2.4.min.js'
}, function ( items ) {
    for( key in items ) {
        options[ key ] = items[ key ];
    }
});
