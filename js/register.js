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
            }
        });

        //Para validar que a pessoa escreveu apenas o primeiro nome (sem usar regex)
        /*const nameInput = document.getElementById('name');
        const nameError = document.getElementById('nameError');
        const nameValue = nameInput.value.trim(); // .trim() remove espaços no início e fim     

        if (!nameValue) { // Primeiro, checa se está vazio
            nameError.textContent = 'Este campo é obrigatório.';
            nameInput.classList.add('invalid-field');
            isValid = false;
        } else if (nameValue.includes(' ')) { // Checa se existe um espaço no meio do texto
            nameError.textContent = 'Por favor, insira apenas o primeiro nome.';
            nameInput.classList.add('invalid-field');
            isValid = false;
        }*/

        //Para validar que escreveu nome e sobrenome (sem usar regex)
        /*
        const nameInput = document.getElementById('name');
        const nameError = document.getElementById('nameError');
        const nameValue = nameInput.value.trim();
        const nameParts = nameValue.split(' '); // Divide o nome em um array, ex: "Filipe Arraes" -> ["Filipe", "Arraes     "]

        if (!nameValue) {
            nameError.textContent = 'Este campo é obrigatório.';
            nameInput.classList.add('invalid-field');
            isValid = false;
        } else if (nameParts.length < 2 || nameParts[1] === "") { // Checa se tem menos de 2 partes ou se a segunda parte está vazia
            nameError.textContent = 'Por favor, insira nome e sobrenome.';
            nameInput.classList.add('invalid-field');
            isValid = false;
        }*/

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