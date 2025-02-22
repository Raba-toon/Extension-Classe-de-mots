document.getElementById("save").addEventListener("click", () => {
    const nomColor = document.getElementById("nomColor").value;
    const adjColor = document.getElementById("adjColor").value;

    chrome.storage.sync.set({ nomColor, adjColor }, () => {
        alert("Couleurs enregistrées !");
    });
});