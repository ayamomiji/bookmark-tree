chrome.extension.onRequest.addListener (req, sender, callback) ->
  switch req.type
    when 'openAllInNewWindow'
      children = req.directory.children
      chrome.windows.create url: children.shift().url, (window) ->
        children.forEach (child) ->
          chrome.tabs.create(url: child.url, windowId: window.id, selected: false)
    when 'keydown'
      shortcuts = JSON.parse(localStorage.shortcuts || '{}')
      return if shortcuts.disable

      mod = shortcuts.openBookmarkTreeInNewTab?.modifier || 'alt'
      key = shortcuts.openBookmarkTreeInNewTab?.key || 'b'
      pressedMod = (mod == 'alt' && req.alt) || (mod == 'ctrl' && req.ctrl) || (mod == 'meta' && req.meta)
      pressedKey = String.fromCharCode(req.key).toLowerCase() == key
      if pressedMod and pressedKey
        chrome.tabs.create(url: chrome.extension.getURL('browser_action.html?full'))

      mod = shortcuts.openBookmarkTreeInNewWindow?.modifier || 'alt'
      key = shortcuts.openBookmarkTreeInNewWindow?.key || 'w'
      pressedMod = (mod == 'alt' && req.alt) || (mod == 'ctrl' && req.ctrl) || (mod == 'meta' && req.meta)
      pressedKey = String.fromCharCode(req.key).toLowerCase() == key
      if pressedMod and pressedKey
        width = parseInt(localStorage.width) || 300
        height = parseInt(localStorage.height) || 400
        window.open(chrome.extension.getURL('browser_action.html?full'), '', "width=#{width}, height=#{height}")
