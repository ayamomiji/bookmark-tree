import { readWidth, readHeight } from './store'
import '../img/icon.png'

chrome.extension.onRequest.addListener(function (req, sender, callback) {
  switch (req.type) {
    case 'openAllInNewWindow':
      openAllInNewWindow(req.directory.children)
      break
    case 'openAllInNewIncognitoWindow':
      openAllInNewWindow(req.directory.children, { incognito: true })
      break
  }
})

chrome.commands.onCommand.addListener(function(command) {
  switch (command) {
    case 'openBookmarkTreeInNewTab':
      chrome.tabs.create({
        url: chrome.extension.getURL('popup.html?full')
      })
      break
    case 'openBookmarkTreeInNewWindow':
      window.open(chrome.extension.getURL('popup.html?full'),
                  '',
                  `width=${readWidth()},height=${readHeight()}`)
      break
  }
})

function openAllInNewWindow (children, options = {}) {
  // open the first bookmark in new window
  chrome.windows.create(
    { url: children.shift().url, ...options },
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
