(function() {
  jQuery(function($) {
    var behaviors, shortcuts, _ref, _ref10, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;
    $('[data-i18n-key]').each(function(idx, elem) {
      var key, method, translated;
      elem = $(elem);
      key = elem.attr('data-i18n-key');
      method = elem.attr('data-i18n-method') || 'text';
      translated = chrome.i18n.getMessage(key);
      return elem[method](translated || ("translation missing: " + key));
    });
    behaviors = JSON.parse(localStorage.behaviors || '{}');
    shortcuts = JSON.parse(localStorage.shortcuts || '{}');
    window.options = {
      width: parseInt(localStorage.width) || 300,
      height: parseInt(localStorage.height) || 400,
      rootDirectory: localStorage.rootDirectory || '0',
      rememberOpenedDirectory: localStorage.rememberOpenedDirectory === 'true',
      behaviors: {
        bookmark: {
          left: ((_ref = behaviors.bookmark) != null ? _ref.left : void 0) || 'openInNewTab',
          middle: ((_ref2 = behaviors.bookmark) != null ? _ref2.middle : void 0) || 'openInCurrentTab',
          right: ((_ref3 = behaviors.bookmark) != null ? _ref3.right : void 0) || 'openInBackgroundTab'
        },
        directory: {
          left: ((_ref4 = behaviors.directory) != null ? _ref4.left : void 0) || 'toggle',
          middle: ((_ref5 = behaviors.directory) != null ? _ref5.middle : void 0) || 'openAllInCurrentWindow',
          right: ((_ref6 = behaviors.directory) != null ? _ref6.right : void 0) || 'openAllInNewWindow'
        }
      },
      customStyle: localStorage.customStyle || '',
      shortcuts: {
        openBookmarkTreeInNewTab: {
          modifier: ((_ref7 = shortcuts.openBookmarkTreeInNewTab) != null ? _ref7.modifier : void 0) || 'alt',
          key: ((_ref8 = shortcuts.openBookmarkTreeInNewTab) != null ? _ref8.key : void 0) || 'b'
        },
        openBookmarkTreeInNewWindow: {
          modifier: ((_ref9 = shortcuts.openBookmarkTreeInNewWindow) != null ? _ref9.modifier : void 0) || 'alt',
          key: ((_ref10 = shortcuts.openBookmarkTreeInNewWindow) != null ? _ref10.key : void 0) || 'w'
        }
      }
    };
    return window.delay = function(callback) {
      return setTimeout(callback, 10);
    };
  });
}).call(this);
