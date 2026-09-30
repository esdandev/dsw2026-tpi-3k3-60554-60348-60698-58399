const STORAGE_KEY = 'specialties';

const SEED_SPECIALTIES = [
    { id: crypto.randomUUID(), name: 'Cardiología', description: 'Estudio y tratamiento de trastornos del corazón y del sistema circulatorio.', active: true, deleted: false },
    { id: crypto.randomUUID(), name: 'Neurología', description: 'Diagnóstico y tratamiento de todas las categorías de afecciones cerebrales.', active: true, deleted: false },
    { id: crypto.randomUUID(), name: 'Dermatología', description: 'Atención integral de enfermedades de la piel, uñas y cabello.', active: false, deleted: false },
    { id: crypto.randomUUID(), name: 'Pediatría', description: 'Cuidado médico de lactantes, niños y adolescentes.', active: true, deleted: false },
];

function getSpecialties() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);

        if (raw === null) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_SPECIALTIES));
            return SEED_SPECIALTIES.filter(s => !s.deleted);
        }

        const list = JSON.parse(raw);
        return Array.isArray(list) ? list.filter(s => !s.deleted) : [];
    } catch (error) {
        console.error('Datos de especialidades corruptos en localStorage', error);
        return [];
    }
}

function getAllSpecialties() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (error) {
        console.error('Datos de especialidades corruptos en localStorage', error);
        return [];
    }
}

function saveSpecialties(specialties) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(specialties));
}

function addSpecialty(name, description, active = true) {
    const specialties = getAllSpecialties();

    const newSpecialty = {
        id: crypto.randomUUID(),
        name,
        description,
        active,
        deleted: false
    };

    specialties.push(newSpecialty);
    saveSpecialties(specialties);

    return newSpecialty;
}

function createStatusBadge(active) {
    const badge = document.createElement('span');
    badge.textContent = active ? 'Activo' : 'Inactivo';
    badge.className = active ? 'badge active' : 'badge inactive';
    return badge;
}

function getSpecialtyById(id) {
    const specialties = getAllSpecialties();

    return specialties.find(specialty =>
        specialty.id === id && !specialty.deleted
    ) ?? null;
}

function updateSpecialty(id, name, description) {
    const specialties = getAllSpecialties();

    const specialtyIndex = specialties.findIndex(
        specialty => specialty.id === id && !specialty.deleted
    );

    if (specialtyIndex === -1) {
        return null;
    }

    specialties[specialtyIndex].name = name;
    specialties[specialtyIndex].description = description;

    saveSpecialties(specialties);

    return specialties[specialtyIndex];
}

function deleteSpecialty(id) {
    const specialties = getAllSpecialties();

    const specialtyIndex = specialties.findIndex(
        specialty => specialty.id === id && !specialty.deleted
    );

    if (specialtyIndex === -1) {
        return false;
    }

    specialties[specialtyIndex].deleted = true;

    saveSpecialties(specialties);

    return true;
}