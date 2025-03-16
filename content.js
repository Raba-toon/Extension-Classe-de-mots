chrome.storage.sync.get(["nomColor", "adjColor", "verbeColor", "enableNom", "enableAdj", "enableVerbe"], (data) => {
    let nomColor = data.nomColor || "#ff0000";  // Rouge par défaut
    let adjColor = data.adjColor || "#0000ff";  // Bleu par défaut
    let verbeColor = data.verbeColor || "#00ff00";  // Vert par défaut

    let enableNom = data.enableNom;
    let enableAdj = data.enableAdj;
    let enableVerbe = data.enableVerbe;

    // Fonction pour convertir une couleur hexadécimale en RGB
    function hexToRgb(hex) {
        let r = parseInt(hex.substring(1, 3), 16);
        let g = parseInt(hex.substring(3, 5), 16);
        let b = parseInt(hex.substring(5, 7), 16);
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

    function createColoredSpan(word, color) {
        let span = document.createElement("span");
        span.textContent = word;
        span.style.backgroundColor = color;
        span.style.padding = "2px";
        span.style.borderRadius = "3px";
        span.style.color = getLuminance(hexToRgb(color)) < 0.5 ? "white" : "black";
        return span;
    }

    function processTextNode(node) {
        if (node.nodeType !== 3 || !node.nodeValue.trim()) return;

        let words = node.nodeValue.split(/(\s+)/); // Sépare en conservant les espaces
        let fragment = document.createDocumentFragment();
        let modified = false;

        words.forEach(word => {
            let trimmedWord = word.trim(); // On supprime les espaces
            trimmedWord = word.replace(/[.,!?;:()«»"']/g, ""); // Supprime la ponctuation

            if (/^(chat|chien|voiture)$/i.test(trimmedWord) && enableNom) {
                fragment.appendChild(createColoredSpan(word, nomColor));
                modified = true;
            } else if (/^(beau|grande|intéressant)$/i.test(trimmedWord) && enableAdj) {
                fragment.appendChild(createColoredSpan(word, adjColor));
                modified = true;
            } else if (/^(aime|joue|marche)$/i.test(trimmedWord) && enableVerbe) {
                fragment.appendChild(createColoredSpan(word, verbeColor));
                modified = true;
            } else {
                fragment.appendChild(document.createTextNode(word)); // On garde le mot original sans le modifier
            }
        });

        if (modified) {
            node.replaceWith(fragment);
        }
    }

    // Fonction pour parcourir tous les nœuds du DOM
    function scanTextNodes(node) {
        if (!node || node.nodeType !== 1) return; // Si le nœud n'est pas un élément, on l'ignore
        node.childNodes.forEach(child => { // Parcourt les enfants du nœud et traite chaque nœud de texte
            if (child.nodeType === 3) {
                processTextNode(child);
            } else {
                scanTextNodes(child);
            }
        });
    }

    scanTextNodes(document.body);
});
