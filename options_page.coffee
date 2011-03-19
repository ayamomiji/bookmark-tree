jQuery ($) ->
  $('#width')
    .val(options.width)
    .bind 'change keypress mousewheel', ->
      delay => localStorage.width = parseInt(this.value)

  $('#height')
    .val(options.height)
    .bind 'change keypress mousewheel', ->
      delay => localStorage.height = parseInt(this.value)

  chrome.bookmarks.getTree (nodes) ->
    rootDirectory = $('#root-directory')
    tmpl = $('#root-directory-option-tmpl')
    while node = nodes.pop()
      if node.children
        nodes.push(child) for child in node.children if node.children
        node.title = '(root)' if node.id == '0'
        rootDirectory.append tmpl.tmpl(node)

    $('#root-directory')
      .val(options.rootDirectory)
      .change ->
        delay => localStorage.rootDirectory = this.value
