document.addEventListener("DOMContentLoaded", () => {
    let nomColorInput = document.getElementById("nomColor");
    let adjColorInput = document.getElementById("adjColor");
    let verbeColorInput = document.getElementById("verbeColor");
    let saveButton = document.getElementById("save");

    let enableNom = document.getElementById("enableNom");
    let enableAdj = document.getElementById("enableAdj");
    let enableVerbe = document.getElementById("enableVerbe");

    // Charger les couleurs existantes
    chrome.storage.sync.get(["nomColor", "adjColor", "verbeColor", "enableNom", "enableAdj", "enableVerbe"], (data) => {
        if (data.nomColor) nomColorInput.value = data.nomColor;
        if (data.adjColor) adjColorInput.value = data.adjColor;
        if (data.verbeColor) verbeColorInput.value = data.verbeColor;

    });

    // Sauvegarde des nouvelles couleurs
    saveButton.addEventListener("click", () => {
        let nomColor = nomColorInput.value;
        let adjColor = adjColorInput.value;
        let verbeColor = verbeColorInput.value;
        let enableNomValue = enableNom.checked;
        let enableAdjValue = enableAdj.checked;
        let enableVerbeValue = enableVerbe.checked;

        chrome.storage.sync.set({ nomColor, adjColor, verbeColor, enableNomValue, enableAdjValue, enableVerbeValue }, () => {
            window.close();
        });
    });
    
});
