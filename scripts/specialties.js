
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
