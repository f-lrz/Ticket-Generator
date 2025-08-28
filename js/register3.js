// Arquivo: register-error-alert.js
document.addEventListener('DOMContentLoaded', () => {
    // ... (todo o código de setup e funções showPreview/clearPreview é o mesmo) ...
    const form = document.getElementById("ticketForm");
    const avatarInput = document.getElementById("avatar");
    const uploadPrompt = document.querySelector(".upload-prompt");
    const uploadPreview = document.querySelector(".upload-preview");
    const avatarPreviewImg = document.getElementById("avatarPreview");
    const removeImageBtn = document.getElementById("removeImageBtn");
    const changeImageBtn = document.getElementById("changeImageBtn");
    let avatarDataUrl = null;
    function showPreview(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            avatarDataUrl = e.target.result;
            avatarPreviewImg.src = avatarDataUrl;
            uploadPrompt.classList.add("hidden");
            uploadPreview.classList.remove("hidden");
        };
        reader.readAsDataURL(file);
    }
    function clearPreview() {
        avatarInput.value = "";
        avatarDataUrl = null;
        avatarPreviewImg.src = "#";
        uploadPrompt.classList.remove("hidden");
        uploadPreview.classList.add("hidden");
    }
    avatarInput.addEventListener("change", () => {
        if (avatarInput.files.length > 0) {
            const file = avatarInput.files[0];
            const maxSize = 500 * 1024;
            if (file.size > maxSize) {
                alert("Invalid size of file (max: 500KB)."); // <-- MUDANÇA AQUI
                clearPreview();
                return;
            }
            showPreview(file);
        }
    });
    removeImageBtn.addEventListener("click", clearPreview);
    changeImageBtn.addEventListener("click", () => avatarInput.click());

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        let isValid = true;

        // Valida campos de texto
        ['name', 'email', 'github'].forEach(id => {
            const input = document.getElementById(id);
            if (!isValid) return; // Se um erro já foi mostrado, para de checar
            
            if (!input.value.trim()) {
                alert(`Field "${id}" is required.`); // <-- MUDANÇA AQUI
                isValid = false;
            } else if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
                alert('Invalid email.'); // <-- MUDANÇA AQUI
                isValid = false;
            }
        });

        if (!isValid) return;

        // Valida Avatar
        if (!avatarDataUrl) {
            alert("Avatar is a required field."); // <-- MUDANÇA AQUI
            isValid = false;
        }

        if (isValid) {
            sessionStorage.setItem('ticketName', document.getElementById('name').value);
            sessionStorage.setItem('ticketEmail', document.getElementById('email').value);
            sessionStorage.setItem('ticketGithub', document.getElementById('github').value);
            sessionStorage.setItem('ticketAvatar', avatarDataUrl);
            window.location.href = '/ticket_page/index.html';
        }
    });
});