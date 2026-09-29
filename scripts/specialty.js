const form = document.getElementById('form-specialty');

form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    
    const nombre = document.getElementById('nombre-input').value;
    const descripcion = document.getElementById('descripcion-input').value;
    
    // Aquí se puedes agregar las validaciones (ej. que no supere 15 caracteres, etc.)
    
    addSpecialty(nombre, descripcion);
    
    alert('Especialidad guardada con éxito');
    form.reset(); 
});