(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  jQuery(function($) {
    var keys, tmpl, updateBookmarkBehaviors, updateDirectoryBehaviors, updateShortcuts, _i, _ref, _results;
    tmpl = $('#option-tmpl');
    $('#width').val(options.width).bind('change keypress mousewheel', function() {
      return delay(__bind(function() {
        return localStorage.width = parseInt(this.value);
      }, this));
    });
    $('#height').val(options.height).bind('change keypress mousewheel', function() {
      return delay(__bind(function() {
        return localStorage.height = parseInt(this.value);
      }, this));
    });
    chrome.bookmarks.getTree(function(nodes) {
      var child, node, rootDirectory, _i, _len, _ref;
      rootDirectory = $('#root-directory');
      while (node = nodes.pop()) {
        if (node.children) {
          if (node.children) {
            _ref = node.children;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              child = _ref[_i];
              nodes.push(child);
            }
          }
          if (node.id === '0') {
            node.title = '(root)';
          }
          rootDirectory.append(tmpl.tmpl({
            value: node.id,
            title: node.title
          }));
        }
      }
      return $('#root-directory').val(options.rootDirectory).change(function() {
        return delay(__bind(function() {
          return localStorage.rootDirectory = this.value;
        }, this));
      });
    });
    $('#remember-opened-directory').attr('checked', options.rememberOpenedDirectory).change(function() {
      return delay(__bind(function() {
        return localStorage.rememberOpenedDirectory = this.checked;
      }, this));
    });
    updateBookmarkBehaviors = function() {
      var behaviors;
      behaviors = JSON.parse(localStorage.behaviors || '{}');
      behaviors.bookmark = {
        left: $('#behaviors-bookmark-left').val(),
        middle: $('#behaviors-bookmark-middle').val(),
        right: $('#behaviors-bookmark-right').val()
      };
      return localStorage.behaviors = JSON.stringify(behaviors);
    };
    $('#behaviors-bookmark-left').val(options.behaviors.bookmark.left).change(updateBookmarkBehaviors);
    $('#behaviors-bookmark-middle').val(options.behaviors.bookmark.middle).change(updateBookmarkBehaviors);
    $('#behaviors-bookmark-right').val(options.behaviors.bookmark.right).change(updateBookmarkBehaviors);
    updateDirectoryBehaviors = function() {
      var behaviors;
      behaviors = JSON.parse(localStorage.behaviors || '{}');
      behaviors.directory = {
        left: $('#behaviors-directory-left').val(),
        middle: $('#behaviors-directory-middle').val(),
        right: $('#behaviors-directory-right').val()
      };
      return localStorage.behaviors = JSON.stringify(behaviors);
    };
    $('#behaviors-directory-left').val(options.behaviors.directory.left).change(updateDirectoryBehaviors);
    $('#behaviors-directory-middle').val(options.behaviors.directory.middle).change(updateDirectoryBehaviors);
    $('#behaviors-directory-right').val(options.behaviors.directory.right).change(updateDirectoryBehaviors);
    $('#custom-style').val(options.customStyle).bind('change keypress mousewheel', function() {
      return delay(__bind(function() {
        return localStorage.customStyle = this.value;
      }, this));
    });
    keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    (function() {
      _results = [];
      for (var _i = 0, _ref = keys.length; 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i += 1 : _i -= 1){ _results.push(_i); }
      return _results;
    }).apply(this, arguments).forEach(function(i) {
      $('#open-bookmark-tree-in-new-tab-key').append(tmpl.tmpl({
        value: keys.charAt(i).toLowerCase(),
        title: keys.charAt(i)
      }));
      return $('#open-bookmark-tree-in-new-window-key').append(tmpl.tmpl({
        value: keys.charAt(i).toLowerCase(),
        title: keys.charAt(i)
      }));
    });
    updateShortcuts = function() {
      var shortcuts;
      shortcuts = JSON.parse(localStorage.shortcuts || '{}');
      shortcuts.openBookmarkTreeInNewTab = {
        modifier: $('#open-bookmark-tree-in-new-tab-modifier').val(),
        key: $('#open-bookmark-tree-in-new-tab-key').val()
      };
      shortcuts.openBookmarkTreeInNewWindow = {
        modifier: $('#open-bookmark-tree-in-new-window-modifier').val(),
        key: $('#open-bookmark-tree-in-new-window-key').val()
      };
      return localStorage.shortcuts = JSON.stringify(shortcuts);
    };
    $('#open-bookmark-tree-in-new-tab-modifier').val(options.shortcuts.openBookmarkTreeInNewTab.modifier).change(updateShortcuts);
    $('#open-bookmark-tree-in-new-tab-key').val(options.shortcuts.openBookmarkTreeInNewTab.key).change(updateShortcuts);
    $('#open-bookmark-tree-in-new-window-modifier').val(options.shortcuts.openBookmarkTreeInNewWindow.modifier).change(updateShortcuts);
    return $('#open-bookmark-tree-in-new-window-key').val(options.shortcuts.openBookmarkTreeInNewWindow.key).change(updateShortcuts);
  });
}).call(this);
