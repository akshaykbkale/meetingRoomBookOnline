window.onload = function(){

var c_username=document.getElementById('create_username');
var c_email=document.getElementById('create_email');
var u_exists=document.getElementById('uae');
var e_exists=document.getElementById('eae');


var span1 = document.createElement("span");
var username = document.getElementById("create_username");
username.parentNode.appendChild(span1);

var span2 = document.createElement("span");
var password = document.getElementById("create_password");
password.parentNode.appendChild(span2);

var span3 = document.createElement("span");
var email = document.getElementById("create_email");
email.parentNode.appendChild(span3);

username.onfocus = function(){
	u_exists.style.display = "none";
	span1.innerHTML = "username field must contain only alphanumeric characters!";
	span1.className = "alert-info";
	span1.style.display = "initial";
}

username.onblur = function(){
	if(username.value =="" || username.length == 0){
		span1.style.display = "none";
	}
	else if(!username.value.match(/^[a-zA-z0-9]+$/)){
		span1.innerHTML = "Error!";
		span1.className = "alert-warning";
	}
	else{
		span1.style.display = "none";
	}
}

password.onfocus = function(){
	span2.innerHTML = "Must be at least six characters long - must include alphanumeric and special characters";
	span2.className = "alert-info";	
	span2.style.display = "initial";
}

password.onblur = function(){

	if(password.value =="" || password.length == 0){
		span2.style.display = "none";
	}

	if(password.value.length < 6){
		span2.innerHTML = "Error!";
		span2.className = "alert-warning";
	}
	else{
		if(!password.value.match(/^(?=.*[a-zA-Z].*[a-zA-Z])(?=.*[!@#$&*])(?=.*[0-9]).{6,}$/)){
			span2.innerHTML = "Error!";
			span2.className = "alert-warning";
		}
		else{
			span2.style.display = "none";
		}
	}
}

email.onfocus = function(){
	e_exists.style.display = "none";
	span3.innerHTML = "email field should be a valid email address (abc@def.xyz)";
	span3.className = "alert-info";
	span3.style.display = "initial";
}

email.onblur = function(){

	if(email.value =="" || email.length == 0){
		span3.style.display = "none";
	}

	if(!email.value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)){
		span3.innerHTML = "Error!";
		span3.className = "alert-warning";
	}
	else{
		span3.style.display = "none";
	}
}

}


$(function() {

    $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

});

console.log("hello");

document.getElementById('erroralert').style.visibility='hidden';

    $("#login-form").submit(function(e) {
		e.preventDefault();
		var password=document.getElementById('login_password').value;
		var username=document.getElementById('login_username').value;
		
        $.ajax({
            url: "/ajaxcall",
			method: "POST",
			contentType:"application/json",
            data: JSON.stringify({
                'username': username,
               'password': password
			}),
			
            success: function(data){
				console.log(data);
				if(data=="false"){
				document.getElementById('erroralert').style.visibility='visible';
				document.getElementById('erroralert').innerHTML="Error! A problem has been occurred while submitting your data.";
				//document.getElementById('erroralert').appendChild('<button type="button" class="close" data-dismiss="alert">&times;</button>');
				}
				if(data=="true"){
					console.log("login successfull");
					window.location.href = "http://localhost:3000/home";
				}
            }
        });
    });

//Checking if username or email already registered.
    $("#register-form").submit(function(e) {
		e.preventDefault();
		var c_username=document.getElementById('create_username');
		var c_email=document.getElementById('create_email');
		var c_fname=document.getElementById('create_firstname');
		var c_lname=document.getElementById('create_lastname');
		var c_pwd=document.getElementById('create_password');
		var c_cpy=document.getElementById('create_company');

		var u_exists=document.getElementById('uae');
		var e_exists=document.getElementById('eae');

		$.ajax({
            url: "/validate",
			method: "POST",
			contentType:"application/json",
            data: JSON.stringify({
                'username': c_username.value,
                'email' : c_email.value
			}),
			
            success: function(data){
				console.log(data);
				if(data=="u_false"){
					u_exists.style.display = "initial";
				}
				else if(data=="e_false"){
					e_exists.style.display = "initial";
				}
				else if(data=="true"){
					$.ajax({
			            url: "/entry",
						method: "POST",
						contentType:"application/json",
			            data: JSON.stringify({
			                'username': c_username.value,
			                'firstname': c_fname.value,
			                'lastname': c_lname.value,
   			                'password': c_pwd.value,
			                'email' : c_email.value,
			                'company' : c_cpy.value
						}),
						
			            success: function(data){
							console.log(data);
							if(data=="successful"){
								window.location.href="http://localhost:3000/login";	
							}
			            }
					});			
				}
            }
        });
    });