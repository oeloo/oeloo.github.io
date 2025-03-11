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

function initializeLanguageSelector() {
    const selector = document.getElementById('language-selector');
    
    // Clear existing options
    selector.innerHTML = '';
    
    // Populate language options dynamically
    for (const lang in translations) {
        const option = document.createElement('option');
        
        // Set the value and display text for each option
        option.value = lang;
        option.textContent = `${translations[lang].nativeName}`;
        
        selector.appendChild(option);
    }
    
    // Check for saved language preference
    let preferredLang = localStorage.getItem('preferredLanguage');
    
    // If no saved preference, detect browser language
    if (!preferredLang) {
        preferredLang = detectBrowserLanguage();
    }
    
    // Set the interface language
    changeLanguage(preferredLang);
}
// Initialize the custom dropdown on page load
document.addEventListener('DOMContentLoaded', initializeLanguageSelector);
