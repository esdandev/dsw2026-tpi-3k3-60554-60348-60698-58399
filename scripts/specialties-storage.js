const STORAGE_KEY = 'specialties';

function getSpecialties() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Datos de especialidades corruptos en localStorage', error);
        return [];
    }
}

function saveSpecialties(specialties) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(specialties));
}

function addSpecialty(name, description, isActive = true) {
    const specialties = getSpecialties();

    const newSpecialty = {
        id: crypto.randomUUID(),
        name,
        description,
        isActive
    };

    specialties.push(newSpecialty);
    saveSpecialties(specialties);

    return newSpecialty;
}

// Lo utiliza persona 3
function createStatusBadge(isActive) {
    const badge = document.createElement('span');
    badge.textContent = isActive ? 'Activo' : 'Inactivo';
    badge.className = isActive ? 'badge badge-active' : 'badge badge-inactive';
    return badge;
}