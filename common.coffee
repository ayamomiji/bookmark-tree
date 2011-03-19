jQuery ($) ->
  $('[data-i18n-key]').each (idx, elem) ->
    elem = $(elem)
    key = elem.attr('data-i18n-key')
    method = elem.attr('data-i18n-method') || 'text'
    translated = chrome.i18n.getMessage(key)
    elem[method](translated || "translation missing: #{key}")
