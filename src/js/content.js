window.addEventListener('keydown', e => {
  chrome.extension.sendRequest({
    type: 'keydown',
    key: e.which,
    modifier: (e.ctrlKey && 'ctrl') ||
              (e.altKey && 'alt') ||
              (e.metaKey && 'meta')
  })
})
