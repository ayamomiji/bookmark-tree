import '../img/icon.png'

chrome.extension.onRequest.addListener(function (req, sender, callback) {
  switch (req.type) {
    case 'openAllInNewWindow':
      openAllInNewWindow(req.directory.children)
      break
  }
})

function openAllInNewWindow (children) {
  // open the first bookmark in new window
  chrome.windows.create(
    { url: children.shift().url },
    // and then open remaining bookmarks in the opened window
    window => children.forEach(child => {
      chrome.tabs.create({
        url: child.url,
        windowId: window.id,
        selected: false
      })
    })
  )
}
