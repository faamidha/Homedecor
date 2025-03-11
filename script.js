// Default language
let currentLanguage = 'en';  // Initially set to English

const decorDetailsTranslations = {
    en: {
        "Kitchen": {
            "12*10*8": { paint: "Olive Green", cabinet: "White Wood", flooring: "Tile", image: "images/kitchen1.jpeg" },
            "14*12*9": { paint: "Brick Red", cabinet: "Dark Brown", flooring: "Vinyl", image: "images/kitchen2.jpeg" },
            "16*14*10": { paint: "Soft Yellow", cabinet: "Beige", flooring: "Marble", image: "images/kitchen3.jpeg" },
            "18*16*11": { paint: "Sky Blue", cabinet: "Light Grey", flooring: "Hardwood", image: "images/kitchen4.jpeg" },
            "20*18*12": { paint: "Deep Orange", cabinet: "Dark Teak", flooring: "Granite", image: "images/kitchen5.jpeg" },
            "22*20*13": { paint: "Mint Green", cabinet: "White", flooring: "Cement", image: "images/kitchen6.jpeg" }
        },
        "Bedroom": {
            "10*12*9": { paint: "Pastel Pink", curtains: "White Cotton", mats: "Soft Carpet", image: "images/bedroom1.jpeg" },
            "11*13*10": { paint: "Lavender", curtains: "Dark Grey", mats: "Silk Rug", image: "images/bedroom2.jpeg" },
            "12*14*11": { paint: "Sky Blue", curtains: "Light Brown", mats: "Jute Mat", image: "images/bedroom3.jpeg" }
        },
        "Hall": {
            "20*25*12": { paint: "Off White", curtains: "Royal Blue", plants: "Monstera", mats: "Persian Rug", image: "images/hall1.jpeg" },
            "22*26*13": { paint: "Warm Grey", curtains: "Dark Brown", plants: "Palm Tree", mats: "Velvet Mat", image: "images/hall2.jpeg" }
        }
    },
    ta: {
        "Kitchen": {
            "12*10*8": { paint: "ஆலிவ் பச்சை", cabinet: "வெள்ளை மரம்", flooring: "டைல்", image: "images/kitchen1.jpeg" },
            "14*12*9": { paint: "செங்கல் சிவப்பு", cabinet: "கருப்பு பழுப்பு", flooring: "வினைல்", image: "images/kitchen2.jpeg" },
            "16*14*10": { paint: "மென்மையான மஞ்சள்", cabinet: "பீஜ்", flooring: "மார்பிள்", image: "images/kitchen3.jpeg" },
            "18*16*11": { paint: "வான நீலம்", cabinet: "இலகு சாம்பல்", flooring: "கடின மரம்", image: "images/kitchen4.jpeg" },
            "20*18*12": { paint: "ஆழ்ந்த ஆரஞ்சு", cabinet: "கருப்பு டீக்", flooring: "கிரானைட்", image: "images/kitchen5.jpeg" },
            "22*20*13": { paint: "மிண்ட் பச்சை", cabinet: "வெள்ளை", flooring: "சிமெண்ட்", image: "images/kitchen6.jpeg" }
        },
        "Bedroom": {
            "10*12*9": { paint: "பேஸ்டல் பிங்க்", curtains: "வெள்ளை பருத்தி", mats: "மென்மையான கார்பெட்", image: "images/bedroom1.jpeg" },
            "11*13*10": { paint: "லாவெண்டர்", curtains: "கருப்பு சாம்பல்", mats: "பட்டு விரிப்பு", image: "images/bedroom2.jpeg" },
            "12*14*11": { paint: "வான நீலம்", curtains: "இலகு பழுப்பு", mats: "சணல் பாய்", image: "images/bedroom3.jpeg" }
        },
        "Hall": {
            "20*25*12": { paint: "ஆஃப் வெள்ளை", curtains: "ராயல் நீலம்", plants: "மான்ஸ்டெரா", mats: "பெர்சியன் விரிப்பு", image: "images/hall1.jpeg" },
            "22*26*13": { paint: "வெதுவெதுப்பான சாம்பல்", curtains: "கருப்பு பழுப்பு", plants: "பனை மரம்", mats: "வெல்வெட் விரிப்பு", image: "images/hall2.jpeg" }
        }
    }
};

// Update decorDetails when language changes
function updateDecorDetails() {
    return decorDetailsTranslations[currentLanguage];
}

let decorDetails = updateDecorDetails();

function goToHome() {
    window.location.href = "home.html";
}

function populateDimensions() {
    const roomTypeSelect = document.getElementById("roomType");
    const dimensionSelect = document.getElementById("dimension");
    
    // Clear previous options
    dimensionSelect.innerHTML = "";

    // Add default "Choose a dimension" option
    const defaultDimOption = document.createElement("option");
    defaultDimOption.value = "";
    defaultDimOption.textContent = translations[currentLanguage].defaultDimension;
    defaultDimOption.selected = true;
    defaultDimOption.disabled = true;
    dimensionSelect.appendChild(defaultDimOption);

    if (!roomTypeSelect.value) {
        return; // Do not populate dimensions if no room type is selected
    }

    if (decorDetails[roomTypeSelect.value]) {
        Object.keys(decorDetails[roomTypeSelect.value]).forEach(dim => {
            const option = document.createElement("option");
            option.value = dim;
            option.textContent = dim;
            dimensionSelect.appendChild(option);
        });
    }

    // Ensure first option remains selected
    dimensionSelect.selectedIndex = 0;
}

// Ensure the user selects valid options
function findDecoration() {
    const roomTypeSelect = document.getElementById("roomType");
    const dimensionSelect = document.getElementById("dimension");
    const resultDiv = document.getElementById("result");

    const roomType = roomTypeSelect.value.trim();
    const selectedDimension = dimensionSelect.value.trim();

    // Clear previous messages with smooth transition
    resultDiv.style.opacity = '0';
    setTimeout(() => {
        resultDiv.innerHTML = "";
        
        // Validate selection
        if (!roomType || !selectedDimension) {
            resultDiv.innerHTML = `<p style="color: #ff4444; font-weight: bold; padding: 10px; background: rgba(255,68,68,0.1); border-radius: 5px;">
                ${translations[currentLanguage].selectBothError}
            </p>`;
            resultDiv.style.display = "block";
            resultDiv.style.opacity = '1';
            return;
        }

        const details = decorDetails[roomType]?.[selectedDimension];

        if (details) {
            // Translate property labels based on current language
            const propertyLabels = {
                paint: currentLanguage === 'ta' ? 'வண்ணம்' : 'Paint',
                cabinet: currentLanguage === 'ta' ? 'அலமாரி' : 'Cabinet',
                flooring: currentLanguage === 'ta' ? 'தரை' : 'Flooring',
                curtains: currentLanguage === 'ta' ? 'திரைச்சீலைகள்' : 'Curtains',
                mats: currentLanguage === 'ta' ? 'விரிப்புகள்' : 'Mats',
                plants: currentLanguage === 'ta' ? 'செடிகள்' : 'Plants'
            };

            let htmlContent = `
                <div style="animation: fadeIn 0.5s ease-in-out;">
                    <h3>${translations[currentLanguage].roomOptions[translations['en'].roomOptions.indexOf(roomType)]} (${selectedDimension})</h3>
                    <img src="${details.image}" alt="${roomType} Design" 
                         style="max-width: 100%; height: auto; box-shadow: 0 4px 8px rgba(0,0,0,0.2);" 
                         loading="lazy">
                    <div class="details-container" style="margin-top: 20px; text-align: left; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 10px;">
                        <p><strong>${propertyLabels.paint}:</strong> ${details.paint || "N/A"}</p>
            `;

            if (details.cabinet) htmlContent += `<p><strong>${propertyLabels.cabinet}:</strong> ${details.cabinet}</p>`;
            if (details.flooring) htmlContent += `<p><strong>${propertyLabels.flooring}:</strong> ${details.flooring}</p>`;
            if (details.curtains) htmlContent += `<p><strong>${propertyLabels.curtains}:</strong> ${details.curtains}</p>`;
            if (details.mats) htmlContent += `<p><strong>${propertyLabels.mats}:</strong> ${details.mats}</p>`;
            if (details.plants) htmlContent += `<p><strong>${propertyLabels.plants}:</strong> ${details.plants}</p>`;

            htmlContent += '</div></div>';
            resultDiv.innerHTML = htmlContent;
        } else {
            const errorMessage = translations[currentLanguage].noMatchingDesign
                .replace('{roomType}', translations[currentLanguage].roomOptions[translations['en'].roomOptions.indexOf(roomType)])
                .replace('{dimension}', selectedDimension);

            resultDiv.innerHTML = `<p style="color: #ff4444; padding: 10px; background: rgba(255,68,68,0.1); border-radius: 5px;">${errorMessage}</p>`;
        }

        resultDiv.style.display = "block";
        resultDiv.style.opacity = '1';
    }, 300);
}

// 🔄 Reset function to clear selections and result
function resetForm() {
    document.getElementById("roomType").selectedIndex = 0;
    document.getElementById("dimension").innerHTML = `<option value="" disabled selected>Choose a dimension</option>`;
    document.getElementById("result").innerHTML = "";
}

// 🟢 Auto-clear error message when a valid selection is made
document.getElementById("roomType").addEventListener("change", () => {
    document.getElementById("result").innerHTML = "";
});
document.getElementById("dimension").addEventListener("change", () => {
    document.getElementById("result").innerHTML = "";
});


// Add default "Choose an option" to room type dropdown on page load
document.addEventListener("DOMContentLoaded", function () {
    const roomTypeSelect = document.getElementById("roomType");

    // Add "Choose a room type" as the first option
    const defaultRoomOption = document.createElement("option");
    defaultRoomOption.value = "";
    defaultRoomOption.textContent = "Choose a room type";
    defaultRoomOption.selected = true;
    defaultRoomOption.disabled = true;
    roomTypeSelect.insertBefore(defaultRoomOption, roomTypeSelect.firstChild);

    // Ensure dimensions are updated only when a valid room type is selected
    roomTypeSelect.addEventListener("change", populateDimensions);
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent default form submission
        findDecoration(); // Call your function to get suggestions
    }
    if (event.key === "Escape") {
        resetForm(); // Call your reset function
    }
});



function toggleContactInfo() {
    const contactInfo = document.getElementById("contactInfo");
    contactInfo.style.display = contactInfo.style.display === "block" ? "none" : "block";
}


// Toggle feedback form
function toggleFeedbackForm() {
    document.getElementById("feedbackForm").classList.toggle("active");
}
// Handle form submission and show success message
function handleSubmitFeedback(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');
    
    // Simple validation
    if (!name.value || !email.value || !message.value) {
        const errorDiv = document.createElement('div');
        errorDiv.style.color = '#ff4444';
        errorDiv.style.padding = '10px';
        errorDiv.style.marginBottom = '10px';
        errorDiv.style.background = 'rgba(255,68,68,0.1)';
        errorDiv.style.borderRadius = '5px';
        errorDiv.textContent = currentLanguage === 'ta' ? 'அனைத்து புலங்களையும் நிரப்பவும்' : 'Please fill in all fields';
        
        form.insertBefore(errorDiv, form.firstChild);
        setTimeout(() => errorDiv.remove(), 3000);
        return;
    }

    // Display success message with animation
    const feedbackForm = document.getElementById("feedbackForm");
    feedbackForm.style.opacity = '0';
    
    setTimeout(() => {
        feedbackForm.innerHTML = `
            <div class="feedback-header">
                <h3>${translations[currentLanguage].feedbackTitle}</h3>
            </div>
            <p style="color: var(--success-color); padding: 15px; background: rgba(76,175,80,0.1); border-radius: 5px;">
                ${translations[currentLanguage].feedbackSuccess}
            </p>
        `;
        feedbackForm.style.opacity = '1';
    }, 300);

    // Reset form after 3 seconds and close feedback panel
    setTimeout(() => {
        toggleFeedbackForm();
        form.reset();
    }, 3000);
}


// Attach submit handler to feedback form
document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.querySelector("#feedbackForm form");
    if (feedbackForm) {
        feedbackForm.addEventListener("submit", handleSubmitFeedback);
    }
});



// Language content
const translations = {
    en: {
        homeDecorTitle: "HomeDecor",
        findIdeaTitle: "Find Your Home Decoration Idea",
        roomTypeLabel: "Select Room Type:",
        dimensionLabel: "Select Room Dimensions:",
        getSuggestionBtn: "Get Suggestion",
        feedbackTitle: "Feedback",
        phoneText: "Phone:",
        emailText: "Email:",
        namePlaceholder: "Your Name",
        emailPlaceholder: "Your Email",
        messagePlaceholder: "Your Feedback",
        submitBtn: "Submit",
        resetBtn: "Reset",
        roomOptions: ["Bedroom", "Hall", "Kitchen"],
        defaultDimension: "Choose a dimension",
        defaultRoomType: "Choose a room type",
        noMatchingDesign: "No matching design found for {roomType} with dimensions {dimension}.",
        selectBothError: "⚠ Please select both Room Type and Dimension.",
        feedbackSuccess: "Your feedback has been submitted successfully. Thank you!",
        tooltips: {
            home: "Go to Home",
            contact: "Contact Us",
            feedback: "Give Feedback",
            language: "Change Language"
        }
    },
    ta: {
        homeDecorTitle: "இல்லம் அலங்கரிப்பு",
        findIdeaTitle: "உங்கள் இல்ல அலங்கரிப்பு யோசனையை கண்டறியவும்",
        roomTypeLabel: "அறை வகையை தேர்வு செய்யவும்:",
        dimensionLabel: "அறை அளவுகளை தேர்வு செய்யவும்:",
        getSuggestionBtn: "ஆலோசனை பெறுக",
        feedbackTitle: "கருத்துகள்",
        phoneText: "தொலைபேசி:",
        emailText: "மின்னஞ்சல்:",
        namePlaceholder: "உங்கள் பெயர்",
        emailPlaceholder: "உங்கள் மின்னஞ்சல்",
        messagePlaceholder: "உங்கள் கருத்து",
        submitBtn: "சமர்ப்பிக்கவும்",
        resetBtn: "மீட்டமைக்க",
        roomOptions: ["படுக்கை அறை", "கூடம்", "சமையலறை"],
        defaultDimension: "அளவைத் தேர்ந்தெடுக்கவும்",
        defaultRoomType: "அறை வகையைத் தேர்ந்தெடுக்கவும்",
        noMatchingDesign: "{roomType} மற்றும் {dimension} அளவுகளுக்கான வடிவமைப்பு கிடைக்கவில்லை.",
        selectBothError: "⚠ அறை வகை மற்றும் அளவு இரண்டையும் தேர்ந்தெடுக்கவும்.",
        feedbackSuccess: "உங்கள் கருத்து வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது. நன்றி!",
        tooltips: {
            home: "முகப்புக்குச் செல்க",
            contact: "தொடர்பு கொள்ளவும்",
            feedback: "கருத்து தெரிவிக்கவும்",
            language: "மொழியை மாற்றவும்"
        }
    }
};
// Function to switch languages
function toggleLanguage() {
    currentLanguage = (currentLanguage === 'en') ? 'ta' : 'en';
    decorDetails = updateDecorDetails(); // Update decorDetails when language changes

    // Update static text elements
    const elementsToUpdate = {
        'homeDecorTitle': 'textContent',
        'findIdeaTitle': 'textContent',
        'roomTypeLabel': 'textContent',
        'dimensionLabel': 'textContent',
        'getSuggestionBtn': 'textContent',
        'feedbackTitle': 'textContent',
        'phoneText': 'textContent',
        'emailText': 'textContent',
        'resetBtn': 'textContent'
    };

    for (const [id, property] of Object.entries(elementsToUpdate)) {
        const element = document.getElementById(id);
        if (element) {
            element[property] = translations[currentLanguage][id];
        }
    }

    // Update tooltips
    const tooltipElements = {
        'fa-home': 'home',
        'fa-phone': 'contact',
        'fa-comment-dots': 'feedback',
        'fa-language': 'language'
    };

    for (const [iconClass, tooltipKey] of Object.entries(tooltipElements)) {
        const icon = document.querySelector(`.${iconClass}`);
        if (icon) {
            icon.title = translations[currentLanguage].tooltips[tooltipKey];
        }
    }

    // Update room type dropdown
    populateRoomTypeOptions();

    // Update dimension dropdown
    const dimensionSelect = document.getElementById("dimension");
    if (dimensionSelect) {
        const firstOption = dimensionSelect.querySelector('option');
        if (firstOption) {
            firstOption.textContent = translations[currentLanguage].defaultDimension;
        }
    }

    // Update form placeholders if they exist
    const placeholders = {
        'name': 'namePlaceholder',
        'email': 'emailPlaceholder',
        'message': 'messagePlaceholder'
    };

    for (const [id, key] of Object.entries(placeholders)) {
        const element = document.getElementById(id);
        if (element) {
            element.placeholder = translations[currentLanguage][key];
        }
    }

    // Refresh any existing content
    const resultDiv = document.getElementById("result");
    if (resultDiv && resultDiv.innerHTML !== '') {
        findDecoration(); // Re-render the result in new language
    }
}
    
// Initialize translations on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set initial language
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });

    // Initialize placeholders
    const placeholders = {
        'name': 'namePlaceholder',
        'email': 'emailPlaceholder',
        'message': 'messagePlaceholder'
    };

    for (const [id, key] of Object.entries(placeholders)) {
        const element = document.getElementById(id);
        if (element) {
            element.placeholder = translations[currentLanguage][key];
        }
    }

    // Initialize room type dropdown
    populateRoomTypeOptions();
});

// Function to populate room type options
function populateRoomTypeOptions() {
    const roomTypeSelect = document.getElementById("roomType");
    if (roomTypeSelect) {
        roomTypeSelect.innerHTML = '';
        
        // Add default option
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = translations[currentLanguage].defaultRoomType;
        defaultOption.disabled = true;
        defaultOption.selected = true;
        roomTypeSelect.appendChild(defaultOption);

        // Add room options
        translations[currentLanguage].roomOptions.forEach((room, index) => {
            const option = document.createElement("option");
            option.value = translations['en'].roomOptions[index];
            option.textContent = room;
            roomTypeSelect.appendChild(option);
        });
    }
}
