export const hsbToRgba = (hsbArray) => {
    const [h, s, brightness, a] = hsbArray.map((value, index) => 
        index < 3 ? value / 100 : value // Dividing first three values by 100, keeping alpha as is
    );

    let r, g, b;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = brightness * (1 - s);
    const q = brightness * (1 - f * s);
    const t = brightness * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0: r = brightness, g = t, b = p; break;
        case 1: r = q, g = brightness, b = p; break;
        case 2: r = p, g = brightness, b = t; break;
        case 3: r = p, g = q, b = brightness; break;
        case 4: r = t, g = p, b = brightness; break;
        case 5: r = brightness, g = p, b = q; break;
        default: break;
    }

    const to255 = val => Math.round(val * 255);
    return `rgba(${to255(r)}, ${to255(g)}, ${to255(b)}, ${a})`;
}
