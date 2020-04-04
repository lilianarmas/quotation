// obtiene la diferencia de años
export function getDiffYear(year) {
    return new Date().getFullYear() - year;
}

// calcula el total a pagar segun la marca
export function calculateBrand(brand) {
    let inc;

    switch(brand) {
        case 'europeo':
            inc = 1.30;
            break;
        case 'americano':
            inc = 1.15;
            break;
        case 'asiatico':
            inc = 1.05;
            break
        default:
            break;
    }

    return inc;
}

// Calcula el tipo de seguro
export function getPlan( plan ) {
    return (plan === 'basico') ? 1.20 : 1.50;
}

// Muestra la primer letra mayuscula
export function firstLetterUppercase(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}
