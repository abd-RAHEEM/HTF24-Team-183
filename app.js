// Load country and sport data
let countries = [];
let sports = [];

// Fetch data from JSON files
async function fetchData() {
    try {
        const countryResponse = await fetch('countries.json');
        countries = await countryResponse.json();

        const sportsResponse = await fetch('sports.json');
        sports = await sportsResponse.json();
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

window.onload = fetchData;

// Function to suggest countries
function suggestCountries() {
    const input = document.getElementById('country').value.toLowerCase();
    const suggestions = countries.filter(country => country.toLowerCase().includes(input));
    displaySuggestions(suggestions, 'countrySuggestions');
}

// Function to suggest sports
function suggestSports() {
    const input = document.getElementById('sport').value.toLowerCase();
    const suggestions = sports.filter(sport => sport.toLowerCase().includes(input));
    displaySuggestions(suggestions, 'sportSuggestions');
}

// Function to display suggestions in dropdown
function displaySuggestions(suggestions, elementId) {
    const suggestionBox = document.getElementById(elementId);
    suggestionBox.innerHTML = ''; // Clear previous suggestions

    suggestions.forEach(suggestion => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.textContent = suggestion;
        item.onclick = () => selectSuggestion(suggestion, elementId);
        suggestionBox.appendChild(item);
    });
}

// Function to handle suggestion selection
function selectSuggestion(suggestion, elementId) {
    document.getElementById(elementId.replace('Suggestions', '')).value = suggestion;
    document.getElementById(elementId).innerHTML = ''; // Clear suggestions
}

// Event listener for the registration form submission
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const country = document.getElementById('country').value;
    const sport = document.getElementById('sport').value;

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, country, sport }),
        });

        if (response.ok) {
            window.location.href = 'index.html'; // Redirect on success
        } else {
            const result = await response.json();
            alert(result.message);
        }
    } catch (error) {
        console.error('Error during registration:', error);
    }
});

// Event listener for the login form submission
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            window.location.href = 'index.html'; // Redirect on success
        } else {
            const result = await response.json();
            alert(result.message);
        }
    } catch (error) {
        console.error('Error logging in:', error);
    }
});
