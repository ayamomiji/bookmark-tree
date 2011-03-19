chrome.extension.onRequest.addListener (req, sender, callback) ->
  switch req.type
    when 'openAllInNewWindow'
      children = req.directory.children
      chrome.windows.create url: children.shift().url, (window) ->
        children.forEach (child) ->
          chrome.tabs.create(url: child.url, windowId: window.id, selected: false)
