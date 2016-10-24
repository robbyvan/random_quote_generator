var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

$(document).ready(function(){
  var newQuote = "";
  var newAuthor = "";
  updateQuote();
  $("#new-quote").on("click", function(e){
    e.preventDefault();
    e.stopPropagation();
    updateQuote();
  });
  changeChosenIcon();
});

function changeChosenIcon() {
  $("i").mouseover(function(e){
    e.stopPropagation();
    var parentSpan = $(this).parent().children().first();
    $(parentSpan).removeClass("fa-square", 500).addClass("fa-circle", 500);
  });
  $("i").mouseleave(function(e){
    e.stopPropagation();
    var parentSpan = $(this).parent().children().first();
    $(parentSpan).removeClass("fa-circle", 500).addClass("fa-square", 500);
  });
  $("#new-quote").mouseover(function(e){
    e.stopPropagation();
    $(this).animate({opacity: 0.8},200);
  }).mouseleave(function(e){
    e.stopPropagation();
    $(this).animate({opacity: 1.0},200);
  });
}

function updateQuote(){
  $.ajax({
    headers: {
      "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
    success: function(response) {
      var r = JSON.parse(response);
      newQuote = r.quote;
      newAuthor = r.author;
      $(".text h1").animate({opacity: 0}, 300, 
        function(){
          $(this).animate({opacity:1},300);
          $(this).html(newQuote);
        });
      $(".author").animate({opacity: 0}, 300, 
        function(){
          $(this).animate({opacity:1},300);
          $(this).html(newAuthor);
        });
      var color = Math.floor(Math.random() * colors.length);
      $("#new-quote").css("background-color", colors[color]);
      $("html body").css("background-color", colors[color]);
      $("html body").css("color", colors[color]);
      $(".button").css("color", colors[color]);
     
      $("#twitter").attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + newQuote + '" ' + newAuthor));
    }
  });
}