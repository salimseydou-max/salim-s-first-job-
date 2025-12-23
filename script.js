const factCard = document.getElementById('fact-card');
const getFactBtn = document.getElementById('get-fact-btn');
const messageDiv = document.getElementById('message');
const FACT_API_URL = 'https://catfact.ninja/fact';

function showMessage(msg, isError = false) {
    messageDiv.textContent = msg;
    messageDiv.style.color = isError ? '#d44874' : '#a97eda';
}

function setLoading(isLoading) {
    getFactBtn.disabled = isLoading;
    showMessage(isLoading ? 'Loading cat fact...' : '');
}

async function fetchCatFact() {
    setLoading(true);
    factCard.textContent = '...';
    try {
        const res = await fetch(FACT_API_URL);
        if (!res.ok) throw new Error('Server error');
        const data = await res.json();
        if (!data.fact) throw new Error('No fact received!');
        factCard.textContent = data.fact;
        showMessage('');
    } catch(err) {
        factCard.textContent = 'No cat fact available.';
        showMessage("Oops! Couldn’t fetch a fact. Try again!", true);
    } finally {
        setLoading(false);
    }
}

getFactBtn.addEventListener('click', fetchCatFact);

