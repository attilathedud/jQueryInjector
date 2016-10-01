// due to the fact content scripts are sandboxed, we can't check for existing instances of jquery
function safe_inject() {
	if( document.head.length === 0 ) {
		document.getElementsByTagName( 'html' )[ 0 ].appendChild( document.createElement('head') );
	}  

	var script = document.createElement( 'script' );

	script.src = '//code.jquery.com/jquery-2.2.4.min.js';
	script.type = 'text/javascript';

	script.onload = function () {
		console.log( "jQuery loaded." );
	};

	script.onerror = function () {
		delete jQuery;
		console.log( "Error while loading jQuery." );
	};

	document.head.appendChild( script );
}

chrome.extension.onMessage.addListener( function ( message, sender, callback ) {
    if ( message.function == "inject" ) {
        safe_inject();
    }
});
