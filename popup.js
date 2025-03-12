document.addEventListener("DOMContentLoaded", () => {
    let nomColorInput = document.getElementById("nomColor");
    let adjColorInput = document.getElementById("adjColor");
    let saveButton = document.getElementById("save");

    // Charger les couleurs existantes
    chrome.storage.sync.get(["nomColor", "adjColor"], (data) => {
        if (data.nomColor) nomColorInput.value = data.nomColor;
        if (data.adjColor) adjColorInput.value = data.adjColor;
    });

    // Sauvegarde des nouvelles couleurs
    saveButton.addEventListener("click", () => {
        let nomColor = nomColorInput.value;
        let adjColor = adjColorInput.value;

        chrome.storage.sync.set({ nomColor, adjColor }, () => {
            alert("Couleurs sauvegardées !");
        });
    });
});
