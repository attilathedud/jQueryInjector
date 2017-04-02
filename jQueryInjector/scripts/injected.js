var options = {
    'jQueryURL'     		: '//code.jquery.com/jquery-3.2.1.min.js',
	'deleteOtherReferences' : false
};

/*!
*	Inject jQuery by writing a reference to the script at the end of document head. 
*	Since content-scripts will fire after the DOM is finished, this won't cause any issues.
*
*	We can't check for instances of jQuery on the page since content-scripts are sandboxed. 
*	However, we can check for other loaded scripts that include jQuery.
*/
function safe_inject() {
	if( document.head == null || document.head.length === 0 ) {
		document.getElementsByTagName( 'html' )[ 0 ].insertBefore( document.createElement( 'head' ), document.body );
	}  

	if( options[ "deleteOtherReferences" ] == true && document.scripts != null && document.scripts.length > 0 ) {
		/*!
		*	Since document.scripts represents a live list of items, we have to transverse it in
		* 	reverse to not screw up the DOM.
		*/
		for( var i = document.scripts.length; i > 0; i-- ) {
			var jquery_re = /jquery(-*\d+.*\d+.*\d+|)\.*(min|)\.js/i;
			var found = document.scripts[ i - 1 ].src.match( jquery_re );

			if( found != null &&  found.length > 0 ) {
				document.scripts[ i - 1 ].remove( );
			}
		}
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
    	chrome.storage.local.get( options, function ( items ) {
			for( key in items ) {
				options[ key ] = items[ key ];
			}

			safe_inject();
		});

		chrome.runtime.sendMessage( { jqueryPresent: true } );
    }
	else if( message.function == "query" ) {
		if( document.scripts == null || document.scripts.length == 0 ) {
			chrome.runtime.sendMessage( { jqueryPresent: false } );
			return;
		}

		chrome.runtime.sendMessage( { jqueryPresent: Array.from( document.scripts ).filter( script => script.src.includes("jquery") ).length > 0 } );
	}
});

chrome.storage.onChanged.addListener( function( changes, namespace ) {
    for (key in changes) {
        var storageChange = changes[key];

        options[ key ] = storageChange.newValue;
    }
});
