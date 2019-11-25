import { get } from 'svelte/store'
import {
  width, height,
  disableShortcuts, openBookmarkTreeInNewTab, openBookmarkTreeInNewWindow
} from './store'
import '../img/icon.png'

chrome.extension.onRequest.addListener(function (req, sender, callback) {
  switch (req.type) {
    case 'openAllInNewWindow':
      openAllInNewWindow(req.directory.children)
      break
    case 'keydown':
      handleShortcut(req)
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

function handleShortcut ({ key, modifier }) {
  key = String.fromCharCode(key).toLowerCase()
  if (get(disableShortcuts)) {
    return
  }

  const newTab = get(openBookmarkTreeInNewTab)
  if (newTab.key === key &&
      newTab.modifier === modifier) {
    window.open(chrome.extension.getURL('popup.html?full'),
                '',
                `width=${get(width)},height=${get(height)}`)
  }

  const newWindow = get(openBookmarkTreeInNewWindow)
  if (newWindow.key === key &&
      newWindow.modifier === modifier) {
    chrome.tabs.create({
      url: chrome.extension.getURL('popup.html?full')
    })
  }
}
