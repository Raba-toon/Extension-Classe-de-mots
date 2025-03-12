document.addEventListener("DOMContentLoaded", () => {
    let nomColorInput = document.getElementById("nomColor");
    let adjColorInput = document.getElementById("adjColor");
    let verbeColorInput = document.getElementById("verbeColor");
    let saveButton = document.getElementById("save");

    // Charger les couleurs existantes
    chrome.storage.sync.get(["nomColor", "adjColor"], (data) => {
        if (data.nomColor) nomColorInput.value = data.nomColor;
        if (data.adjColor) adjColorInput.value = data.adjColor;
        if (data.verbeColor) adjColorInput.value = data.verbeColor;
    });

    // Sauvegarde des nouvelles couleurs
    saveButton.addEventListener("click", () => {
        let nomColor = nomColorInput.value;
        let adjColor = adjColorInput.value;
        let verbeColor = verbeColorInput.value;

        chrome.storage.sync.set({ nomColor, adjColor, verbeColor }, () => {
            window.close();
        });
    });
});
