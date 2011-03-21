jQuery ($) ->
  $('[data-i18n-key]').each (idx, elem) ->
    elem = $(elem)
    key = elem.attr('data-i18n-key')
    method = elem.attr('data-i18n-method') || 'text'
    translated = chrome.i18n.getMessage(key)
    elem[method](translated || "translation missing: #{key}")

  behaviors = JSON.parse(localStorage.behaviors || '{}')
  shortcuts = JSON.parse(localStorage.shortcuts || '{}')
  font = JSON.parse(localStorage.font || '{}')
  window.options =
    width: parseInt(localStorage.width) || 300
    height: parseInt(localStorage.height) || 400
    font:
      fontFace: font.fontFace || 'inherit'
      fontSize: font.fontSize || '80%'
    customStyle: localStorage.customStyle || ''
    behaviors:
      bookmark:
        left:   behaviors.bookmark?.left   || 'openInNewTab'
        middle: behaviors.bookmark?.middle || 'openInCurrentTab'
        right:  behaviors.bookmark?.right  || 'openInBackgroundTab'
      directory:
        left:   behaviors.directory?.left   || 'toggle'
        middle: behaviors.directory?.middle || 'openAllInCurrentWindow'
        right:  behaviors.directory?.right  || 'openAllInNewWindow'
    shortcuts:
      disable: shortcuts.disable
      openBookmarkTreeInNewTab:
        modifier: shortcuts.openBookmarkTreeInNewTab?.modifier || 'alt'
        key: shortcuts.openBookmarkTreeInNewTab?.key || 'b'
      openBookmarkTreeInNewWindow:
        modifier: shortcuts.openBookmarkTreeInNewWindow?.modifier || 'alt'
        key: shortcuts.openBookmarkTreeInNewWindow?.key || 'w'
    rememberOpenedDirectory: localStorage.rememberOpenedDirectory == 'true'
    sortBy: localStorage.sortBy || 'index'
    rootDirectory: localStorage.rootDirectory || '0'

  window.delay = (callback) -> setTimeout(callback, 10)
