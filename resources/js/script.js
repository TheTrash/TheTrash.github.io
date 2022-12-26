$( document ).ready(function() {
  clicked = $.cookie(article_name);
  if(clicked == 1){
    $("#like_button").attr('class', 'fa-solid fa-heart');
    $("#response").html(" Grazie!");
  }
});


$("#like_button").click(function(){
    if(clicked != ""){
        $(this).attr('class', 'fa-solid fa-heart');
        clicked = 1;
        add_feedback();
        $.cookie(article_name, 1);
    }
  });

function add_feedback(){
    $.ajax({
		type: "POST",
		url: "https://thetrash.altervista.org/feedback/add_feedback.php",
    data: { "article": article_name },
		success: function(msg, status, jqXHR){
            $("#response").html(" Grazie!");
		},
		error: function(jqXHR, status, errorThrown){
            $("#response").html(" errore! "+  status + " " +  errorThrown);
		}
	});
}