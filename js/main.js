const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".nav-menu");
const menuButtonClose = document.querySelector(".menu-button-close");
menuButton.addEventListener("click", () => {
    menu.classList.add("is-open");
    menuButtonClose.classList.add("is-active");
});
menuButtonClose.addEventListener("click", () => {
    menu.classList.remove("is-open");
    menuButtonClose.classList.remove("is-active");
});

// popup form
const hideForm = document.querySelector(".hide-form");
const orderTicket = hideForm.querySelector(".order-ticket");
const orderTrigger = hideForm.querySelector(".order-trigger");
const orderTicketForm = hideForm.querySelector(".order-ticket__form");

const orderTicketFormWrapper = hideForm.querySelector(".order-ticket__form-wrapper");
const orderTicketPreloaderWrapper = hideForm.querySelector(".order-ticket__preloader-wrapper");
const orderTicketThanksWrapper = hideForm.querySelector(".order-ticket__thanks-wrapper");
const orderTicketThanksName = hideForm.querySelector(".order-ticket__thanks-name");

const heightForm = orderTicket.offsetHeight;

setTimeout(() => {
    hideForm.style.bottom = -heightForm + "px";
}, 1000);

const sendData = (data, callback, callBefore) => {
    if (callBefore) callBefore();
    // fetch("https://jsonplaceholder.typicode.com/posts", {
    fetch("http://localhost:3000/api", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            return response.json();
        })
        .then(callback);
};

const showPreloader = () => {
    orderTicketFormWrapper.style.display = "none";
    orderTicketPreloaderWrapper.style.display = "block";
};

const hidePreloader = () => {
    // orderTicketFormWrapper.style.display = "block";
    orderTicketPreloaderWrapper.style.display = "none";
}

const showThankYou = (data) => {
    console.log("Thank You");
    console.log(data);
    hidePreloader();
    orderTicketThanksName.textContent = data.name;
    orderTicketThanksWrapper.style.display = "block";
    orderTicketFormWrapper.style.display = "none";
};




orderTrigger.addEventListener("click", () => {
    hideForm.classList.toggle("hide-form-active");
});

orderTicketForm.addEventListener("change", (event) => {
    const target = event.target;
    // console.log(target);
    const label = target.labels[0];
    // console.log(label);
    const enteredValue = target.value.trim();
    //проверка наличия label
    if (label) {
        if (enteredValue.length > 0) {
            label.classList.add("order-ticket__label-focus");
        } else {
            label.classList.remove("order-ticket__label-focus");
        }
    }
});

orderTicketForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(orderTicketForm);
    const data = {};

    for (const element of formData) {
        const [name, value] = element;
        data[name] = value;
    }
    // console.log(data);
    sendData(data, showThankYou, showPreloader);
});