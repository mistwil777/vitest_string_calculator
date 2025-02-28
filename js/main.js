// export function add(numbersStr) {
//     if (numbersStr === '') {
//         return 0
//     }
//     if (numbersStr === '1') {
//         return 1;
//     }
//     if (numbersStr === '1,2') {
//         return 3;
//     }
// }

//Refacto
// export function add(numbersStr) {
//     if (numbersStr === '') {
//         return 0;
//     }

//     const numbers = numbersStr.split(',').map(Number); // Convertit la chaîne en tableau de nombres
//     return numbers.reduce((sum, num) => sum + num, 0); // Calcule la somme des nombres
// }

// export function add(numbersStr) {
//     if (numbersStr === '') {
//         return 0;
//     }

//     if (/,\n|\n,/.test(numbersStr)) {
//         throw new Error('Invalid input format');
//     }

//     const normalizedStr = numbersStr.replace(/\n/g, ',');
//     const numbers = normalizedStr.split(',').map(Number);

//     return numbers.reduce((sum, num) => sum + num, 0);
// }

// export function add(numbersStr) {
//     if (numbersStr === '') {
//         return 0;
//     }

//     let delimiter = ','; // Délimiteur par défaut
//     if (numbersStr.startsWith('//')) {
//         delimiter = numbersStr[2]; // Le délimiteur est le troisième caractère
//         numbersStr = numbersStr.slice(4); // Supprime "//<delimiter>\n" du début de la chaîne
//     }

//     // Remplace les retours à la ligne par le délimiteur
//     numbersStr = numbersStr.replace(/\n/g, delimiter);

//     // Divise la chaîne en nombres et calcule la somme
//     const numbers = numbersStr.split(delimiter).map(Number);
//     return numbers.reduce((sum, num) => sum + num, 0);
// }

// export function add(numbersStr) {
//     if (numbersStr === '') {
//         return 0;
//     }

//     let delimiter = ','; // Délimiteur par défaut
//     if (numbersStr.startsWith('//')) {
//         delimiter = numbersStr[2]; // Le délimiteur est le troisième caractère
//         numbersStr = numbersStr.slice(4); // Supprime "//<delimiter>\n"
//     }

//     // Remplace les retours à la ligne par le délimiteur
//     numbersStr = numbersStr.replace(/\n/g, delimiter);

//     // Divise la chaîne en nombres
//     const numbers = numbersStr.split(delimiter).map(Number);

//     // Vérifie si des nombres négatifs sont présents
//     const negatives = numbers.filter(num => num < 0);
//     if (negatives.length > 0) {
//         throw new Error(`Negatives not allowed. [${negatives.join(', ')}]`);
//     }

//     // Calcule la somme des nombres
//     return numbers.reduce((sum, num) => sum + num, 0);
// }

export function add(numbersStr) {
    if (numbersStr === '') {
        return 0;
    }

    
    let delimiters = [',', '\n']; // Délimiteurs par défaut

    // Vérifie si un ou plusieurs délimiteurs personnalisés sont définis
    if (numbersStr.startsWith('//')) {
        const delimiterEndIndex = numbersStr.indexOf('\n');
        const delimiterSection = numbersStr.substring(2, delimiterEndIndex);

        if (delimiterSection.startsWith('[')) {
            // Plusieurs délimiteurs ou délimiteurs multi-caractères
            delimiters = delimiterSection
                .match(/\[([^\]]+)\]/g) // Trouve tous les délimiteurs entre crochets
                .map(d => d.slice(1, -1)); // Retire les crochets autour de chaque délimiteur
        } else {
            // Un seul délimiteur simple
            delimiters = [delimiterSection];
        }

        numbersStr = numbersStr.slice(delimiterEndIndex + 1); // Supprime la section des délimiteurs
    }

    // Crée une expression régulière pour diviser avec tous les délimiteurs
    const delimiterRegex = new RegExp(delimiters.map(d => escapeRegExp(d)).join('|'));

    // Divise la chaîne en nombres
    const numbers = numbersStr.split(delimiterRegex).map(Number);

    // Vérifie si des nombres négatifs sont présents
    const negatives = numbers.filter(num => num < 0);
    if (negatives.length > 0) {
        throw new Error(`Negatives not allowed. [${negatives.join(', ')}]`);
    }

    // Ignore les nombres supérieurs à 1000 et calcule la somme
    return numbers.filter(num => num <= 1000).reduce((sum, num) => sum + num, 0);
}

// Fonction utilitaire pour échapper les caractères spéciaux dans une expression régulière
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}