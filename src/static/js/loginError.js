document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.querySelector('#usuario').value;
    const senha = document.querySelector('#password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
    });

    const data = await response.json();

    if (data.error) {
        const errorMessage = document.querySelector('#error-message');
        errorMessage.textContent = data.error;
        errorMessage.classList.remove('d-none');
    } else {
        window.location.href = '/home';
    }
});