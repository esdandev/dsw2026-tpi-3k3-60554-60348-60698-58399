
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

function createActionsCell(specialty) {
    const td = document.createElement('td');

    const actions = document.createElement('div');
    actions.className = 'table-actions';

    const editButton = document.createElement('a');
    editButton.href = `specialty.html?id=${specialty.id}`;
    editButton.className = 'action-button edit';
    editButton.textContent = 'Editar';

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'action-button delete';
    deleteButton.textContent = 'Borrar';

    deleteButton.addEventListener('click', () => {
        const confirmed = confirm(
            `¿Desea eliminar la especialidad "${specialty.name}"?`
        );

        if (!confirmed) {
            return;
        }

        deleteSpecialty(specialty.id);

        const searchInput = document.getElementById('search-input');
        filterByName(searchInput.value);
    });

    actions.appendChild(editButton);
    actions.appendChild(deleteButton);

    td.appendChild(actions);

    return td;
}

/** Dibuja las filas de la tabla a partir de una lista de especialidades. */
function renderSpecialties(list) {
    const tbody = document.getElementById('specialties-table-body');
    tbody.replaceChildren();

    if (list.length === 0) {
        const tr = document.createElement('tr');
        const td = createCell('No se encontraron especialidades.');
        td.colSpan = 4;
        tr.appendChild(td);
        tbody.appendChild(tr);
        return;
    }

    list.forEach(specialty => {
        const tr = document.createElement('tr');

        tr.appendChild(createCell(specialty.name));
        tr.appendChild(createCell(specialty.description));

        const statusCell = document.createElement('td');
        statusCell.appendChild(createStatusBadge(specialty.active));
        tr.appendChild(statusCell);

        tr.appendChild(createActionsCell(specialty));

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
