/*
* jquery.previewButton.js ver.1.1
* Author : http://2inc.org
* created: 2011/12/09
* modified: 2011/12/13
* creative commons 表示 - 継承 3.0 (CC BY-SA 3.0)
* http://creativecommons.org/licenses/by-sa/3.0/deed.ja
*
* プレビュー画面を表示するjQueryプラグイン
*/
( function( $ ) {
	$.fn.previewButton = function( config ) {
		var button = this;
		var defaults = {
			'url'  : null,	// プレビューのurl
			'post' : {}		// キーとタイプのハッシュ { key : type, … }
		};
		var config = $.extend( defaults, config );
		if ( config.url ) {
			button.live( 'click', function() {
				var form = $(this).parents( 'form' );
				var newform = $('<form id="previewForm" style="display:none"></form>');
				$('body').append( newform );
				$.each( config.post, function( i, val ) {
					switch( val ) {
						case 'text' :
							newform.append( form.find( 'input[name=' + i + ']' ).clone() );
							break;
						case 'textarea' :
							var _val = form.find( 'textarea[name=' + i + ']' ).val();
							newform.append( form.find( 'textarea[name=' + i + ']' ).clone().val( _val ) );
							break;
						case 'radio' :
							newform.append( form.find( 'input[name=' + i + ']:checked' ).clone() );
							break;
						case 'select' :
							var _val = form.find( 'select[name=' + i + '] option:selected' ).val();
							newform.append( form.find( 'select[name=' + i + ']' ).clone().val( _val ) );
							break;
						case 'checkbox' :
							newform.append( form.find( 'input[name="' + i + '[]"]:checked' ).clone() );
							break;
						default : 
							break;
					}
				});
				window.open( this.href, "preview" );
				newform.attr( "target", "preview" );
				newform.attr( "action", config.url );
				newform.attr( "method", "post" );
				newform.submit();
				newform.remove();
			});		
		}
	};
})( jQuery );