import { toggleDirectory, behaviors } from '../store'

function executeDirectoryBehavior (node, button) {
  const behavior = getDirectoryBehavior(button)
  switch (behavior) {
    case 'toggle':
      toggleDirectory(node.id)
      break
    case 'openAllInCurrentWindow':
      node.children.forEach(child => {
        chrome.tabs.create({ url: child.url })
      })
      break
    case 'openAllInNewWindow':
      chrome.extension.sendRequest({
        type: 'openAllInNewWindow',
        directory: node
      })
      break
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
      chrome.tabs.create({ url: node.url, selected: false })
      break
    case 'openInNewWindow':
      chrome.windows.create({ url: node.url })
      break
  }
}

const defaultDirectoryBehaviors = {
  left: 'toggle',
  middle: 'openAllInCurrentWindow',
  right: 'openAllInNewWindow'
}

const defaultBookmarkBehaviors = {
  left: 'openInNewTab',
  middle: 'openInCurrentTab',
  right: 'openInBackgroundTab'
}

function getDirectoryBehavior (button) {
  return (behaviors.directory || defaultDirectoryBehaviors)[button]
}

function getBookmarkBehavior (button) {
  return (behaviors.bookmark || defaultBookmarkBehaviors)[button]
}

export {
  executeDirectoryBehavior, executeBookmarkBehavior,
  getDirectoryBehavior, getBookmarkBehavior
}
