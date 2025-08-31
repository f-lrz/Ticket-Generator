document.addEventListener('DOMContentLoaded', () => {
    const name = sessionStorage.getItem('ticketName');
    const email = sessionStorage.getItem('ticketEmail');
    const github = sessionStorage.getItem('ticketGithub');
    const avatarDataUrl = sessionStorage.getItem('ticketAvatar');

    if (!name || !email || !github || !avatarDataUrl) {
        alert("Dados do ingresso não encontrados. Por favor, preencha o formulário.");
        window.location.href = 'index.html';
        return;
    }

    // Preenche os dados na página
    document.getElementById('ticketName').textContent = name;
    document.getElementById('headerEmail').textContent = email;
    document.getElementById('ticketAvatar').src = avatarDataUrl;
    document.getElementById('ticketUserName').textContent = name;
    document.getElementById('ticketGithubHandle').textContent = github;
});