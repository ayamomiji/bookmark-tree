startTime = new Date().getTime()

jQuery ($) ->
  urlBar = $('#url')
  tree = $('#tree')
  treeData = {}
  tmpl =
    bookmark: $('#bookmark-tmpl')
    directory: $('#directory-tmpl')
  openingDirectory = JSON.parse(localStorage.openingDirectory || '{}')

  $('body').width(options.width)
  $('#tree').height(options.height)
  $('#tree').css('max-height', options.height)

  chrome.bookmarks.getTree (nodes) ->
    rootId = localStorage.rootDirectory
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
    if openingDirectory[node.id]
      openDirectory(elem)
    elem

  buildBookmark = (node) ->
    tmpl.bookmark.tmpl(node)

  openDirectory = (elem) ->
    id = elem.attr('data-id')
    node = treeData[id]
    elem.addClass('open')
    elem.find('.title .favicon:first').attr('src', 'open.png')
    children = elem.find('.children:first')
    if children.find('li').size() == 0
      node.children.forEach (child) ->
        children.append $('<li></li>').append(buildNode(child))

    if options.rememberOpenedDirectory
      openingDirectory[id] = true
      localStorage.openingDirectory = JSON.stringify(openingDirectory)

  closeDirectory = (elem) ->
    id = elem.attr('data-id')
    elem.removeClass('open')
    elem.find('.title .favicon:first').attr('src', 'close.png')
    if options.rememberOpenedDirectory
      openingDirectory[id] = null
      localStorage.openingDirectory = JSON.stringify(openingDirectory)

  $('.directory > .title').live 'click', ->
    self = $(this)
    directory = self.parent()
    toggleDirectory(directory)

  toggleDirectory = (elem) ->
    id = elem.attr('data-id')
    if elem.hasClass('open')
      closeDirectory(elem)
    else
      openDirectory(elem)
