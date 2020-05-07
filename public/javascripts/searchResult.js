

function addToCart(id) {
    //var room_id= document.getElementById();
    console.log(id);

    $.ajax({
        url: "/addCart",
        method: "POST",
        contentType:"application/json",
        data: JSON.stringify({
            'room_id':id
        }),
        
        success: function(data){
            console.log("Added");
            if(data=="added"){
                var element = document.getElementById(id);
                element.className += " " + "btn-light";
                element.innerHTML="Added To Cart";
            }
        }
    });

};