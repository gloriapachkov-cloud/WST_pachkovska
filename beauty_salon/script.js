const serviceSelect = document.getElementById("serviceSelect");
const clientInput = document.getElementById("clientInput");
const addAppointmentButton = document.getElementById("addAppointmentButton");
const appointmentsList = document.getElementById("appointmentsList");
const message = document.getElementById("message");


// Функція для показу повідомлення
function showMessage(text, color) {
    message.textContent = text;
    message.style.color = color;
}


function createAppointmentElement(clientName, serviceName) {

    const appointmentItem = document.createElement("li");

    appointmentItem.className = "appointment-item";

    const appointmentText = document.createElement("span");

    appointmentText.className = "appointment-text";

    appointmentText.textContent =
        clientName + " — " + serviceName;


    const deleteButton = document.createElement("button");

    deleteButton.className = "delete-button";

    deleteButton.textContent = "Видалити";


    // Обробник натискання кнопки
    deleteButton.addEventListener("click", function () {

        appointmentItem.remove();

        showMessage(
            "Запис успішно видалено.",
            "#ef4444"
        );
    });


    appointmentItem.appendChild(appointmentText);

    appointmentItem.appendChild(deleteButton);


    return appointmentItem;
}


function addAppointment() {

    const clientName = clientInput.value.trim();

    const serviceName = serviceSelect.value;


    if (clientName === "") {

        showMessage(
            "Будь ласка, введіть ваше ім'я.",
            "#ef4444"
        );

        return;
    }


    if (serviceName === "") {

        showMessage(
            "Будь ласка, оберіть послугу.",
            "#ef4444"
        );

        return;
    }


    const appointmentElement =
        createAppointmentElement(
            clientName,
            serviceName
        );


    appointmentsList.appendChild(
        appointmentElement
    );


    clientInput.value = "";

    serviceSelect.value = "";


    showMessage(
        "Ви успішно записалися на процедуру.",
        "#16a34a"
    );
}


addAppointmentButton.addEventListener(
    "click",
    addAppointment
);