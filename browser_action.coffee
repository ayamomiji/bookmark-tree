startTime = new Date().getTime()

jQuery ($) ->
  urlBar = $('#url')

  $('body').width(300)
  $('#container').height(400)

  chrome.bookmarks.getTree (nodes) ->
    spentTime = new Date().getTime() - startTime
    urlBar.text("Spent time: #{spentTime} ms.")
