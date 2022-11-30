
clicked = 0
$("#like_button").click(function(){
    if(clicked == 0){
        $(this).attr('class', 'fa-solid fa-heart');
        clicked = 1;
        add_feedback();
    }
  });

function add_feedback(){
    $.ajax({
		type: "POST",
		url: "https://thetrash.altervista.org/feedback/add_feedback.php",
    data: {"article": "night-city" },
		success: function(msg, status, jqXHR){
            $("#response").html(" Grazie!");
		},
		error: function(jqXHR, status, errorThrown){
            $("#response").html(" errore! "+  status + " " +  errorThrown);
		}
	});
}