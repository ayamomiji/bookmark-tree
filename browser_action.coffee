startTime = new Date().getTime()

jQuery ($) ->
  urlBar = $('#url')
  tree = $('#tree')
  treeData = {}
  tmpl =
    bookmark: $('#bookmark-tmpl')
    directory: $('#directory-tmpl')

  $('body').width(300)
  $('#tree').height(400)
  $('#tree').css('max-height', 400)

  chrome.bookmarks.getTree (nodes) ->
    rootId = 0
    while node = nodes.pop()
      treeData[node.id] = node
      nodes.push(child) for child in node.children if node.children

    treeData[0].title = '(root)'

    tree.find('ul:first').append $('<li></li>').append(buildDirectory(treeData[rootId]))

    spentTime = new Date().getTime() - startTime
    urlBar.text("Spent time: #{spentTime} ms.")

  buildNode = (node) ->
    if node.children
      buildDirectory(node)
    else
      buildBookmark(node)

  buildDirectory = (node) ->
    elem = tmpl.directory.tmpl(node)
    children = elem.find('.children:first')
    node.children.forEach (child) ->
      children.append $('<li></li>').append(buildNode(child))
    elem

  buildBookmark = (node) ->
    tmpl.bookmark.tmpl(node)
