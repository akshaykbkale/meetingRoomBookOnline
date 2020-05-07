$( document ).ready(function() {
function cancelBooking(id) {
    //var room_id= document.getElementById();
    console.log(id);

    $.ajax({
        url: "/cancelBooking",
        method: "POST",
        contentType:"application/json",
        data: JSON.stringify({
            'room_id':id
        }),
        
        success: function(data){
            console.log("cancelled");
            if(data=="added"){
                var element = document.getElementById(id);
                element.className += " " + "btn-light";
                element.innerHTML="Cancelled";
            }
        }
    });

};
});