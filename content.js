(function() {
  window.addEventListener('keydown', function(e) {
    return chrome.extension.sendRequest({
      type: 'keydown',
      key: e.which,
      ctrl: e.ctrlKey,
      alt: e.altKey,
      meta: e.metaKey
    });
  });
}).call(this);
