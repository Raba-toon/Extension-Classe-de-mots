chrome.storage.sync.get(["nomColor", "adjColor"], (data) => {
    let nomColor = data.nomColor || "#ff0000";  // Rouge par défaut
    let adjColor = data.adjColor || "#0000ff";  // Bleu par défaut

    function colorizeText(node) {
        if (node.nodeType === 3 && node.nodeValue.trim() !== "") { // Si c'est du texte
            let words = node.nodeValue.split(/\b/); // Séparation en mots
            let fragment = document.createDocumentFragment();

            words.forEach(word => {
                let span = document.createElement("span");
                span.textContent = word;

                if (/\b(chat|chien|voiture)\b/i.test(word)) { // Mots spécifiques (à remplacer par l'IA)
                    span.style.color = nomColor;
                } else if (/\b(beau|grande|intéressant)\b/i.test(word)) {
                    span.style.color = adjColor;
                }

                fragment.appendChild(span);
            });

            node.replaceWith(fragment);
        } else {
            node.childNodes.forEach(colorizeText);
        }
    }

    document.body.childNodes.forEach(colorizeText);
});
