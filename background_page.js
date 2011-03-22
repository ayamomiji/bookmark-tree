(function() {
  chrome.extension.onRequest.addListener(function(req, sender, callback) {
    var children, height, key, mod, pressedKey, pressedMod, shortcuts, width, _ref, _ref2, _ref3, _ref4;
    switch (req.type) {
      case 'openAllInNewWindow':
        children = req.directory.children;
        return chrome.windows.create({
          url: children.shift().url
        }, function(window) {
          return children.forEach(function(child) {
            return chrome.tabs.create({
              url: child.url,
              windowId: window.id,
              selected: false
            });
          });
        });
      case 'keydown':
        shortcuts = JSON.parse(localStorage.shortcuts || '{}');
        if (shortcuts.disable) {
          return;
        }
        mod = ((_ref = shortcuts.openBookmarkTreeInNewTab) != null ? _ref.modifier : void 0) || 'alt';
        key = ((_ref2 = shortcuts.openBookmarkTreeInNewTab) != null ? _ref2.key : void 0) || 'b';
        pressedMod = (mod === 'alt' && req.alt) || (mod === 'ctrl' && req.ctrl) || (mod === 'meta' && req.meta);
        pressedKey = String.fromCharCode(req.key).toLowerCase() === key;
        if (pressedMod && pressedKey) {
          chrome.tabs.create({
            url: chrome.extension.getURL('browser_action.html?full')
          });
        }
        mod = ((_ref3 = shortcuts.openBookmarkTreeInNewWindow) != null ? _ref3.modifier : void 0) || 'alt';
        key = ((_ref4 = shortcuts.openBookmarkTreeInNewWindow) != null ? _ref4.key : void 0) || 'w';
        pressedMod = (mod === 'alt' && req.alt) || (mod === 'ctrl' && req.ctrl) || (mod === 'meta' && req.meta);
        pressedKey = String.fromCharCode(req.key).toLowerCase() === key;
        if (pressedMod && pressedKey) {
          width = parseInt(localStorage.width) || 300;
          height = parseInt(localStorage.height) || 400;
          return window.open(chrome.extension.getURL('browser_action.html?full'), '', "width=" + width + ", height=" + height);
        }
    }
  });
}).call(this);
