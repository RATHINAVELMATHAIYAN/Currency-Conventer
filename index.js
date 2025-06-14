// List of available currencies
const currencies = ["INR", "USD", "EUR", "JPY", "BZD"];

/**
 * Iterate all <select> elements with currency options.
 */
function selectList() {
    document.querySelectorAll("select").forEach(select => {
        select.innerHTML = currencies
            .map(val => `<option value="${val}">${val}</option>`)
            .join('');
    });
}

// Initialize currency dropdowns
selectList();

async function convertCurrency(amount, from, to) {
    try {
        // Use environment variable for API key in production
        const API_KEY = '13da463df0d04395cebb3f30'; // Replace with your actual API key
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${from}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return (amount * data.conversion_rates[to]).toFixed(2);

    } catch (error) {
        console.error('Error:', error);
        alert("Conversion failed. Please try again.");
        return "";
    }
}

// Variable to track the rotation angle of the swap icon
let rotationAngle = 0;

async function convert(event) {
    event.preventDefault(); // Prevent form submission from reloading the page

    // Get user inputs
    let amount = document.getElementById("input").value;
    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;
    let output = document.getElementById("output");
    let icon = document.querySelector(".uturn-icon"); // Select the swap button

    // Validate amount
    if (!amount || amount <= 0) {
        alert("Enter a valid amount");
        return;
    }

    // Perform currency conversion
    output.value = await convertCurrency(amount, from, to);

    // Rotate the swap icon for a visual effect
    rotationAngle += 180; // Increment rotation angle
    icon.style.transition = "transform 0.5s ease-in-out"; // Smooth transition
    icon.style.transform = `rotate(${rotationAngle}deg)`; // Apply rotation
}

// Attach event listener to the form for conversion
document.getElementById("currency").addEventListener("submit", convert);