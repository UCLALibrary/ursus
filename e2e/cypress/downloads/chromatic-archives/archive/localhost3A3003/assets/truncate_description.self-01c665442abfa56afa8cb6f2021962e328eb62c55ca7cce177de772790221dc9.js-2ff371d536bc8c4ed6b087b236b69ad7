document.addEventListener("turbolinks:load", function () {
  var viewMoreButtons = document.querySelectorAll(".view-more");
  viewMoreButtons.forEach(function (el) {
    var description = el.previousElementSibling;
    var originalText = description.innerText;

    if (originalText.length < 300) {
      el.style.display = "none";
      return;
    }

    var truncatedText = originalText.substr(0, 299);

    // To avoid truncation in the middle of the word get the end of the word
    //   from the the cut part of the description.
    var cutString = originalText.substr(299);
    truncatedText += cutString.match(/^[a-z0-9]*/i)[0]; //regex gets the end of the word

    truncatedText += "…";
    description.innerText = truncatedText;

    el.addEventListener("click", function () {
      if (description.classList.contains("description")) {
        el.innerHTML = 'Read Less <div class="up-arrow">&raquo;</div>';
        description.classList.replace("description", "description-full");
        description.innerText = originalText;
      } else {
        el.innerHTML = 'Read More <div class="down-arrow">&raquo;</div>';
        description.classList.replace("description-full", "description");
        description.innerText = truncatedText;
      }
    });
  });
});
