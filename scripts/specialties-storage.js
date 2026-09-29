
function getSpecialties() {
    const stored = localStorage.getItem('specialties');
    
    return stored ? JSON.parse(stored) : [];
}


function saveSpecialties(specialties) {
    
    localStorage.setItem('specialties', JSON.stringify(specialties));
}


function addSpecialty(name, description, isActive = true) {
    const specialties = getSpecialties();
    
    const newSpecialty = {
        id: crypto.randomUUID(), 
        name: name,
        description: description,
        isActive: isActive 
    };
    
    specialties.push(newSpecialty);
    saveSpecialties(specialties);
    
    return newSpecialty;
}