document.addEventListener("turbolinks:load", function() {
  var viewMoreButtons = document.querySelectorAll('.view-more')
  viewMoreButtons.forEach(function (el) {
    var description = el.previousElementSibling
    var originalText = description.innerText
    var truncatedText = description.innerText.substr(0, 299)
    truncatedText += '…'

    if (description.innerText.length < 300) {
      el.style.display = 'none'
    } else {
      description.innerText = truncatedText
    }

    el.addEventListener('click', function () {
      if (description.classList.contains('description')) {
        el.innerHTML = 'Read Less <div class="up-arrow">&raquo;</div>'
        description.classList.replace('description', 'description-full')
        description.innerText = originalText
      } else {
        el.innerHTML = 'Read More <div class="down-arrow">&raquo;</div>'
        description.classList.replace('description-full', 'description')
        description.innerText = truncatedText
      }
    })
  })
})
