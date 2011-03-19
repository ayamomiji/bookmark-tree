jQuery ($) ->
  tmpl = $('#option-tmpl')

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

  updateDirectoryBehaviors = ->
    behaviors = JSON.parse(localStorage.behaviors || '{}')
    behaviors.directory =
      left: $('#behaviors-directory-left').val()
      middle: $('#behaviors-directory-middle').val()
      right: $('#behaviors-directory-right').val()
    localStorage.behaviors = JSON.stringify(behaviors)

  $('#behaviors-directory-left')
    .val(options.behaviors.directory.left)
    .change(updateDirectoryBehaviors)

  $('#behaviors-directory-middle')
    .val(options.behaviors.directory.middle)
    .change(updateDirectoryBehaviors)

  $('#behaviors-directory-right')
    .val(options.behaviors.directory.right)
    .change(updateDirectoryBehaviors)

  $('#custom-style')
    .val(options.customStyle)
    .bind 'change keypress mousewheel', ->
      delay => localStorage.customStyle = this.value

  keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  [0...keys.length].forEach (i) ->
    $('#open-bookmark-tree-in-new-tab-key').append tmpl.tmpl
      value: keys.charAt(i).toLowerCase()
      title: keys.charAt(i)
    $('#open-bookmark-tree-in-new-window-key').append tmpl.tmpl
      value: keys.charAt(i).toLowerCase()
      title: keys.charAt(i)

  updateShortcuts = ->
    shortcuts = JSON.parse(localStorage.shortcuts || '{}')
    shortcuts.openBookmarkTreeInNewTab =
      modifier: $('#open-bookmark-tree-in-new-tab-modifier').val()
      key: $('#open-bookmark-tree-in-new-tab-key').val()
    shortcuts.openBookmarkTreeInNewWindow =
      modifier: $('#open-bookmark-tree-in-new-window-modifier').val()
      key: $('#open-bookmark-tree-in-new-window-key').val()
    localStorage.shortcuts = JSON.stringify(shortcuts)

  $('#open-bookmark-tree-in-new-tab-modifier')
    .val(options.shortcuts.openBookmarkTreeInNewTab.modifier)
    .change(updateShortcuts)

  $('#open-bookmark-tree-in-new-tab-key')
    .val(options.shortcuts.openBookmarkTreeInNewTab.key)
    .change(updateShortcuts)

  $('#open-bookmark-tree-in-new-window-modifier')
    .val(options.shortcuts.openBookmarkTreeInNewWindow.modifier)
    .change(updateShortcuts)

  $('#open-bookmark-tree-in-new-window-key')
    .val(options.shortcuts.openBookmarkTreeInNewWindow.key)
    .change(updateShortcuts)
