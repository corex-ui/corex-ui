import { Theme, Color, BackgroundColor } from '@adobe/leonardo-contrast-colors';
import fs from 'fs';
import path from 'path';

// -----------------------------
// Flat theme configuration
// -----------------------------
const THEMES_CONFIG = {
'neo-light': {
  backgrounds: [
    {
      name: 'root',
      color: '#EEF0F3',
      lightness: 99,
      contrastColors: [
        { name: '-border', color: '#3C3E40', ratio: 1.15 },
        { name: '-text', color: '#3C3E40', ratio: 6 },
        { name: '-muted', color: '#3C3E40', ratio: 4.6 },
        { name: '-accent', color: '#D8DBDE', ratio: 9 },
        { name: '-brand', color: '#452068', ratio: 6 },
        { name: '-alert', color: '#C94F4F', ratio: 6 },
        { name: '-info', color: '#5A8FBF', ratio: 6 },
        { name: '-success', color: '#4FA37C', ratio: 6 }
      ]
    },
    {
      name: 'layer',
      color: '#EEF0F3',
      lightness: 98,
      contrastColors: [
        { name: '-border', color: '#3C3E40', ratio: 1.15 },
        { name: '-text', color: '#3C3E40', ratio: 6 },
        { name: '-muted', color: '#3C3E40', ratio: 4.6 },
        { name: '-accent', color: '#D8DBDE', ratio: 9 },
        { name: '-brand', color: '#452068', ratio: 6 },
        { name: '-alert', color: '#C94F4F', ratio: 6 },
        { name: '-info', color: '#5A8FBF', ratio: 6 },
        { name: '-success', color: '#4FA37C', ratio: 6 }
      ]
    },
    {
      name: 'ui',
      color: '#EEF0F3',
      lightness: 92,
      ratios: { default: -1.2, hover: -1.1, active: 1 },
      contrastColors: [
        { name: '-border', color: '#3C3E40', ratio: 1.15 },
        { name: '-text', color: '#3C3E40', ratio: 6 },
        { name: '-muted', color: '#3C3E40', ratio: 4.6 }
      ]
    },
    {
      name: 'ui-accent',
      color: '#D8DBDE',
      lightness: 40,
      ratios: { default: -1.2, hover: -1.1, active: 1 },
      contrastColors: [
        { name: '-border', color: '#3C3E40', ratio: 1.5 },
        { name: '-text', color: '#3C3E40', ratio: 6 },
        { name: '-muted', color: '#3C3E40', ratio: 4.6 }
      ]
    },
    {
      name: 'ui-brand',
      color: '#452068',
      lightness: 40,
      ratios: { default: -1.2, hover: -1.1, active: 1 },
      contrastColors: [
        { name: '-border', color: '#3C3E40', ratio: 1.5 },
        { name: '-text', color: '#3C3E40', ratio: 6 },
        { name: '-muted', color: '#3C3E40', ratio: 4.6 }
      ]
    },
    {
      name: 'ui-alert',
      color: '#C94F4F',
      lightness: 40,
      ratios: { default: -1.2, hover: -1.1, active: 1 },
      contrastColors: [
        { name: '-border', color: '#3C3E40', ratio: 1.5 },
        { name: '-text', color: '#3C3E40', ratio: 6 },
        { name: '-muted', color: '#3C3E40', ratio: 4.6 }
      ]
    },
    {
      name: 'ui-info',
      color: '#5A8FBF',
      lightness: 40,
      ratios: { default: -1.2, hover: -1.1, active: 1 },
      contrastColors: [
        { name: '-border', color: '#3C3E40', ratio: 1.5 },
        { name: '-text', color: '#3C3E40', ratio: 6 },
        { name: '-muted', color: '#3C3E40', ratio: 4.6 }
      ]
    },
    {
      name: 'ui-success',
      color: '#4FA37C',
      lightness: 40,
      ratios: { default: -1.2, hover: -1.1, active: 1 },
      contrastColors: [
        { name: '-border', color: '#3C3E40', ratio: 1.5 },
        { name: '-text', color: '#3C3E40', ratio: 6 },
        { name: '-muted', color: '#3C3E40', ratio: 4.6 }
      ]
    }
  ],
  output: 'tokens/multi/themes/neo/light.json',
  indent: 2
},

'neo-dark': {
  backgrounds: [
    {
      name: 'root',
      color: '#EEF0F3',
      lightness: 8,
      contrastColors: [
        { name: '-border', color: '#3C3E40', ratio: 2 },
        { name: '-text', color: '#3C3E40', ratio: 8 },
        { name: '-muted', color: '#3C3E40', ratio: 6 },
        { name: '-accent', color: '#D8DBDE', ratio: 10 },
        { name: '-brand', color: '#452068', ratio: 10 },
        { name: '-alert', color: '#C94F4F', ratio: 10 },
        { name: '-info', color: '#5A8FBF', ratio: 10 },
        { name: '-success', color: '#4FA37C', ratio: 10 }
      ]
    },
    {
      name: 'layer',
      color: '#EEF0F3',
      lightness: 15,
      contrastColors: [
        { name: '-border', color: '#3C3E40', ratio: 2 },
        { name: '-text', color: '#3C3E40', ratio: 8 },
        { name: '-muted', color: '#3C3E40', ratio: 6 },
        { name: '-accent', color: '#D8DBDE', ratio: 10 },
        { name: '-brand', color: '#452068', ratio: 10 },
        { name: '-alert', color: '#C94F4F', ratio: 10 },
        { name: '-info', color: '#5A8FBF', ratio: 10 },
        { name: '-success', color: '#4FA37C', ratio: 10 }
      ]
    },
    {
      name: 'ui',
      color: '#EEF0F3',
      lightness: 20,
      ratios: { default: -1.2, hover: -1.1, active: 1 },
      contrastColors: [
        { name: '-border', color: '#3C3E40', ratio: 1.5 },
        { name: '-text', color: '#3C3E40', ratio: 6 },
        { name: '-muted', color: '#3C3E40', ratio: 4.6 }
      ]
    },
    {
      name: 'ui-accent',
      color: '#D8DBDE',
      lightness: 70,
      ratios: { default: -1.2, hover: -1.1, active: 1 },
      contrastColors: [
        { name: '-border', color: '#3C3E40', ratio: 1.5 },
        { name: '-text', color: '#3C3E40', ratio: 6 },
        { name: '-muted', color: '#3C3E40', ratio: 4.6 }
      ]
    },
    {
      name: 'ui-brand',
      color: '#452068',
      lightness: 70,
      ratios: { default: -1.2, hover: -1.1, active: 1 },
      contrastColors: [
        { name: '-border', color: '#3C3E40', ratio: 1.5 },
        { name: '-text', color: '#3C3E40', ratio: 6 },
        { name: '-muted', color: '#3C3E40', ratio: 4.6 }
      ]
    },
    {
      name: 'ui-alert',
      color: '#C94F4F',
      lightness: 70,
      ratios: { default: -1.2, hover: -1.1, active: 1 },
      contrastColors: [
        { name: '-border', color: '#3C3E40', ratio: 1.5 },
        { name: '-text', color: '#3C3E40', ratio: 6 },
        { name: '-muted', color: '#3C3E40', ratio: 4.6 }
      ]
    },
    {
      name: 'ui-info',
      color: '#5A8FBF',
      lightness: 70,
      ratios: { default: -1.2, hover: -1.1, active: 1 },
      contrastColors: [
        { name: '-border', color: '#3C3E40', ratio: 1.5 },
        { name: '-text', color: '#3C3E40', ratio: 6 },
        { name: '-muted', color: '#3C3E40', ratio: 4.6 }
      ]
    },
    {
      name: 'ui-success',
      color: '#4FA37C',
      lightness: 70,
      ratios: { default: -1.2, hover: -1.1, active: 1 },
      contrastColors: [
        { name: '-border', color: '#3C3E40', ratio: 1.5 },
        { name: '-text', color: '#3C3E40', ratio: 6 },
        { name: '-muted', color: '#3C3E40', ratio: 4.6 }
      ]
    }
  ],
  output: 'tokens/multi/themes/neo/dark.json',
  indent: 2
},

'uno-light': {
  backgrounds: [
    {
      name: 'root',
      color: '#111827',
      lightness: 97,
      contrastColors: [
        { name: '-border', color: '#D1D5DB', ratio: 1.2 },
        { name: '-text', color: '#111827', ratio: 14 },
        { name: '-muted', color: '#6B7280', ratio: 4.8 },
        { name: '-accent', color: '#E5E7EB', ratio: 9 },
        { name: '-brand', color: '#452068', ratio: 6 },
        { name: '-alert', color: '#DC2626', ratio: 6 },
        { name: '-info', color: '#0284C7', ratio: 6 },
        { name: '-success', color: '#059669', ratio: 6 }
      ]
    },
    {
      name: 'layer',
      color: '#111827',
      lightness: 94,
      contrastColors: [
        { name: '-border', color: '#D1D5DB', ratio: 1.2 },
        { name: '-text', color: '#111827', ratio: 14 },
        { name: '-muted', color: '#6B7280', ratio: 4.8 },
        { name: '-accent', color: '#E5E7EB', ratio: 9 },
        { name: '-brand', color: '#452068', ratio: 6 },
        { name: '-alert', color: '#DC2626', ratio: 6 },
        { name: '-info', color: '#0284C7', ratio: 6 },
        { name: '-success', color: '#059669', ratio: 6 }
      ]
    },
    {
      name: 'ui',
      color: '#111827',
      lightness: 90,
      ratios: { default: -1.1, hover: -1.05, active: 1 },
      contrastColors: [
        { name: '-border', color: '#D1D5DB', ratio: 1.2 },
        { name: '-text', color: '#111827', ratio: 12 },
        { name: '-muted', color: '#6B7280', ratio: 4.5 }
      ]
    },
    {
      name: 'ui-accent',
      color: '#E5E7EB',
      lightness: 32,
      ratios: { default: -1.1, hover: -1.05, active: 1 },
      contrastColors: [
        { name: '-border', color: '#D1D5DB', ratio: 1.3 },
        { name: '-text', color: '#111827', ratio: 12 },
        { name: '-muted', color: '#6B7280', ratio: 4.5 }
      ]
    },
    {
      name: 'ui-brand',
      color: '#452068',
      lightness: 45,
      ratios: { default: -1.1, hover: -1.05, active: 1 },
      contrastColors: [
        { name: '-border', color: '#1E3A8A', ratio: 1.4 },
        { name: '-text', color: '#FFFFFF', ratio: 8 },
        { name: '-muted', color: '#BFDBFE', ratio: 4.6 }
      ]
    },
    {
      name: 'ui-alert',
      color: '#DC2626',
      lightness: 45,
      ratios: { default: -1.1, hover: -1.05, active: 1 },
      contrastColors: [
        { name: '-border', color: '#7F1D1D', ratio: 1.4 },
        { name: '-text', color: '#FFFFFF', ratio: 8 },
        { name: '-muted', color: '#FCA5A5', ratio: 4.6 }
      ]
    },
    {
      name: 'ui-info',
      color: '#0284C7',
      lightness: 45,
      ratios: { default: -1.1, hover: -1.05, active: 1 },
      contrastColors: [
        { name: '-border', color: '#0C4A6E', ratio: 1.4 },
        { name: '-text', color: '#FFFFFF', ratio: 8 },
        { name: '-muted', color: '#7DD3FC', ratio: 4.6 }
      ]
    },
    {
      name: 'ui-success',
      color: '#059669',
      lightness: 45,
      ratios: { default: -1.1, hover: -1.05, active: 1 },
      contrastColors: [
        { name: '-border', color: '#065F46', ratio: 1.4 },
        { name: '-text', color: '#FFFFFF', ratio: 8 },
        { name: '-muted', color: '#6EE7B7', ratio: 4.6 }
      ]
    }
  ],
  output: 'tokens/multi/themes/uno/light.json',
  indent: 2
},

'uno-dark': {
  backgrounds: [
    {
      name: 'root',
      color: '#111827',
      lightness: 8,
      contrastColors: [
        { name: '-border', color: '#374151', ratio: 1.2 },
        { name: '-text', color: '#F9FAFB', ratio: 14 },
        { name: '-muted', color: '#9CA3AF', ratio: 4.6 },
        { name: '-accent', color: '#1F2937', ratio: 9 },
        { name: '-brand', color: '#60A5FA', ratio: 6 },
        { name: '-alert', color: '#F87171', ratio: 6 },
        { name: '-info', color: '#38BDF8', ratio: 6 },
        { name: '-success', color: '#34D399', ratio: 6 }
      ]
    },
    {
      name: 'layer',
      color: '#111827',
      lightness: 15,
      contrastColors: [
        { name: '-border', color: '#374151', ratio: 1.2 },
        { name: '-text', color: '#F9FAFB', ratio: 14 },
        { name: '-muted', color: '#9CA3AF', ratio: 4.6 },
        { name: '-accent', color: '#111827', ratio: 9 },
        { name: '-brand', color: '#60A5FA', ratio: 6 },
        { name: '-alert', color: '#F87171', ratio: 6 },
        { name: '-info', color: '#38BDF8', ratio: 6 },
        { name: '-success', color: '#34D399', ratio: 6 }
      ]
    },
    {
      name: 'ui',
      color: '#111827',
      lightness: 20,
      ratios: { default: -1.1, hover: -1.05, active: 1 },
      contrastColors: [
        { name: '-border', color: '#374151', ratio: 1.2 },
        { name: '-text', color: '#F9FAFB', ratio: 12 },
        { name: '-muted', color: '#9CA3AF', ratio: 4.5 }
      ]
    },
    {
      name: 'ui-accent',
      color: '#374151',
      lightness: 35,
      ratios: { default: -1.1, hover: -1.05, active: 1 },
      contrastColors: [
        { name: '-border', color: '#4B5563', ratio: 1.3 },
        { name: '-text', color: '#F9FAFB', ratio: 12 },
        { name: '-muted', color: '#9CA3AF', ratio: 4.5 }
      ]
    },
    {
      name: 'ui-brand',
      color: '#452068',
      lightness: 50,
      ratios: { default: -1.1, hover: -1.05, active: 1 },
      contrastColors: [
        { name: '-border', color: '#1E40AF', ratio: 1.4 },
        { name: '-text', color: '#FFFFFF', ratio: 8 },
        { name: '-muted', color: '#BFDBFE', ratio: 4.6 }
      ]
    },
    {
      name: 'ui-alert',
      color: '#DC2626',
      lightness: 50,
      ratios: { default: -1.1, hover: -1.05, active: 1 },
      contrastColors: [
        { name: '-border', color: '#7F1D1D', ratio: 1.4 },
        { name: '-text', color: '#FFFFFF', ratio: 8 },
        { name: '-muted', color: '#FCA5A5', ratio: 4.6 }
      ]
    },
    {
      name: 'ui-info',
      color: '#0284C7',
      lightness: 50,
      ratios: { default: -1.1, hover: -1.05, active: 1 },
      contrastColors: [
        { name: '-border', color: '#0C4A6E', ratio: 1.4 },
        { name: '-text', color: '#FFFFFF', ratio: 8 },
        { name: '-muted', color: '#7DD3FC', ratio: 4.6 }
      ]
    },
    {
      name: 'ui-success',
      color: '#059669',
      lightness: 50,
      ratios: { default: -1.1, hover: -1.05, active: 1 },
      contrastColors: [
        { name: '-border', color: '#065F46', ratio: 1.4 },
        { name: '-text', color: '#FFFFFF', ratio: 8 },
        { name: '-muted', color: '#6EE7B7', ratio: 4.6 }
      ]
    }
  ],
  output: 'tokens/multi/themes/uno/dark.json',
  indent: 2
},


};

// -----------------------------
function ensureDirExists(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// -----------------------------
function createBackground(bg) {
  const ratios = bg.ratios || { default: 1 };
  return new BackgroundColor({ name: bg.name, colorKeys: [bg.color], ratios });
}

// -----------------------------
function createTextColors(textColorConfigs) {
  return (textColorConfigs || []).map(tc =>
    new Color({ name: tc.name, colorKeys: [tc.color], ratios: { default: tc.ratio } })
  );
}

// -----------------------------
function generateThemes(themeConfig) {
  if (!themeConfig || !themeConfig.backgrounds) return [];
  return themeConfig.backgrounds.map(bgConfig => {
    const background = createBackground(bgConfig);
    const contrastColors = createTextColors(bgConfig.contrastColors);
    return new Theme({
      colors: [background, ...contrastColors],
      backgroundColor: background,
      lightness: bgConfig.lightness
    });
  });
}

// -----------------------------
// Convert Leonardo output to Style Dictionary JSON with mode structure
// -----------------------------
function toStyleDictionaryFormat(themes, modeName) {
  const result = {};
  const modeKey = modeName || "mode";
  
  result[modeKey] = {
      color: {}
  };

  themes.forEach(theme => {
    const bg = theme._backgroundColor;
    const mainState = Object.entries(bg._ratios || {}).find(([, ratio]) => ratio === 1)?.[0] || 'default';
    
    // Find the contrast color object that matches the background name
    const backgroundColorObj = theme._contrastColors?.find(colorObj => colorObj.name === bg._name);

    // If no values, just fallback to background color
    const bgValue = backgroundColorObj?.values?.find(v => v.name === mainState)?.value 
                    || bg._colorKeys?.[0];

    // Initialize background name
    if (!result[modeKey].color[bg._name]) {
      result[modeKey].color[bg._name] = {};
    }

    // Add contrast colors (text, muted, etc.)
    theme._contrastColors?.forEach(colorObj => {
      if (!colorObj.name || colorObj.name === bg._name) return;

      const key = colorObj.name;
      if (!result[modeKey].color[bg._name][key]) {
        result[modeKey].color[bg._name][key] = {};
      }

      // If values exist, use them; otherwise, use default ratio/color
      if (colorObj.values?.length) {
        colorObj.values.forEach(v => {
          const stateName = v.name || 'default';
          result[modeKey].color[bg._name][key][stateName] = {
            value: v.value,
            type: 'color',
            description: `${v.contrast}:1 contrast against ${bg._name}-${mainState} (${bgValue})`
          };
        });
      } else {
        // fallback single value
        const stateName = 'default';
        const value = colorObj._colorKeys?.[0] || bg._colorKeys?.[0];
        const contrast = colorObj.ratios?.default ?? 1;
        result[modeKey].color[bg._name][key][stateName] = {
          value,
          type: 'color',
          description: `${contrast}:1 contrast against ${bg._name}-${mainState} (${bgValue})`
        };
      }
    });

    // Add background colors (default, hover, active states)
    if (backgroundColorObj?.values?.length) {
      backgroundColorObj.values.forEach(v => {
        const stateName = v.name || 'default';
        result[modeKey].color[bg._name][stateName] = {
          value: v.value,
          type: 'color',
          description: `${v.contrast}:1 contrast against ${bg._name}-${mainState} (${bgValue})`
        };
      });
    } else {
      // fallback to base background color
      const stateName = 'default';
      result[modeKey].color[bg._name][stateName] = {
        value: bg._colorKeys?.[0],
        type: 'color',
        description: `Base background ${bg._name}-${mainState}`
      };
    }
  });

  return result;
}


// -----------------------------
function toStyleDictionarySemanticFormat(themes) {
  const result = { color: {} };

  themes.forEach(theme => {
    const bg = theme._backgroundColor;
    const bgName = bg._name; // just "root", "layer", "ui"
    if (!result.color[bgName]) result.color[bgName] = {};

    // background states
    if (bg._ratios && Object.keys(bg._ratios).length) {
      Object.keys(bg._ratios).forEach(stateName => {
        result.color[bgName][stateName] = {
          value: `{mode.color.${bgName}.${stateName}}`,
          type: 'color'
        };
      });
    } else if (bg._colorKeys?.length) {
      result.color[bgName].default = {
        value: `{mode.color.${bgName}.default}`,
        type: 'color'
      };
    }

    // contrast colors
    theme._contrastColors?.forEach(colorObj => {
      if (!colorObj.name || colorObj.name === bgName) return;
      const key = colorObj.name.startsWith('-') ? colorObj.name : `-${colorObj.name}`;
      if (!result.color[bgName][key]) result.color[bgName][key] = {};

      colorObj.values?.forEach(v => {
        const stateName = v.name || 'default';
        result.color[bgName][key][stateName] = {
          value: `{mode.color.${bgName}.${key}.${stateName}}`,
          type: 'color'
        };
      });
    });
  });

  return result;
}



// -----------------------------
function generateAllThemes(config = THEMES_CONFIG) {
  Object.entries(config).forEach(([themeKey, themeConfig]) => {
    console.log(`🎨 Generating theme ${themeKey}...`);
    const themes = generateThemes(themeConfig);
    const sd = toStyleDictionaryFormat(themes);
    ensureDirExists(themeConfig.output);
    fs.writeFileSync(themeConfig.output, JSON.stringify(sd, null, themeConfig.indent));
    console.log(`✅ ${themeConfig.output} created!`);
  });

  // semantic tokens
  const semanticResult = { color: {} };
  Object.entries(config).forEach(([, themeConfig]) => {
    const themes = generateThemes(themeConfig);
    const semantic = toStyleDictionarySemanticFormat(themes);

    // merge
    Object.entries(semantic.color).forEach(([bgName, bgVals]) => {
      if (!semanticResult.color[bgName]) semanticResult.color[bgName] = {};
      semanticResult.color[bgName] = {
        ...semanticResult.color[bgName],
        ...bgVals
      };
    });
  });

  const semanticFilename = 'tokens/multi/semantic/color.json';
  ensureDirExists(semanticFilename);
  fs.writeFileSync(semanticFilename, JSON.stringify(semanticResult, null, 2));
  console.log(`✅ ${semanticFilename} created!`);
  console.log(`\n🎉 All themes and semantic tokens generated successfully!`);
}

generateAllThemes();

export { generateAllThemes, THEMES_CONFIG };
