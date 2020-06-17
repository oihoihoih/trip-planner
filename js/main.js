var welcomeForm = document.getElementById("welcome-form");
var cardPopup = document.getElementById("form-popup");

function openPopupForm(){
    welcomeForm.classList.add('active');
    cardPopup.classList.add('active');
}

function closeForm() {
    welcomeForm.classList.remove('active');
    cardPopup.classList.remove('active');
}

function openLogin() {
    let openLoginForm = document.getElementById("login-form");

    openLoginForm.classList.add('active');
}
