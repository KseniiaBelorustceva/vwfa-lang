function validateForm() {
    var inpObj = document.getElementById("participant_form");
    if (inpObj.checkValidity() == false) {
        document.getElementById("valid_msg_skills").innerHTML = inpObj.validationMessage;
		document.getElementById("valid_msg_age").innerHTML = inpObj.validationMessage;
		document.getElementById("valid_msg_years").innerHTML = inpObj.validationMessage;
    } else {
        //document.getElementById("demo").innerHTML = "Input OK";
		//document.getElementById("valid_msg_skills").innerHTML = inpObj.validationMessage;
		//document.getElementById("valid_msg_age").innerHTML = inpObj.validationMessage;
		//document.getElementById("valid_msg_years").innerHTML = inpObj.validationMessage;
    } 
} 

 function submitForm(){
	 // todo: save data from form
       window.location.href="structure.html";
 }
 
 function backToSite(){
	 // todo: save data from form
       window.location.href="contact.html";
 }