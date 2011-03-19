startTime = new Date().getTime()

jQuery ($) ->
  urlBar = $('#url')
  tree = $('#tree')
  treeData = {}

  $('body').width(300)
  $('#container').height(400)

  chrome.bookmarks.getTree (nodes) ->
    rootId = 0
    while node = nodes.pop()
      treeData[node.id] = node
      nodes.push(child) for child in node.children if node.children

    spentTime = new Date().getTime() - startTime
    urlBar.text("Spent time: #{spentTime} ms.")
