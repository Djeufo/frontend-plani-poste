// profile.js

// Map the field keys to display labels and the element IDs where values are shown
const fields = {
  username: {
    label: "Username",
    displayId: "usernameDisplay",
  },
  name: {
    label: "Name",
    displayId: "nameDisplay",
  },
};

let currentFieldKey = null;

function openEditModal(fieldKey) {
  currentFieldKey = fieldKey;
  const field = fields[fieldKey];
  if (!field) return;

  // Set modal title and label
  document.getElementById("modalTitle").textContent = `Edit ${field.label}`;
  document.getElementById("modalLabel").textContent = field.label;

  // Set input value to current field value
  const currentValue = document.getElementById(field.displayId).textContent;
  const input = document.getElementById("modalInput");
  input.value = currentValue;

  // Show the modal
  document.getElementById("editModal").style.display = "block";

  // Focus input
  input.focus();
}

function closeEditModal() {
  document.getElementById("editModal").style.display = "none";
  currentFieldKey = null;
}

function submitEdit() {
  if (!currentFieldKey) return;

  const input = document.getElementById("modalInput");
  const newValue = input.value.trim();
  if (newValue === "") {
    alert("Value cannot be empty.");
    return;
  }

  // Update the display span with new value
  const field = fields[currentFieldKey];
  document.getElementById(field.displayId).textContent = newValue;

  // Close edit modal
  closeEditModal();

  // Show success modal
  showSuccessModal(`${field.label} updated successfully.`);
}

function showSuccessModal(message) {
  const successModal = document.getElementById("successModal");
  document.getElementById("successMessage").textContent = message;
  successModal.style.display = "block";

  // Automatically hide success modal after 2 seconds
  setTimeout(() => {
    closeSuccessModal();
  }, 2000);
}

function closeSuccessModal() {
  document.getElementById("successModal").style.display = "none";
}

// Optional: Close modals if clicking outside modal content
window.onclick = function (event) {
  const editModal = document.getElementById("editModal");
  const successModal = document.getElementById("successModal");

  if (event.target === editModal) {
    closeEditModal();
  }
  if (event.target === successModal) {
    closeSuccessModal();
  }
};
