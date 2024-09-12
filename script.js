// Zestawy zdjęć dla różnych konfiguracji przyczep
const trailerViews = {
    "small_red_single_flatbed_toolbox": [
        "images/front_small_red_single_flatbed_toolbox.jpg",
        "images/back_small_red_single_flatbed_toolbox.jpg",
        "images/left_small_red_single_flatbed_toolbox.jpg",
        "images/right_small_red_single_flatbed_toolbox.jpg"
    ],
    "small_red_single_flatbed_jacks": [
        "images/front_small_red_single_flatbed_jacks.jpg",
        "images/back_small_red_single_flatbed_jacks.jpg",
        "images/left_small_red_single_flatbed_jacks.jpg",
        "images/right_small_red_single_flatbed_jacks.jpg"
    ],
    "small_red_single_flatbed_ramp": [
        "images/front_small_red_single_flatbed_ramp.jpg",
        "images/back_small_red_single_flatbed_ramp.jpg",
        "images/left_small_red_single_flatbed_ramp.jpg",
        "images/right_small_red_single_flatbed_ramp.jpg"
    ],
    "small_red_single_enclosed_toolbox": [
        "images/front_small_red_single_enclosed_toolbox.jpg",
        "images/back_small_red_single_enclosed_toolbox.jpg",
        "images/left_small_red_single_enclosed_toolbox.jpg",
        "images/right_small_red_single_enclosed_toolbox.jpg"
    ],
    "small_red_single_enclosed_jacks": [
        "images/front_small_red_single_enclosed_jacks.jpg",
        "images/back_small_red_single_enclosed_jacks.jpg",
        "images/left_small_red_single_enclosed_jacks.jpg",
        "images/right_small_red_single_enclosed_jacks.jpg"
    ],
    "small_red": [
        "images/front_small_red.jpg",
        "images/back_small_red.jpg",
        "images/left_small_red.jpg",
        "images/right_small_red.jpg"
    ],
    // Dodaj więcej konfiguracji w razie potrzeby
};

// Inicjalizacja zmiennych
// Inicjalizacja zmiennych
let selectedSize = null;
let selectedColor = null;
let selectedAxle = null;
let selectedType = null;
let selectedAccessories = [];
let currentViews = [];
let currentIndex = 0;

// Funkcja do aktualizacji widoków na podstawie wybranych opcji
function updateCurrentViews() {
    let keyParts = [];

    if (selectedSize) keyParts.push(selectedSize);
    if (selectedColor) keyParts.push(selectedColor);
    if (selectedAxle) keyParts.push(selectedAxle);
    if (selectedType) keyParts.push(selectedType);
    selectedAccessories.forEach(accessory => {
        keyParts.push(accessory);
    });

    const key = keyParts.join('_');
    currentViews = trailerViews[key] || [];

    // Debugowanie
    console.log(`Wybrane opcje: Size=${selectedSize || 'brak'}, Color=${selectedColor || 'brak'}, Axle=${selectedAxle || 'brak'}, Type=${selectedType || 'brak'}, Accessories=${selectedAccessories.join(', ') || 'brak'}`);
    console.log(`Klucz użyty do wyszukiwania: ${key}`);
    console.log(`Znaleziony zestaw zdjęć: ${currentViews.length > 0 ? 'Tak' : 'Brak'}`);

    // Jeśli nie znaleziono zestawu zdjęć, spróbuj użyć podstawowych opcji
    if (currentViews.length === 0 && selectedSize && selectedColor) {
        const basicKey = `${selectedSize}_${selectedColor}`;
        currentViews = trailerViews[basicKey] || [];
        console.log(`Podstawowy klucz użyty do wyszukiwania: ${basicKey}`);
    }

    currentIndex = 0; // Resetowanie indeksu przy aktualizacji widoków
    updateView();
}

// Funkcja do aktualizacji widoku
function updateView() {
    if (currentViews.length === 0) {
        document.getElementById("viewImage").src = "";
        console.log("Brak zdjęć do wyświetlenia.");
        return;
    }
    const viewImage = document.getElementById("viewImage");
    viewImage.src = currentViews[currentIndex];
    viewImage.alt = "Widok przyczepy: " + (currentIndex + 1);
}

// Funkcje do obsługi kliknięć w opcje
document.querySelectorAll(".option-tile[data-size]").forEach(tile => {
    tile.addEventListener("click", function() {
        document.querySelectorAll(".option-tile[data-size]").forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        selectedSize = this.getAttribute("data-size");
        updateCurrentViews();
    });
});

document.querySelectorAll(".option-tile[data-color]").forEach(tile => {
    tile.addEventListener("click", function() {
        document.querySelectorAll(".option-tile[data-color]").forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        selectedColor = this.getAttribute("data-color");
        updateCurrentViews();
    });
});

document.querySelectorAll(".option-tile[data-axle]").forEach(tile => {
    tile.addEventListener("click", function() {
        document.querySelectorAll(".option-tile[data-axle]").forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        selectedAxle = this.getAttribute("data-axle");
        updateCurrentViews();
    });
});

document.querySelectorAll(".option-tile[data-type]").forEach(tile => {
    tile.addEventListener("click", function() {
        document.querySelectorAll(".option-tile[data-type]").forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        selectedType = this.getAttribute("data-type");
        updateCurrentViews();
    });
});

document.querySelectorAll(".option-tile[data-accessory]").forEach(tile => {
    tile.addEventListener("click", function() {
        const accessory = this.getAttribute("data-accessory");
        if (selectedAccessories.includes(accessory)) {
            selectedAccessories = selectedAccessories.filter(a => a !== accessory);
            this.classList.remove("active");
        } else {
            selectedAccessories.push(accessory);
            this.classList.add("active");
        }
        updateCurrentViews();
    });
});

// Obsługuje kliknięcia na strzałki
document.getElementById("prevView").addEventListener("click", function() {
    if (currentViews.length > 0) {
        currentIndex = (currentIndex === 0) ? currentViews.length - 1 : currentIndex - 1;
        updateView();
    }
});

document.getElementById("nextView").addEventListener("click", function() {
    if (currentViews.length > 0) {
        currentIndex = (currentIndex === currentViews.length - 1) ? 0 : currentIndex + 1;
        updateView();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Handle menu visibility
    const toggleButtons = document.querySelectorAll('.toggle-options');
    const menuHeader = document.querySelector('.main-header');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target') + 'Options';
            const target = document.getElementById(targetId);

            if (target.classList.contains('hidden')) {
                target.classList.remove('hidden');
                target.classList.add('show');
                this.classList.remove('rotate');
            } else {
                target.classList.add('hidden');
                target.classList.remove('show');
                this.classList.add('rotate');
            }
        });
    });

    // Show or hide the menu based on mouse position
    document.addEventListener('mousemove', function(event) {
        if (event.clientY < 50) {
            menuHeader.classList.remove('hidden');
            menuHeader.style.transform = 'translateY(0)'; // Show menu
        } else {
            menuHeader.style.transform = 'translateY(-100%)'; // Hide menu
        }
    });

    // Handle option selection
    const optionTiles = document.querySelectorAll('.option-tile');

    optionTiles.forEach(tile => {
        tile.addEventListener('click', function() {
            const optionGroup = this.closest('.option-group');
            const selectedOptionSpan = optionGroup.querySelector('.selected-option');
            const optionText = this.textContent;

            let selectedOptions = selectedOptionSpan.textContent.trim();
            
            // Check if it's a multi-select or single-select
            if (optionGroup.hasAttribute('data-multi-select')) {
                // For multiple selection
                let optionsArray = selectedOptions === 'Wybierz...' ? [] : selectedOptions.split(', ').filter(opt => opt.trim() !== '');
                const optionIndex = optionsArray.indexOf(optionText);
                if (optionIndex > -1) {
                    optionsArray.splice(optionIndex, 1);
                } else {
                    optionsArray.push(optionText);
                }
                selectedOptions = optionsArray.length > 0 ? optionsArray.join(', ') : 'Wybierz...';
            } else {
                // For single selection
                selectedOptions = optionText;
            }

            // Update selected options text
            selectedOptionSpan.textContent = selectedOptions;

            // Update weight display
            updateWeight();
        });
    });

    // Function to update weight based on selected options
    function updateWeight() {
        const baseWeight = 2000;
        let additionalWeight = 0;
    
        document.querySelectorAll('.option-group').forEach(group => {
            const selectedOptions = group.querySelector('.selected-option').textContent;
            if (selectedOptions !== 'Wybierz...') {
                const optionsArray = selectedOptions.split(', ').filter(opt => opt.trim() !== '');
                optionsArray.forEach(option => {
                    // Find the option element and get its weight
                    const optionElement = Array.from(group.querySelectorAll('.option-tile')).find(tile => tile.textContent === option);
                    if (optionElement) {
                        additionalWeight += parseFloat(optionElement.getAttribute('data-weight')) || 0;
                    }
                });
            }
        });
    
        const totalWeight = baseWeight + additionalWeight;
        document.getElementById('weight').textContent = `DMC: ${totalWeight} kg`;
    }
    
});


document.addEventListener('mousemove', function(event) {
    const modelTitle = document.querySelector('.model-title');

    // Ustalamy szerokość i wysokość okna
    const { innerWidth: width, innerHeight: height } = window;

    // Obliczamy środek okna
    const centerX = width / 2;
    const centerY = height / 2;

    // Obliczamy kąt przesunięcia
    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;

    // Ustalamy maksymalny kąt rotacji
    const maxRotation = 15; // Maksymalny kąt w stopniach

    // Obliczamy rotację na podstawie przesunięcia
    const rotateX = (deltaY / centerY) * maxRotation;
    const rotateY = -(deltaX / centerX) * maxRotation;

    // Ustalamy transformację 3D
    modelTitle.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});




