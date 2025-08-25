const form = document.getElementById("ticketForm");
const ticket = document.getElementById("ticket");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  document.getElementById("ticketName").textContent = name;
  document.getElementById("ticketEmail").textContent = email;

  ticket.classList.remove("hidden");
});

// Upload de imagem (apenas feedback simples)
const avatarInput = document.getElementById("avatar");
avatarInput.addEventListener("change", () => {
  if (avatarInput.files.length > 0) {
    alert("📷 Avatar uploaded: " + avatarInput.files[0].name);
  }
});
