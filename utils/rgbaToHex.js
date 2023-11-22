export const rgbaToHex = (r, g, b, a) =>{
    // Helper function to convert a single channel to a hex string
    const toHex = (channel) => {
        const hex = channel.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    // Convert each channel to hex and concatenate them
    const hexR = toHex(r);
    const hexG = toHex(g);
    const hexB = toHex(b);

    // If the alpha is 1 (fully opaque), we do not need to include it in the hex code
    if (a === undefined || a === 1) {
        return `#${hexR}${hexG}${hexB}`;
    }

    // If alpha is provided and not fully opaque, convert it to hex as well
    const hexA = toHex(Math.round(a * 255));

    return `#${hexR}${hexG}${hexB}${hexA}`;
}