const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  // Add more languages as needed
];

const select = document.getElementById("language-select");

if (select) {
  languages.forEach((lang) => {
    const option = document.createElement("option");
    option.value = lang.code;
    option.textContent = lang.name;
    select.appendChild(option);
  });
}

function changeLanguage(selectElement) {
  const selectedLang = selectElement.value;
  console.log("Language changed to:", selectedLang);
  // Insert your language-switching logic here
}
