export const rgbaToHsb = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
  
    let max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    let h, s, v = max;
  
    let d = max - min;
    s = max == 0 ? 0 : d / max;
  
    if(max == min){
        h = 0; // achromatic
    }else{
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h *= 60;
        if (h < 0) h += 360;
    }
  
    return {
        h: Math.round(h),
        s: Math.round(s * 100),
        brightness: Math.round((v * 100))
    };
  }
  