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
    var intro = document.getElementById('intro-illustration');
    // var mouse = document.getElementById("mouse");

    cloudTransition.addEventListener('click', function() {
        smoothScroll('.intro-text-container', 1000);
        intro.style.display = 'none';
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
function gotoDiv(proximoEnlace, event) {
    let visibleSection = document.getElementById(proximoEnlace); 
    let activos = document.querySelector('.active'); 

    console.log(activos);

    captureBreadcrumbs(proximoEnlace, event);

    if (activos != null) {
        activos.classList.remove('active');
    }

    visibleSection.classList.add('active');
    writeBreadCrumbs();
}



//Para guardar los valores de los clicks
let choosenTransport;
let choosenTerminal;
let choosenStation;
let choosenBusStation;
let choosenPortOption;
let choosenmethod;

let firstTransportBr = document.getElementById('firstTransport_br');
let whichTerminalBr = document.getElementById('whichTerminal_br');
let whichStationBr = document.getElementById('whichStation_br');
let whichBusStationBr = document.getElementById('whichBusStation_br');
let howPortBr = document.getElementById('howPort_br');
let methodBr = document.getElementById('method_br');


// GUARDAR INFO PARA BREADCRUMBS

function captureBreadcrumbs(proximoEnlace, event){
    let arrivalId = document.getElementById('arrival');
    let breadcr = document.getElementById('questionBreadcrumb');

    //fase 1. Con qué medio de transporte llegas a Bcn?
    if(arrivalId.classList.contains('active')){
        breadcr.style.display = 'flex';
        firstTransportBr.style.display = 'flex';
        switch(proximoEnlace){
            case 'que-terminal':
                choosenTransport = '<i class="icon-flight bread-icon"></i>';
                localStorage.setItem('firstTransport', choosenTransport);
                break;
            case 'que-estacion':
                choosenTransport = '<i class="icon-train bread-icon"></i>';
                localStorage.setItem('firstTransport', choosenTransport);
                break;
            //Falta añadir opción coche
            case 'que-estacion-bus':
                choosenTransport = '<i class="icon-bus bread-icon"></i>';
                localStorage.setItem('firstTransport',choosenTransport);
                break;
            case 'barco-coche':
                choosenTransport = '<i class="icon-ship bread-icon"></i>';
                localStorage.setItem('firstTransport', choosenTransport);
                break;
        }
    }

    // fase 2. Qué terminal -- avión
    let queTerminal = document.getElementById('que-terminal');
    if(queTerminal.classList.contains('active')){
        whichTerminalBr.style.display = 'flex';
        switch(event.id){
            case 'T1':
                choosenTerminal = 'T1';
                localStorage.setItem('whichTerminal', choosenTerminal);
                break;
            case 'T2':
                choosenTerminal = 'T2';
                localStorage.setItem('whichTerminal', choosenTerminal);
                break;
        }   
    }

    // fase 2. Qué estación -- tren
    let trainStation = document.getElementById('que-estacion');
    if(trainStation.classList.contains('active')){
        whichStationBr.style.display = 'flex';
        switch(event.id){
            case 'Sants':
                choosenStation = 'Sants';
                localStorage.setItem('whichStation', choosenStation);
                break;
            case 'Francia':
                choosenStation = 'Francia';
                localStorage.setItem('whichStation', choosenStation);
                break;
            case 'Catalunya':
                choosenStation = 'Catalunya';
                localStorage.setItem('whichStation', choosenStation);
                break;
            case 'Sagrera':
                choosenStation = 'La Sagrera';
                localStorage.setItem('whichStation', choosenStation);
                break;                
        }
    }

    // fase 2. Qué estación -- bus
    let busStation = document.getElementById('que-estacion-bus');
    if (busStation.classList.contains('active')){
        whichBusStationBr.style.display = 'flex';
        switch(event.id){
            case 'SantsBus':
                choosenBusStation = 'Sants';
                localStorage.setItem('whichBusStation', choosenBusStation);
                break;
            case 'NorteBus':
                choosenBusStation = 'Norte';
                localStorage.setItem('whichBusStation', choosenBusStation);
                break;
        }
    }

    // fase 2. Con coche? -- barco
    let port = document.getElementById('barco-coche');
    if(port.classList.contains('active')){
        howPortBr.style.display = 'flex';
        switch(event.id){
            case 'noCar':
                choosenPortOption = 'sin coche';
                localStorage.setItem('portOption', choosenPortOption);
                break;
        }
    }

    //fase 3. Cómo quieres ir?
    let modoTransporte = document.getElementById('choosenTransport');
    if(modoTransporte.classList.contains('active')){
        methodBr.style.display = 'flex';
        switch(event.id){
            case 'fastChoice':
                choosenMethod = 'rápido';
                localStorage.setItem('arrivalMethod', choosenMethod);
                break;
            
        }
    }
}

// ESCRIBIR BREADCRUMBS

function writeBreadCrumbs(){
    let arrivalTransport = localStorage.getItem('firstTransport');
    let whichTerminal = localStorage.getItem('whichTerminal');
    let choosenStation = localStorage.getItem('whichStation');
    let choosenBusStation = localStorage.getItem('whichBusStation');
    let choosenPortOption = localStorage.getItem('portOption');

        
    firstTransportBr.innerHTML = arrivalTransport
    whichTerminalBr.innerHTML = whichTerminal;
    whichStationBr.innerHTML = choosenStation;
    whichBusStationBr.innerHTML = choosenBusStation;
    howPortBr.innerHTML = choosenPortOption;
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
        dayCounter.classList.add("is-invalid");     
        acumErrores ++;
    }

    if (accomAddress.value == "") {
        accomAddress.classList.add("is-invalid");
        acumErrores ++;
    }

    if (acumErrores > 0){
        return false;
    } else {
        //Aquí le tengo que dar las instrucciones de lo que quiero hacer una vez validado
        console.log(dayCounter.value);
        console.log(accomAddress.value);
        //Almacenar valores
        localStorage.setItem('duracionViaje', dayCounter.value);
        localStorage.setItem('direccionHotel', accomAddress.value);
        //Opcional mostrar pantalla con "se han recogido bien los datos…"
        gotoDiv('arrival')
        return false;
	}
}

// DATOS FORMULARIO DE ENTRADA (INTROFORM)






//FORMULARIO EJERCICIO IT ACADEMY
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


