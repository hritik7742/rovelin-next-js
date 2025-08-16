export const minifyCSS = (code: string, options = {
  removeComments: true,
  removeWhitespace: true,
  optimizeColors: true
}) => {
  try {
    let minified = code;
    
    // Remove comments if enabled
    if (options.removeComments) {
      minified = minified.replace(/\/\*[\s\S]*?\*\//g, '');
    }

    if (options.removeWhitespace) {
      minified = minified
        // Remove whitespace and newlines
        .replace(/\s*{\s*/g, '{')
        .replace(/\s*}\s*/g, '}')
        .replace(/\s*;\s*/g, ';')
        .replace(/\s*:\s*/g, ':')
        .replace(/\s*,\s*/g, ',')
        .replace(/\s+/g, ' ')
        .trim();
    }

    if (options.optimizeColors) {
      // Convert hex colors to shorter format when possible
      minified = minified.replace(/#([0-9a-fA-F])\1([0-9a-fA-F])\2([0-9a-fA-F])\3/g, '#$1$2$3');
      
      // Convert rgb to hex when shorter
      minified = minified.replace(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g, (match, r, g, b) => {
        const hex = '#' + 
          parseInt(r).toString(16).padStart(2, '0') + 
          parseInt(g).toString(16).padStart(2, '0') + 
          parseInt(b).toString(16).padStart(2, '0');
        return hex.length <= match.length ? hex : match;
      });

      // Remove unnecessary zeros in decimal values
      minified = minified.replace(/(\d)\.0+(?=\D)/g, '$1');
      minified = minified.replace(/0\.(\d+)/g, '.$1');
    }

    // Remove unnecessary semicolons before closing braces
    minified = minified.replace(/;}/g, '}');
    
    // Remove empty rules
    minified = minified.replace(/[^{}]+{\s*}/g, '');
    
    // Remove leading zeros from numbers
    minified = minified.replace(/(\s|:)0+(\.\d+)/g, '$1$2');
    
    return minified;
  } catch (error) {
    throw new Error('CSS minification failed: ' + (error as Error).message);
  }
};