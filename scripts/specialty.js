const form = document.getElementById("specialty-form");

const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");

const nameError = document.getElementById("name-error");
const descriptionError = document.getElementById("description-error");

const formTitle = document.getElementById("form-title");
const breadcrumbCurrent = document.getElementById("breadcrumb-current");
const submitButton = document.getElementById("submit-button");

const params = new URLSearchParams(window.location.search);
const specialtyId = params.get("id");

if (specialtyId !== null) {
    const specialty = getSpecialtyById(specialtyId);

    if (specialty === null) {
        alert("La especialidad no existe.");
        window.location.href = "specialties.html";
    } else {
        nameInput.value = specialty.name;
        descriptionInput.value = specialty.description;

        formTitle.textContent = "Editar Especialidad";
        breadcrumbCurrent.textContent = "Editar Especialidad";
        submitButton.textContent = "Guardar Cambios";
    }
}


form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const description = descriptionInput.value.trim();

    let isValid = true;

    nameError.textContent = "";
    descriptionError.textContent = "";

    if (name === "") {
        nameError.textContent = "El nombre es obligatorio.";
        isValid = false;
    } else if (name.length > 15) {
        nameError.textContent = "El nombre no puede superar los 15 caracteres.";
        isValid = false;
    }

    if (description === "") {
        descriptionError.textContent = "La descripción es obligatoria.";
        isValid = false;
    } else if (description.length > 100) {
        descriptionError.textContent = "La descripción no puede superar los 100 caracteres.";
        isValid = false;
    }

    if (!isValid) {
        return;
    }


        if (specialtyId === null) {
            addSpecialty(name, description);
        } else {
            updateSpecialty(specialtyId, name, description);
        }

        window.location.href = "specialties.html";
});