const STORAGE_KEY = 'specialties';

// Datos de ejemplo: solo se usan la primera vez, si localStorage está vacío.
const SEED_SPECIALTIES = [
    { id: crypto.randomUUID(), name: 'Cardiología', description: 'Estudio y tratamiento de trastornos del corazón y del sistema circulatorio.', active: true, deleted: false },
    { id: crypto.randomUUID(), name: 'Neurología', description: 'Diagnóstico y tratamiento de todas las categorías de afecciones cerebrales.', active: true, deleted: false },
    { id: crypto.randomUUID(), name: 'Dermatología', description: 'Atención integral de enfermedades de la piel, uñas y cabello.', active: false, deleted: false },
    { id: crypto.randomUUID(), name: 'Pediatría', description: 'Cuidado médico de lactantes, niños y adolescentes.', active: true, deleted: false },
];

/**
 * Devuelve las especialidades guardadas en localStorage (sin las eliminadas).
 * Si no hay nada guardado todavía, carga los datos de ejemplo.
 */
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
        console.error('No se pudieron leer las especialidades:', error);
        return [];
    }
}

/** Minúsculas y sin tildes, para que "cardio" encuentre "Cardiología" y "Neurologia" a "Neurología". */
function normalize(text) {
    return String(text ?? '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
}

/** Crea una celda de texto. Se usa textContent (nunca innerHTML) para evitar XSS. */
function createCell(text) {
    const td = document.createElement('td');
    td.textContent = text;
    return td;
}

/** Dibuja las filas de la tabla a partir de una lista de especialidades. */
function renderSpecialties(list) {
    const tbody = document.getElementById('specialties-table-body');
    tbody.replaceChildren();

    if (list.length === 0) {
        const tr = document.createElement('tr');
        const td = createCell('No se encontraron especialidades.');
        td.colSpan = 3;
        tr.appendChild(td);
        tbody.appendChild(tr);
        return;
    }

    list.forEach(specialty => {
        const tr = document.createElement('tr');
        tr.appendChild(createCell(specialty.name));
        tr.appendChild(createCell(specialty.description));
        tr.appendChild(createCell(specialty.active ? 'Activo' : 'Inactivo'));
        tbody.appendChild(tr);
    });
}

/** Filtra por nombre leyendo desde localStorage y vuelve a renderizar, sin recargar la página. */
function filterByName(term) {
    const query = normalize(term);
    const all = getSpecialties();

    const filtered = query === ''
        ? all
        : all.filter(s => normalize(s.name).includes(query));

    renderSpecialties(filtered);
}

document.addEventListener('DOMContentLoaded', () => {
    // Render inicial
    renderSpecialties(getSpecialties());

    // Buscador en tiempo real
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', event => filterByName(event.target.value));

    // Menú móvil
    const menuBtn = document.querySelector('.menu');
    const sidebar = document.getElementById('sidebar');
    menuBtn?.addEventListener('click', () => sidebar.classList.toggle('open'));

    // Cerrar sesión
    document.getElementById('logout')?.addEventListener('click', () => {
        window.location.href = 'login.html';
    });
});
