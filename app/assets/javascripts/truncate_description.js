document.addEventListener("DOMContentLoaded", function() {
  var viewMoreButtons = document.querySelectorAll('.view-more')
  viewMoreButtons.forEach(function(el) {
    el.addEventListener('click', function() {
      var description = this.previousElementSibling

      if (description.style.textOverflow == 'ellipsis') {
        el.innerHTML = 'Read Less <div class="up-arrow">&raquo;</div>'
        description.style.overflow = 'initial'
        description.style.whiteSpace = 'initial'
        description.style.textOverflow = 'initial'
      } else {
        console.log(description.style.textOverflow)
        el.innerHTML = 'Read More <div class="down-arrow">&raquo;</div>'
        description.style.textOverflow = 'ellipsis'
        description.style.overflow = 'hidden'
        description.style.whiteSpace = 'nowrap'
      }
    })
  })
})
