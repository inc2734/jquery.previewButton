/*
* jquery.previewButton.js ver.1.0
* Author : http://2inc.org
* created: 2011/12/09
* creative commons 表示 - 継承 3.0 (CC BY-SA 3.0)
* http://creativecommons.org/licenses/by-sa/3.0/deed.ja
*
* プレビュー画面を表示するjQueryプラグイン
*/
( function( $ ) {
    $.fn.previewButton = function( config ){
        var button = this;
        var defaults = {
            'title'   : 'title',    // タイトルのキー
            'content' : 'content',  // 本文のキー
            'url'     : null  		// プレビューのurl
        };
        var setting = $.extend( defaults, config );
        if ( setting.url ) {
            button.live( 'click', function() {
                var form = $(this).parents('form');
                var newform = $('<form id="_previewForm" style="display:none"></form>');
                $('body').append(newform);
                // 表示したい要素に合わせて調整
                // テキストエリアだけはcloneで値コピー出来ないので注意
                newform.append( $('input[name=' + setting.title + ']').clone() );
                newform.append( $('textarea[name=' + setting.content + ']').clone().val( form.find('textarea[name=' + setting.content + ']').val() ) );
                window.open( '', "preview" );
                // 別ウィンドウで開く場合は
                // window.open( '', "preview", "windowstyle" );
                newform.attr( "target", "preview" );
                newform.attr( "action", setting.url );
                newform.attr( "method", "post" );
                newform.submit();
                newform.remove();
            });    
        }
    };
})( jQuery );