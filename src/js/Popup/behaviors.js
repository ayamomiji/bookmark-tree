import { get } from 'svelte/store'
import {
  toggleDirectory,
  directoryLeftBehavior, directoryMiddleBehavior, directoryRightBehavior,
  bookmarkLeftBehavior, bookmarkMiddleBehavior, bookmarkRightBehavior
} from '../store'

const buttons = ['left', 'middle', 'right']

function executeBehavior (node, event) {
  const isDirectory = !!node.children
  // simulates middle click by cmd/ctrl + left click
  const buttonIndex =
    ((event.metaKey || event.ctrlKey) && event.button === 0) ? 1 : event.button
  const button = buttons[buttonIndex]
  if (isDirectory) {
    executeDirectoryBehavior(node, button)
  } else {
    executeBookmarkBehavior(node, button)
  }
}

function executeBookmarkBehavior (node, button) {
  const behavior = getBookmarkBehavior(button)
  switch (behavior) {
    case 'openInNewTab':
      chrome.tabs.create({ url: node.url })
      break
    case 'openInCurrentTab':
      chrome.tabs.getSelected(null, tab => {
        chrome.tabs.update(tab.id, { url: node.url })
      })
      break
    case 'openInBackgroundTab':
      chrome.tabs.create({ url: node.url, active: false })
      break
    case 'openInNewWindow':
      chrome.windows.create({ url: node.url })
      break
    case 'openInIncognitoWindow':
      chrome.windows.getCurrent(window => {
        if (window.incognito) {
          chrome.tabs.create({ url: node.url })
        } else {
          chrome.windows.create({ url: node.url, incognito: true })
        }
      })
  }
}

function executeDirectoryBehavior (node, button) {
  const behavior = getDirectoryBehavior(button)
  switch (behavior) {
    case 'toggle':
      toggleDirectory(node.id)
      break
    case 'openAllInCurrentWindow':
      node.children.forEach(child => {
        !child.children && chrome.tabs.create({ url: child.url })
      })
      break
    case 'openAllInNewWindow':
      chrome.extension.sendRequest({
        type: 'openAllInNewWindow',
        directory: node
      })
      break
    case 'openAllInNewIncognitoWindow':
      chrome.extension.sendRequest({
        type: 'openAllInNewIncognitoWindow',
        directory: node
      })
      break
  }
}

function getBookmarkBehavior (button) {
  switch (button) {
    case 'left': return get(bookmarkLeftBehavior)
    case 'middle': return get(bookmarkMiddleBehavior)
    case 'right': return get(bookmarkRightBehavior)
  }
}

function getDirectoryBehavior (button) {
  switch (button) {
    case 'left': return get(directoryLeftBehavior)
    case 'middle': return get(directoryMiddleBehavior)
    case 'right': return get(directoryRightBehavior)
  }
}

export { executeBehavior }
