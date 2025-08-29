// Arquivo: register-github-require-at.js
document.addEventListener('DOMContentLoaded', () => {
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
        const avatarError = document.getElementById("avatarError");
        avatarError.textContent = "";
        avatarInput.parentElement.classList.remove("invalid-field");

        if (avatarInput.files.length > 0) {
            const file = avatarInput.files[0];
            const maxSize = 500 * 1024; // 500KB
            if (file.size > maxSize) {
                avatarError.textContent = "Invalid size of file (max: 500KB).";
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
        
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        document.querySelectorAll('.invalid-field').forEach(el => el.classList.remove('invalid-field'));

        // Valida campos de texto
        ['name', 'email', 'github'].forEach(id => {
            const input = document.getElementById(id);
            const errorEl = document.getElementById(id + 'Error');
            if (!input.value.trim()) {
                errorEl.textContent = 'Required field.';
                input.classList.add('invalid-field');
                isValid = false;
            } else if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
                errorEl.textContent = 'Invalid email.';
                input.classList.add('invalid-field');
                isValid = false;
            } else if (id === 'github' && !input.value.trim().startsWith('@')) { // <------
                errorEl.textContent = 'GitHub username must start with "@".';
                input.classList.add('invalid-field');
                isValid = false;
            }
        });

        // Valida Avatar
        if (!avatarDataUrl) {
            document.getElementById("avatarError").textContent = "Required field.";
            avatarInput.parentElement.classList.add("invalid-field");
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