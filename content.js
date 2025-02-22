chrome.storage.sync.get(["nomColor", "adjColor"], (data) => {
    let nomColor = data.nomColor || "#ff0000";  // Rouge par défaut
    let adjColor = data.adjColor || "#0000ff";  // Bleu par défaut

    function colorizeText(node) {
        if (node.nodeType === 3) { // Si c'est du texte
            let words = node.nodeValue.split(" ");
            let newHTML = words.map(word => {
                if (word.match(/(chat|chien|voiture)/i)) { // Remplace ça par ton IA plus tard !
                    return `<span style="color:${nomColor};">${word}</span>`;
                }
                if (word.match(/(beau|grande|intéressant)/i)) {
                    return `<span style="color:${adjColor};">${word}</span>`;
                }
                return word;
            }).join(" ");
            let span = document.createElement("span");
            span.innerHTML = newHTML;
            node.replaceWith(span);
        } else {
            node.childNodes.forEach(colorizeText);
        }
    }

    document.body.childNodes.forEach(colorizeText);
});
