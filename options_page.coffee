jQuery ($) ->
  $('#width')
    .val(options.width)
    .bind 'change keypress mousewheel', ->
      delay => localStorage.width = parseInt(this.value)

  $('#height')
    .val(options.height)
    .bind 'change keypress mousewheel', ->
      delay => localStorage.height = parseInt(this.value)
