export const minifyJS = (code: string, options = {
  mangle: true,
  removeComments: true,
  compress: true
}) => {
  try {
    let minified = code;
    
    // Remove comments if enabled
    if (options.removeComments) {
      minified = minified
        .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1');
    }

    if (options.compress) {
      minified = minified
        // Remove whitespace
        .replace(/\s+/g, ' ')
        // Remove spaces before and after operators
        .replace(/\s*([+\-*/%=<>!&|,{}():;])\s*/g, '$1')
        // Remove unnecessary semicolons
        .replace(/;+/g, ';')
        // Remove empty lines
        .replace(/^\s*[\r\n]/gm, '')
        // Trim
        .trim();
    }

    if (options.mangle) {
      // Basic variable mangling
      const variables = new Set<string>();
      const variableMap = new Map<string, string>();
      let counter = 0;

      // Find all variable declarations
      const varRegex = /\b(?:var|let|const)\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\b/g;
      let match;
      while ((match = varRegex.exec(minified)) !== null) {
        variables.add(match[1]);
      }

      // Create mapping for variables
      variables.forEach(variable => {
        variableMap.set(variable, `_${counter++}`);
      });

      // Replace variables with mangled names
      variableMap.forEach((newName, oldName) => {
        const regex = new RegExp(`\\b${oldName}\\b`, 'g');
        minified = minified.replace(regex, newName);
      });
    }

    return minified;
  } catch (error) {
    throw new Error('Minification failed: ' + (error as Error).message);
  }
}; 