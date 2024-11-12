const hslToRgb = (h, s, l) => {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return [r, g, b];
};

// Convert RGB to Hex
const rgbToHex = (r, g, b) =>
  "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");

export function generateHexColorPair(username) {
  // Ensure username length is between 1 and 50
  if (username.length < 1 || username.length > 50) {
    throw new Error("Username length must be between 1 and 50 characters.");
  }

  // Generate a hash value from the username
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Generate Hue for background
  const hueBackground = Math.abs(hash) % 360;

  // Generate Hue for foreground (complementary color)
  const hueForeground = (hueBackground + 180) % 360;

  // Define Saturation and Lightness
  const saturationBackground = 50; // 50% saturation for a balanced color
  const lightnessBackground = 80; // 80% lightness for a light background

  const saturationForeground = 50; // 50% saturation for vivid color
  const lightnessForeground = 20; // 20% lightness for a dark foreground

  // Convert HSL to RGB

  // Get RGB values
  const [rBg, gBg, bBg] = hslToRgb(
    hueBackground,
    saturationBackground,
    lightnessBackground
  );
  const [rFg, gFg, bFg] = hslToRgb(
    hueForeground,
    saturationForeground,
    lightnessForeground
  );

  // Convert to Hex
  const backgroundHex = rgbToHex(rBg, gBg, bBg);
  const foregroundHex = rgbToHex(rFg, gFg, bFg);

  return {
    background: backgroundHex,
    foreground: foregroundHex,
  };
}

export function generateHexColor(username) {
  // Ensure username length is between 1 and 50
  if (username.length < 1 || username.length > 50) {
      throw new Error("Username length must be between 1 and 50 characters.");
  }

  // Generate a hash value from the username
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Generate RGB values based on the hash
  const r = (hash >> 16) & 0xFF;
  const g = (hash >> 8) & 0xFF;
  const b = hash & 0xFF;

  // Convert RGB values to a hex color code

  return rgbToHex(r, g, b);
}