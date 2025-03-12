chrome.storage.sync.get(["nomColor", "adjColor"], (data) => {
    let nomColor = data.nomColor || "#ff0000";  // Rouge par défaut
    let adjColor = data.adjColor || "#0000ff";  // Bleu par défaut
    let verbeColor = data.verbeColor || "#00ff00";  // Vert par défaut

    // Fonction pour convertir une couleur hexadécimale en RGB
    function hexToRgb(hex) {
        let r = 0, g = 0, b = 0;
        if (hex.length == 7) {
            r = parseInt(hex[1] + hex[2], 16);
            g = parseInt(hex[3] + hex[4], 16);
            b = parseInt(hex[5] + hex[6], 16);
        }
        return `rgb(${r}, ${g}, ${b})`;
    }

    // Fonction pour calculer la luminance d'une couleur
    function getLuminance(color) {
        let rgb = color.match(/\d+/g); //Permet de récuperer [ 000, 000, 000 ]
        if (rgb) {
            rgb = rgb.map(val => { //Map sert à tout transformer en tableau (pour 000, 120, 44)
                val = val / 255;
                return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
            });
            return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
        }
        return 0; // Si la couleur n'est pas valide
    }

    function colorizeText(node) {
        if (node.nodeType === 3 && node.nodeValue.trim() !== "") { // Si c'est du texte
            let words = node.nodeValue.split(/\b/); // Séparation en mots
            let fragment = document.createDocumentFragment();
            let luminanceNom = getLuminance(hexToRgb(nomColor));
            let luminanceAdj = getLuminance(hexToRgb(adjColor));
            let luminanceVerbe = getLuminance(hexToRgb(verbeColor));

            words.forEach(word => {
                let span = document.createElement("span");
                span.textContent = word;

                if (/\b(chat|chien|voiture)\b/i.test(word)) { // Mots spécifiques (à remplacer par l'IA)
                    span.style.backgroundColor = nomColor;
                    span.style.padding = "2px";  // Ajoute un peu d'espace pour le visuel
                    span.style.borderRadius = "3px";
                    
                    if (luminanceNom < 0.5) {
                        span.style.color = "white";
                    } else {
                        span.style.color = "black"; // Sinon texte noir
                    }

                } else if (/\b(beau|grande|intéressant)\b/i.test(word)) {
                    span.style.backgroundColor = adjColor;
                    span.style.padding = "2px";  // Ajoute un peu d'espace pour le visuel
                    span.style.borderRadius = "3px";

                    if (luminanceAdj < 0.5) {
                        span.style.color = "white";
                    } else {
                        span.style.color = "black"; // Sinon texte noir
                    }
                } else if (/\b(aime|joue|marche)\b/i.test(word)) {
                    span.style.backgroundColor = verbeColor;
                    span.style.padding = "2px";  // Ajoute un peu d'espace pour le visuel
                    span.style.borderRadius = "3px";

                    if (luminanceVerbe < 0.5) {
                        span.style.color = "white";
                    } else {
                        span.style.color = "black"; // Sinon texte noir
                    }
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