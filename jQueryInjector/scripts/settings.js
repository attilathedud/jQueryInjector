var options = {
    'jQueryURL'     	: '',
    'alwaysInjectURLs'	: []
};

var current_row = 0;

function add_row_to_url_table( url_to_add ) {
	if( url_to_add.length == 0 )
		return;

	var new_row 			= document.getElementById( 'URLTable' ).insertRow();
	var url_cell 			= new_row.insertCell( 0 );
	var delete_cell 		= new_row.insertCell( 1 );

	url_cell.innerHTML 		= url_to_add;
	delete_cell.innerHTML	= "<img id='url_" + current_row++ + "' style='height:32px; width: 32px;' src='../imgs/cross.png'></img>";
}

chrome.storage.local.get({
    jQueryURL           : '//code.jquery.com/jquery-2.2.4.min.js',
    alwaysInjectURLs 	: []
}, function ( items ) {
    for( key in items ) {
        options[ key ] = items[ key ];
    }

    document.getElementById( 'jQueryURLInput' ).value = options[ "jQueryURL" ];

    for( url in options[ 'alwaysInjectURLs'] ) {
    	add_row_to_url_table( options[ 'alwaysInjectURLs'][ url ] );
    }

    document.getElementById( 'saveSettings' ).onclick = function() {
    	chrome.storage.local.set( { jQueryURL : document.getElementById( 'jQueryURLInput' ).value } );
    };

    document.getElementById( 'addURL' ).onclick = function() {
    	var url_to_add = document.getElementById( 'URLtoAdd' ).value;

    	add_row_to_url_table( url_to_add );

    	options[ 'alwaysInjectURLs' ].push( url_to_add );
		chrome.storage.local.set( { alwaysInjectURLs : options[ 'alwaysInjectURLs' ] } );

		document.getElementById( 'URLtoAdd' ).value = '';
    };

    document.getElementById( 'URLTable' ).addEventListener( 'click', function( e ) {
		if (e.target !== e.currentTarget) {
			var url_id = e.target.id;
			if( url_id.length > 0 ) {
				document.getElementById( url_id ).parentNode.parentNode.remove();

				var offset = url_id.substring( url_id.indexOf( '_' ) + 1 );
				options[ 'alwaysInjectURLs' ].splice( offset, 1 );
				chrome.storage.local.set( { alwaysInjectURLs : options[ 'alwaysInjectURLs' ] } );
			}
		}

		e.stopPropagation();
    }, false );
});
