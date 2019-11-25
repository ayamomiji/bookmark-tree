function executeBookmarkBehavior (node, behavior = 'openInNewTab') {
  switch (behavior) {
    case 'openInNewTab':
      chrome.tabs.create({ url: node.url })
      break
    case 'openInCurrentTab':
      chrome.tabs.getSelected(null, tab =>
        chrome.tabs.update(tab.id, { url: node.url })
      )
      break
    case 'openInBackgroundTab':
      chrome.tabs.create({ url: node.url, selected: false })
      break
    case 'openInNewWindow':
      chrome.windows.create({ url: node.url })
      break
  }
}

export { executeBookmarkBehavior }
