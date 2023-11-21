export const hexToRgba = (hex, alpha = 1) => {
    let r, g, b;

    // If hex code is in shorthand form (e.g., #FFF)
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) { // Full hex code (e.g., #FFFFFF)
        r = parseInt(hex.substring(1, 3), 16);
        g = parseInt(hex.substring(3, 5), 16);
        b = parseInt(hex.substring(5, 7), 16);
    }

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
