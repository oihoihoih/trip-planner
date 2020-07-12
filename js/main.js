//
//
//EFECTO PARALLAX
//
//

function parallax(element, distance, speed) {
    const item = document.querySelector(element);

    item.style.transform = `translateY(${distance * speed}px)`;
}

window.addEventListener('scroll', function(){
    parallax('.cloud', window.scrollY, -0.2);
    parallax('.sun', window.scrollY, 0.6);
    parallax('.title-container', window.scrollY, 1);
    parallax('.cl-two', window.scrollY, 0.6);

});

//
//
// SCROLL ANIMATION
//
//

function smoothScroll(target, duration){
    var target = document.querySelector(target);
    var targetPosition = target.getBoundingClientRect().top;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;

    console.log(targetPosition);

    function animation(currentTime) {
        if(startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if(timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);

}

if(document.querySelector(".cloudTransition") ) {
    var cloudTransition = document.querySelector('.cloudTransition');

    cloudTransition.addEventListener('click', function() {
    smoothScroll('.intro-text-container', 1000);
});
}

// Aquí me gustaría que también se activase el scroll haciendo scroll
// cloudTransition.addEventListener('scroll', function() {
//     smoothScroll('.intro-text-container', 1000);
// });


//
//
// TRANSICIONES
//
//


//
//
// ENLACES
//
//

//Función para ir a los enlaces y mostrar/ocultar los diferentes Divs
function gotoDiv(proximoEnlace) {
    let visibleSection = document.getElementById(proximoEnlace); 
    let activos = document.querySelector('.active'); 

    console.log(activos);

    if (activos != null) {
        activos.classList.remove('active');
    }

    visibleSection.classList.add('active');
}



//
//
// VALIDACIÓN FORMULARIOS
//
//

//FORMULARIO DE ENTRADA (INTROFORM)

function introValidate() {
    event.preventDefault(); //preventDefault siempre al principio de los formularios
    let acumErrores = 0;


    let dayCounter = document.forms["introForm"]["dayCount"];
    let accomAddress = document.forms["introForm"]["accommodationAddress"];

    if (dayCounter.value == "") {
        //dayCounter.style.border= "1px solid red"
        dayCounter.classList.add("is-invalid");     
        acumErrores ++;
    }

    if (accomAddress.value == "") {
        //dayCounter.style.border= "1px solid red"
        accomAddress.classList.add("is-invalid");
        
        acumErrores ++;
    }




    if (acumErrores > 0){
        return false;
    }else{
        //Aquí le tengo que dar las instrucciones de lo que quiero hacer una vez validado
        //Almacenar valores
        //Opcional mostrar pantalla con "se han recogido bien los datos…"
        gotoDiv('arrival')
        return false;
	}
}

const form = document.getElementById("contactFormId");

function contactValidate() {

    let acumErrores = 0;
    form.classList.remove("is-invalid");

    let name = document.forms["contactForm"]["name"];
    let mail = document.forms["contactForm"]["mail"];
    let subject = document.forms["contactForm"]["subject"];
    let message = document.forms["contactForm"]["message"];
    let privacy = document.forms["contactForm"]["privacyCheck"];

    if (name.value == "") {
        name.classList.add("is-invalid");

        acumErrores ++;
    }

    if (mail.value == "") {
        mail.classList.add("is-invalid");

        acumErrores ++;
    } else if(!validar_email(mail.value)){
		mail.classList.add("is-invalid");
 
        acumErrores ++;
	}

    if (subject.value == "") {
        subject.classList.add("is-invalid");

        acumErrores ++;
    }

    if (message.value == "") {
        message.classList.add("is-invalid");

        acumErrores ++;
    }

    if (!privacy.checked) {
        privacyCheck.classList.add("is-invalid");

        acumErrores ++;
    }



    if (acumErrores > 0){
        return false;
    }else{
		return true;
	}
}


// Función para validar en vivo (la que viene con el ejercicio)
if (document.getElementById("contactFormId")){
    form.addEventListener('blur', (event) => {
        console.log(event);
        //modo abreviado para poner condicional:
	    // if(event.target.value!='') event.target.classList.remove('is-invalid');

    if(event.target.value!="" && event.target.classList.contains("is-invalid")) {

        event.target.classList.remove("is-invalid");
        contactValidate();
    }

    if(event.target.checked) {
        event.target.classList.remove("is-invalid");
    }
}, true);

//Para que se vayan los estilos de error al clickar sobre el checkbox
form.addEventListener('change', (event) => {
    console.log(event);
    if(event.target.checked) {
        event.target.classList.remove("is-invalid");
    }
});

}


// Función para validar el mail
function validar_email(mail) {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

	return regex.test(mail) ? true : false;
}


