$(document).on('turbolinks:load', function() {
  $('#universal-viewer-iframe').width($('.uv-container').width())

  $(window).on('resize', function(){
    $('#universal-viewer-iframe').width($('.uv-container').width())
  })
})
