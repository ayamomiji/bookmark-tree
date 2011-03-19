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
    rootId = options.rootDirectory
    while node = nodes.pop()
      treeData[node.id] = node
      nodes.push(child) for child in node.children if node.children

    treeData[0].title = '(root)'
    treeData[rootId].children.forEach (child) ->
      tree.find('ul:first').append $('<li></li>').append(buildNode(child))

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

  $('.directory > .title').live 'mouseup', (e) ->
    self = $(this)
    directory = self.parent()
    id = directory.attr('data-id')
    node = treeData[id]
    switch e.button
      when 0 # left
        directoryBehaviors[options.behaviors.directory.left](node)
      when 1 # middle
        directoryBehaviors[options.behaviors.directory.middle](node)
      when 2 # right
        directoryBehaviors[options.behaviors.directory.right](node)

  directoryBehaviors =
    toggle: (node) ->
      directory = $("[data-id=#{node.id}]")
      if directory.hasClass('open')
        closeDirectory(directory)
      else
        openDirectory(directory)
    openAllInCurrentWindow: (node) ->
      treeData[node.id].children.forEach (child) ->
        chrome.tabs.create(url: child.url)
    openAllInNewWindow: (node) ->
      chrome.extension.sendRequest(type: 'openAllInNewWindow', directory: node)

  $('.bookmark > .title').live 'mouseup', (e) ->
    self = $(this)
    bookmark = self.parent()
    id = bookmark.attr('data-id')
    node = treeData[id]
    switch e.button
      when 0 # left
        bookmarkBehaviors[options.behaviors.bookmark.left](node)
      when 1 # middle
        bookmarkBehaviors[options.behaviors.bookmark.middle](node)
      when 2 # right
        bookmarkBehaviors[options.behaviors.bookmark.right](node)

  bookmarkBehaviors =
    openInNewTab: (node) ->
      chrome.tabs.create(url: node.url)
    openInCurrentTab: (node) ->
      chrome.tabs.getSelected null, (tab) ->
        chrome.tabs.update(tab.id, url: node.url)
    openInBackgroundTab: (node) ->
      chrome.tabs.create(url: node.url, selected: false)
    openInNewWindow: (node) ->
      chrome.windows.create(url: node.url)

  $('.bookmark > .title').live 'mousemove', ->
    id = $(this).parent().attr('data-id')
    urlBar.text(treeData[id].url)

  $('style').html(options.customStyle)
