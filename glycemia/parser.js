// Function to parse input data
function parseData(input) {
    const lines = input.trim().split("\n"); // Split each line and remove spaces
    const hours = [];
    const values = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        // Regex to extract hour and value
        const match = line.match(/(\d+h)\s*:\s*([\d,]+)/);
        
        if (match) {
            hours.push(match[1]); // Extract hour
            // Convert value to float (replace comma with dot)
            const value = parseFloat(match[2].replace(",", "."));
            values.push(value);
            console.log(`Line ${i+1}: ${match[1]} = ${value}`);
        } else {
            console.log(`Line ${i+1} not recognized: ${line}`);
        }
    }

    console.log("Hours:", hours);
    console.log("Values:", values);
    return { hours, values };
}
