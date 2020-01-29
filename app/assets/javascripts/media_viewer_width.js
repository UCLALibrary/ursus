$(document).on('turbolinks:load', function () {
  $('#media-viewer-iframe').width($('.media-viewer-container').width())

  $(window).on('resize', function () {
    $('#media-viewer-iframe').width($('.media-viewer-container').width())
  })
})