/**
 * jquery.previewButton.js
 * Description: プレビュー画面を表示するjQueryプラグイン
 * Version: 1.2
 * Author: Takashi Kitajima
 * Autho URI: http://2inc.org
 * created: Dec 9, 2011
 * modified : May 12, 2012
 * License: GPL2
 *
 * Copyright 2012 Takashi Kitajima (email : inc@2inc.org)
 * 
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License, version 2, as
 * published by the Free Software Foundation.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
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