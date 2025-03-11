// Function to detect browser language
function detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0]; // Get just the language code part
    
    // Check if we support this language
    if (translations[langCode]) {
        return langCode;
    }
    
    // Default to English if language not supported
    return 'en';
}

// Function to change the interface language
function changeLanguage(langCode) {
    // Default to English if the language is not supported
    const lang = translations[langCode] ? langCode : 'en';
    
    // Update the language selector
    document.getElementById('language-selector').value = lang;
    
    // Update text elements
    document.getElementById('main-title').textContent = translations[lang].mainTitle;
    document.getElementById('data-title').textContent = translations[lang].dataTitle;
    document.getElementById('min-threshold-label').textContent = translations[lang].minThresholdLabel;
    document.getElementById('max-threshold-label').textContent = translations[lang].maxThresholdLabel;
    document.getElementById('generate-button').textContent = translations[lang].generateButton;
    document.getElementById('data-input').placeholder = translations[lang].placeholder;
    
    // Store the selected language
    localStorage.setItem('preferredLanguage', lang);
    
    // If chart exists, update its labels
    if (window.glycemiaChart instanceof Chart) {
        updateChartLabels(lang);
    }
}

// Function to update chart labels when language changes
function updateChartLabels(lang) {
    window.glycemiaChart.options.plugins.title.text = translations[lang].chartTitle;
    window.glycemiaChart.data.datasets[0].label = translations[lang].glycemiaLabel;
    window.glycemiaChart.data.datasets[1].label = translations[lang].minThresholdLabel;
    window.glycemiaChart.data.datasets[2].label = translations[lang].maxThresholdLabel;
    window.glycemiaChart.options.scales.y.title.text = translations[lang].glycemiaLabel;
    window.glycemiaChart.options.scales.x.title.text = translations[lang].hourLabel;
    window.glycemiaChart.update();
}

// Initialize language selector
function initializeCustomDropdown() {
    const translations = {
        'en': { countryCode: 'gb', nativeName: 'English' },
        'fr': { countryCode: 'fr', nativeName: 'Français' },
        'es': { countryCode: 'es', nativeName: 'Español' },
        'de': { countryCode: 'de', nativeName: 'Deutsch' }
        // Add more languages as needed...
    };

    const button = document.getElementById('dropdown-button');
    const menu = document.getElementById('dropdown-menu');

    // Populate the dropdown menu
    for (const lang in translations) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="flag-icon flag-icon-${translations[lang].countryCode}"></span>
            ${translations[lang].nativeName}
        `;
        li.dataset.lang = lang; // Store the language code in a data attribute
        menu.appendChild(li);
        
        // Add click event listener to each option
        li.addEventListener('click', () => {
            changeLanguage(lang); // Call your existing changeLanguage function
            button.innerHTML = li.innerHTML; // Update button text to selected language
            menu.style.display = 'none'; // Close the dropdown
        });
    }

    // Toggle dropdown visibility on button click
    button.addEventListener('click', () => {
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });

    // Close dropdown if clicked outside
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.language-picker')) {
            menu.style.display = 'none';
        }
    });
}

// Initialize the custom dropdown on page load
document.addEventListener('DOMContentLoaded', initializeCustomDropdown);
