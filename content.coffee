window.addEventListener 'keydown', (e) ->
  chrome.extension.sendRequest
    type: 'keydown'
    key: e.which
    ctrl: e.ctrlKey
    alt: e.altKey
    meta: e.metaKey
