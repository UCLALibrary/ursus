resize_media_viewer = function () {
  $('#media-viewer-iframe').width($('.media-viewer-container').width())
}

$(document).ready(resize_media_viewer)
$(window).resize(resize_media_viewer)