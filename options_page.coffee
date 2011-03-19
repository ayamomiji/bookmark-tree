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
    tmpl = $('#option-tmpl')
    while node = nodes.pop()
      if node.children
        nodes.push(child) for child in node.children if node.children
        node.title = '(root)' if node.id == '0'
        rootDirectory.append tmpl.tmpl(value: node.id, title: node.title)

    $('#root-directory')
      .val(options.rootDirectory)
      .change ->
        delay => localStorage.rootDirectory = this.value

  $('#remember-opened-directory')
    .attr('checked', options.rememberOpenedDirectory)
    .change ->
      delay => localStorage.rememberOpenedDirectory = this.checked

  updateBookmarkBehaviors = ->
    behaviors = JSON.parse(localStorage.behaviors || '{}')
    behaviors.bookmark =
      left: $('#behaviors-bookmark-left').val()
      middle: $('#behaviors-bookmark-middle').val()
      right: $('#behaviors-bookmark-right').val()
    localStorage.behaviors = JSON.stringify(behaviors)

  $('#behaviors-bookmark-left')
    .val(options.behaviors.bookmark.left)
    .change(updateBookmarkBehaviors)

  $('#behaviors-bookmark-middle')
    .val(options.behaviors.bookmark.middle)
    .change(updateBookmarkBehaviors)

  $('#behaviors-bookmark-right')
    .val(options.behaviors.bookmark.right)
    .change(updateBookmarkBehaviors)
