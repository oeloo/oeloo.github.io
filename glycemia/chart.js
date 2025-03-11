// Function to generate the chart
function generateChart() {
    const input = document.getElementById("data-input").value; // Get input data
    
    if (!input.trim()) {
        alert("Please enter data");
        return;
    }
    
    const { hours, values } = parseData(input);

    // Check if valid data was extracted
    if (hours.length === 0 || values.length === 0) {
        alert("No valid data found. Please enter data in the format: '8h : 2,95 g/L'");
        return;
    }

    // Get threshold values from inputs
    const thresholdMinValue = parseFloat(document.getElementById("threshold-min").value);
    const thresholdMaxValue = parseFloat(document.getElementById("threshold-max").value);
    
    // Create arrays with threshold values
    const thresholdMin = Array(hours.length).fill(thresholdMinValue);
    const thresholdMax = Array(hours.length).fill(thresholdMaxValue);

    // Get current language
    const currentLang = localStorage.getItem('preferredLanguage') || 'en';

    // Destroy previous chart if it exists
    if (window.glycemiaChart instanceof Chart) {
        window.glycemiaChart.destroy();
    }

    // Create the chart
    const ctx = document.getElementById("glycemiaChart").getContext("2d");
    window.glycemiaChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: hours,
            datasets: [
                {
                    label: translations[currentLang].glycemiaLabel,
                    data: values,
                    borderColor: "blue",
                    backgroundColor: "rgba(0, 0, 255, 0.1)",
                    fill: false,
                    tension: 0.4,
                    pointStyle: "circle",
                    pointRadius: 5,
                },
                {
                    label: translations[currentLang].minThresholdLabel,
                    data: thresholdMin,
                    borderColor: "orange",
                    borderDash: [5, 5],
                    fill: false,
                    pointRadius: 0,
                },
                {
                    label: translations[currentLang].maxThresholdLabel,
                    data: thresholdMax,
                    borderColor: "red",
                    borderDash: [5, 5],
                    fill: false,
                    pointRadius: 0,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: "top" },
                title: {
                    display: true,
                    text: translations[currentLang].chartTitle
                }
            },
            scales: {
                y: { 
                    beginAtZero: false,
                    min: 0,
                    max: Math.max(...values) + 0.5,
                    title: {
                        display: true,
                        text: translations[currentLang].glycemiaLabel
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: translations[currentLang].hourLabel
                    }
                }
            },
        },
    });
    
    console.log("Chart successfully generated");
}

// Pre-fill with example data when page loads
window.addEventListener('DOMContentLoaded', function() {
    document.getElementById("data-input").value = 
`8h : 2,95 g/L
9h : 2,91 g/L
10h : 1,67 g/L
11h : 1,4 g/L
12h : 1,17 g/L
13h : 0,78 g/L
14h : 0,8 g/L
15h : 2,33 g/L
16h : 2,05 g/L
17h : 2,21 g/L
18h : 2,37 g/L
19h : 2,74 g/L
20h : 2,87 g/L`;
});
