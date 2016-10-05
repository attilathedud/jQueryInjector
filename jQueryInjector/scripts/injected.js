var options = {
    'jQueryURL'     : ''
};

/*!
*	Inject jQuery by writing a reference to the script at the end of document head. 
*	Since content-scripts will fire after the DOM is finished, this won't cause any issues.
*
*	We can't check for instances of jQuery on the page since content-scripts are sandboxed.
*/
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

/*!
*	To prevent a race condition when automatically injecting, we have to initialise values when we get a message
*	instead of on content-script load as we normally would.
*/
chrome.extension.onMessage.addListener( function ( message, sender, callback ) {
    if ( message.function == "inject" ) {
    	if( options[ 'jQueryURL' ].length == 0 ) {
    		chrome.storage.local.get({
			    jQueryURL           : '//code.jquery.com/jquery-2.2.4.min.js'
			}, function ( items ) {
			    for( key in items ) {
			        options[ key ] = items[ key ];
			    }

			    safe_inject();
			});
    	}
    	else {
    		safe_inject();
    	}
    }
});

chrome.storage.onChanged.addListener( function( changes, namespace ) {
    for (key in changes) {
        var storageChange = changes[key];

        options[ key ] = storageChange.newValue;
    }
});
