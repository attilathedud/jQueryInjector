var options = {
    'jQueryURL'     		: '//code.jquery.com/jquery-3.2.1.min.js',
    'alwaysInjectURLs'		: [],
	'deleteOtherReferences' : false
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

chrome.storage.local.get( options, function ( items ) {
    for( key in items ) {
        options[ key ] = items[ key ];
    }

    document.getElementById( 'jQueryURLInput' ).value = options[ "jQueryURL" ];

	document.getElementById( 'deleteOtherReferences' ).checked = options[ "deleteOtherReferences" ];

    for( url in options[ 'alwaysInjectURLs'] ) {
    	add_row_to_url_table( options[ 'alwaysInjectURLs'][ url ] );
    }

    document.getElementById( 'saveSettings' ).onclick = function() {
    	chrome.storage.local.set( { jQueryURL : document.getElementById( 'jQueryURLInput' ).value } );
		document.getElementById( 'saveSettings' ).textContent = "SAVED ✓";
		setTimeout( function( ) {
			document.getElementById( 'saveSettings' ).textContent = "SAVE";
		}, 1000 );
    };

	document.getElementById( 'deleteOtherReferences' ).onclick = function() {
		chrome.storage.local.set( { deleteOtherReferences : document.getElementById( 'deleteOtherReferences' ).checked } );
	};

    document.getElementById( 'addURL' ).onclick = function() {
    	var url_to_add = document.getElementById( 'URLtoAdd' ).value.trim();

    	add_row_to_url_table( url_to_add );

    	options[ 'alwaysInjectURLs' ].push( url_to_add );
		chrome.storage.local.set( { alwaysInjectURLs : options[ 'alwaysInjectURLs' ] } );

		document.getElementById( 'URLtoAdd' ).value = '';
    };

    /*!
	*	If we have two identical URLs, this will delete both.
	*/
    document.getElementById( 'URLTable' ).addEventListener( 'click', function( e ) {
		if (e.target !== e.currentTarget) {
			var url_id = e.target.id;
			if( url_id.length > 0 ) {
				var url_to_delete = document.getElementById( url_id ).parentNode.parentNode.firstChild.innerText;
				document.getElementById( url_id ).parentNode.parentNode.remove();

				options[ 'alwaysInjectURLs' ].splice( options[ 'alwaysInjectURLs' ].indexOf( url_to_delete ), 1 );
				chrome.storage.local.set( { alwaysInjectURLs : options[ 'alwaysInjectURLs' ] } );
			}
		}

		e.stopPropagation();
    }, false );
});

chrome.storage.onChanged.addListener( function( changes, namespace ) {
    for (key in changes) {
        var storageChange = changes[key];

        if( key == 'alwaysInjectURLs' ) {
        	var added_urls = storageChange.newValue.filter( url => !options[ 'alwaysInjectURLs' ].includes( url ) );
        	for( url in added_urls ) {
        		add_row_to_url_table( added_urls[ url ] );
        	}
        }

        options[ key ] = storageChange.newValue;
    }
});
