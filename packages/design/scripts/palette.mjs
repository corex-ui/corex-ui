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
        color: '#F2F4F8',
        lightness: 99,
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.05 },
          { name: '-text', color: '#1D1C20', ratio: 7 },
          { name: '-muted', color: '#1D1C20', ratio: 4.8 },
          { name: '-accent', color: '#1D1C20', ratio: 7 },
          { name: '-brand', color: '#2f44ad', ratio: 7 },
          { name: '-alert', color: '#C94F4F', ratio: 7 },
          { name: '-info', color: '#81A9CB', ratio: 7 },
          { name: '-success', color: '#4FA37C', ratio: 7 }
        ]
      },
      {
        name: 'layer',
        color: '#F2F4F8',
        lightness: 96,
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.05 },
          { name: '-text', color: '#1D1C20', ratio: 7 },
          { name: '-muted', color: '#1D1C20', ratio: 4.8 },
          { name: '-accent', color: '#1D1C20', ratio: 7 },
          { name: '-brand', color: '#2f44ad', ratio: 7 },
          { name: '-alert', color: '#C94F4F', ratio: 7 },
          { name: '-info', color: '#81A9CB', ratio: 7 },
          { name: '-success', color: '#4FA37C', ratio: 7 }
        ]
      },
      {
        name: 'ui',
        color: '#F2F4F8',
        lightness: 91,
        ratios: { default: -1.15, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.05 },
          { name: '-text', color: '#1D1C20', ratio: 7 },
          { name: '-muted', color: '#1D1C20', ratio: 4.8 },

        ]
      },
      {
        name: 'ui-accent',
        color: '#1D1C20',
        lightness: 35,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.05 },
          { name: '-text', color: '#1D1C20', ratio: 7 },
          { name: '-muted', color: '#1D1C20', ratio: 4.8 },
        ]
      },
      {
        name: 'ui-brand',
        color: '#2f44ad',
        lightness: 42,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.05 },
          { name: '-text', color: '#1D1C20', ratio: 7 },
          { name: '-muted', color: '#1D1C20', ratio: 4.8 },
        ]
      },
      {
        name: 'ui-alert',
        color: '#C94F4F',
        lightness: 42,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.05 },
          { name: '-text', color: '#1D1C20', ratio: 7 },
          { name: '-muted', color: '#1D1C20', ratio: 4.8 },
        ]
      },
      {
        name: 'ui-info',
        color: '#81A9CB',
        lightness: 42,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.05 },
          { name: '-text', color: '#1D1C20', ratio: 7 },
          { name: '-muted', color: '#1D1C20', ratio: 4.8 },
        ]
      },
      {
        name: 'ui-success',
        color: '#4FA37C',
        lightness: 42,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.05 },
          { name: '-text', color: '#1D1C20', ratio: 7 },
          { name: '-muted', color: '#1D1C20', ratio: 4.8 }
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
        color: '#F2F4F8',
        lightness: 8,
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.6 },
          { name: '-text', color: '#1D1C20', ratio: 9 },
          { name: '-muted', color: '#1D1C20', ratio: 6 },
          { name: '-accent', color: '#1D1C20', ratio: 7 },
          { name: '-brand', color: '#2f44ad', ratio: 7 },
          { name: '-alert', color: '#C94F4F', ratio: 7 },
          { name: '-info', color: '#81A9CB', ratio: 7 },
          { name: '-success', color: '#4FA37C', ratio: 7 }
        ]
      },
      {
        name: 'layer',
        color: '#F2F4F8',
        lightness: 12,
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.6 },
          { name: '-text', color: '#1D1C20', ratio: 9 },
          { name: '-muted', color: '#1D1C20', ratio: 6 },
          { name: '-accent', color: '#1D1C20', ratio: 7 },
          { name: '-brand', color: '#2f44ad', ratio: 7 },
          { name: '-alert', color: '#C94F4F', ratio: 7 },
          { name: '-info', color: '#81A9CB', ratio: 7 },
          { name: '-success', color: '#4FA37C', ratio: 7 }
        ]
      },
      {
        name: 'ui',
        color: '#F2F4F8',
        lightness: 16,
        ratios: { default: -1.15, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.6 },
          { name: '-text', color: '#1D1C20', ratio: 9 },
          { name: '-muted', color: '#1D1C20', ratio: 6 },

        ]
      },
      {
        name: 'ui-accent',
        color: '#1D1C20',
        lightness: 65,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.6 },
          { name: '-text', color: '#1D1C20', ratio: 9 },
          { name: '-muted', color: '#1D1C20', ratio: 6 },
        ]
      },
      {
        name: 'ui-brand',
        color: '#2f44ad',
        lightness: 60,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.6 },
          { name: '-text', color: '#1D1C20', ratio: 9 },
          { name: '-muted', color: '#1D1C20', ratio: 6 },
        ]
      },
      {
        name: 'ui-alert',
        color: '#C94F4F',
        lightness: 60,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.05 },
          { name: '-text', color: '#1D1C20', ratio: 9 },
          { name: '-muted', color: '#1D1C20', ratio: 6 },
        ]
      },
      {
        name: 'ui-info',
        color: '#81A9CB',
        lightness: 60,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.05 },
          { name: '-text', color: '#1D1C20', ratio: 9 },
          { name: '-muted', color: '#1D1C20', ratio: 6 },
        ]
      },
      {
        name: 'ui-success',
        color: '#4FA37C',
        lightness: 60,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.05 },
          { name: '-text', color: '#1D1C20', ratio: 9 },
          { name: '-muted', color: '#1D1C20', ratio: 6 },
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
        color: '#4D2E50',
        lightness: 97,
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.2 },
          { name: '-text', color: '#1D1C20', ratio: 7 },
          { name: '-muted', color: '#1D1C20', ratio: 4.8 },
          { name: '-accent', color: '#1D1C20', ratio: 7 },
          { name: '-brand', color: '#4D2E50', ratio: 7 },
          { name: '-alert', color: '#C94F4F', ratio: 7 },
          { name: '-info', color: '#81A9CB', ratio: 7 },
          { name: '-success', color: '#4FA37C', ratio: 7 }
        ]
      },
      {
        name: 'layer',
        color: '#4D2E50',
        lightness: 95,
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.2 },
          { name: '-text', color: '#1D1C20', ratio: 7 },
          { name: '-muted', color: '#1D1C20', ratio: 4.8 },
          { name: '-accent', color: '#1D1C20', ratio: 7 },
          { name: '-brand', color: '#4D2E50', ratio: 7 },
          { name: '-alert', color: '#C94F4F', ratio: 7 },
          { name: '-info', color: '#81A9CB', ratio: 7 },
          { name: '-success', color: '#4FA37C', ratio: 7 }
        ]
      },
      {
        name: 'ui',
        color: '#4D2E50',
        lightness: 88,
        ratios: { default: -1.15, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.2 },
          { name: '-text', color: '#1D1C20', ratio: 7 },
          { name: '-muted', color: '#1D1C20', ratio: 4.8 },

        ]
      },
      {
        name: 'ui-accent',
        color: '#1D1C20',
        lightness: 45,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.2 },
          { name: '-text', color: '#1D1C20', ratio: 7 },
          { name: '-muted', color: '#1D1C20', ratio: 4.8 },
        ]
      },
      {
        name: 'ui-brand',
        color: '#4D2E50',
        lightness: 32,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.2 },
          { name: '-text', color: '#1D1C20', ratio: 7 },
          { name: '-muted', color: '#1D1C20', ratio: 4.8 },
        ]
      },
      {
        name: 'ui-alert',
        color: '#C94F4F',
        lightness: 32,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.2 },
          { name: '-text', color: '#1D1C20', ratio: 7 },
          { name: '-muted', color: '#1D1C20', ratio: 4.8 },
        ]
      },
      {
        name: 'ui-info',
        color: '#81A9CB',
        lightness: 32,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.2 },
          { name: '-text', color: '#1D1C20', ratio: 7 },
          { name: '-muted', color: '#1D1C20', ratio: 4.8 },
        ]
      },
      {
        name: 'ui-success',
        color: '#4FA37C',
        lightness: 32,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.2 },
          { name: '-text', color: '#1D1C20', ratio: 7 },
          { name: '-muted', color: '#1D1C20', ratio: 4.8 }
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
        color: '#4D2E50',
        lightness: 12,
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.6 },
          { name: '-text', color: '#1D1C20', ratio: 9 },
          { name: '-muted', color: '#1D1C20', ratio: 6 },
          { name: '-accent', color: '#1D1C20', ratio: 7 },
          { name: '-brand', color: '#4D2E50', ratio: 7 },
          { name: '-alert', color: '#C94F4F', ratio: 7 },
          { name: '-info', color: '#81A9CB', ratio: 7 },
          { name: '-success', color: '#4FA37C', ratio: 7 }
        ]
      },
      {
        name: 'layer',
        color: '#4D2E50',
        lightness: 16,
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.6 },
          { name: '-text', color: '#1D1C20', ratio: 9 },
          { name: '-muted', color: '#1D1C20', ratio: 6 },
          { name: '-accent', color: '#1D1C20', ratio: 7 },
          { name: '-brand', color: '#4D2E50', ratio: 7 },
          { name: '-alert', color: '#C94F4F', ratio: 7 },
          { name: '-info', color: '#81A9CB', ratio: 7 },
          { name: '-success', color: '#4FA37C', ratio: 7 }
        ]
      },
      {
        name: 'ui',
        color: '#4D2E50',
        lightness: 20,
        ratios: { default: -1.15, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.6 },
          { name: '-text', color: '#1D1C20', ratio: 9 },
          { name: '-muted', color: '#1D1C20', ratio: 6 },

        ]
      },
      {
        name: 'ui-accent',
        color: '#1D1C20',
        lightness: 55,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.6 },
          { name: '-text', color: '#1D1C20', ratio: 9 },
          { name: '-muted', color: '#1D1C20', ratio: 6 },
        ]
      },
      {
        name: 'ui-brand',
        color: '#4D2E50',
        lightness: 55,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.6 },
          { name: '-text', color: '#1D1C20', ratio: 9 },
          { name: '-muted', color: '#1D1C20', ratio: 6 },
        ]
      },
      {
        name: 'ui-alert',
        color: '#C94F4F',
        lightness: 55,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.6 },
          { name: '-text', color: '#1D1C20', ratio: 9 },
          { name: '-muted', color: '#1D1C20', ratio: 6 },
        ]
      },
      {
        name: 'ui-info',
        color: '#81A9CB',
        lightness: 55,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.6 },
          { name: '-text', color: '#1D1C20', ratio: 9 },
          { name: '-muted', color: '#1D1C20', ratio: 6 },
        ]
      },
      {
        name: 'ui-success',
        color: '#4FA37C',
        lightness: 55,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.6 },
          { name: '-text', color: '#1D1C20', ratio: 9 },
          { name: '-muted', color: '#1D1C20', ratio: 6 },
        ]
      }
    ],
    output: 'tokens/multi/themes/uno/dark.json',
    indent: 2
  },
  'duo-light': {
    backgrounds: [
      {
        name: 'root',
        color: '#3B5E2B',
        lightness: 99,
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.05 },
          { name: '-text', color: '#1D1C20', ratio: 7 },
          { name: '-muted', color: '#1D1C20', ratio: 4.8 },
          { name: '-accent', color: '#B9C3B9', ratio: 7 },
          { name: '-brand', color: '#3B5E2B', ratio: 7 },
          { name: '-alert', color: '#C94F4F', ratio: 7 },
          { name: '-info', color: '#81A9CB', ratio: 7 },
          { name: '-success', color: '#4FA37C', ratio: 7 }
        ]
      },
      {
        name: 'layer',
        color: '#3B5E2B',
        lightness: 96,
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.05 },
          { name: '-text', color: '#1D1C20', ratio: 7 },
          { name: '-muted', color: '#1D1C20', ratio: 4.8 },
          { name: '-accent', color: '#B9C3B9', ratio: 7 },
          { name: '-brand', color: '#3B5E2B', ratio: 7 },
          { name: '-alert', color: '#C94F4F', ratio: 7 },
          { name: '-info', color: '#81A9CB', ratio: 7 },
          { name: '-success', color: '#4FA37C', ratio: 7 }
        ]
      },
      {
        name: 'ui',
        color: '#3B5E2B',
        lightness: 91,
        ratios: { default: -1.15, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.05 },
          { name: '-text', color: '#1D1C20', ratio: 7 },
          { name: '-muted', color: '#1D1C20', ratio: 4.8 },

        ]
      },
      {
        name: 'ui-accent',
        color: '#B9C3B9',
        lightness: 42,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.05 },
          { name: '-text', color: '#1D1C20', ratio: 7 },
          { name: '-muted', color: '#1D1C20', ratio: 4.8 },
        ]
      },
      {
        name: 'ui-brand',
        color: '#3B5E2B',
        lightness: 42,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.05 },
          { name: '-text', color: '#1D1C20', ratio: 7 },
          { name: '-muted', color: '#1D1C20', ratio: 4.8 },
        ]
      },
      {
        name: 'ui-alert',
        color: '#C94F4F',
        lightness: 42,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.05 },
          { name: '-text', color: '#1D1C20', ratio: 7 },
          { name: '-muted', color: '#1D1C20', ratio: 4.8 },
        ]
      },
      {
        name: 'ui-info',
        color: '#81A9CB',
        lightness: 42,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.05 },
          { name: '-text', color: '#1D1C20', ratio: 7 },
          { name: '-muted', color: '#1D1C20', ratio: 4.8 },
        ]
      },
      {
        name: 'ui-success',
        color: '#4FA37C',
        lightness: 42,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.05 },
          { name: '-text', color: '#1D1C20', ratio: 7 },
          { name: '-muted', color: '#1D1C20', ratio: 4.8 }
        ]
      }
    ],
    output: 'tokens/multi/themes/duo/light.json',
    indent: 2
  },

  'duo-dark': {
    backgrounds: [
      {
        name: 'root',
        color: '#3B5E2B',
        lightness: 8,
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.6 },
          { name: '-text', color: '#1D1C20', ratio: 9 },
          { name: '-muted', color: '#1D1C20', ratio: 6 },
          { name: '-accent', color: '#B9C3B9', ratio: 7 },
          { name: '-brand', color: '#3B5E2B', ratio: 7 },
          { name: '-alert', color: '#C94F4F', ratio: 7 },
          { name: '-info', color: '#81A9CB', ratio: 7 },
          { name: '-success', color: '#4FA37C', ratio: 7 }
        ]
      },
      {
        name: 'layer',
        color: '#3B5E2B',
        lightness: 12,
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.6 },
          { name: '-text', color: '#1D1C20', ratio: 9 },
          { name: '-muted', color: '#1D1C20', ratio: 6 },
          { name: '-accent', color: '#B9C3B9', ratio: 7 },
          { name: '-brand', color: '#3B5E2B', ratio: 7 },
          { name: '-alert', color: '#C94F4F', ratio: 7 },
          { name: '-info', color: '#81A9CB', ratio: 7 },
          { name: '-success', color: '#4FA37C', ratio: 7 }
        ]
      },
      {
        name: 'ui',
        color: '#3B5E2B',
        lightness: 16,
        ratios: { default: -1.15, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.6 },
          { name: '-text', color: '#1D1C20', ratio: 9 },
          { name: '-muted', color: '#1D1C20', ratio: 6 },

        ]
      },
      {
        name: 'ui-accent',
        color: '#B9C3B9',
        lightness: 60,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.6 },
          { name: '-text', color: '#1D1C20', ratio: 9 },
          { name: '-muted', color: '#1D1C20', ratio: 6 },
        ]
      },
      {
        name: 'ui-brand',
        color: '#3B5E2B',
        lightness: 60,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.6 },
          { name: '-text', color: '#1D1C20', ratio: 9 },
          { name: '-muted', color: '#1D1C20', ratio: 6 },
        ]
      },
      {
        name: 'ui-alert',
        color: '#C94F4F',
        lightness: 60,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.05 },
          { name: '-text', color: '#1D1C20', ratio: 9 },
          { name: '-muted', color: '#1D1C20', ratio: 6 },
        ]
      },
      {
        name: 'ui-info',
        color: '#81A9CB',
        lightness: 60,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.05 },
          { name: '-text', color: '#1D1C20', ratio: 9 },
          { name: '-muted', color: '#1D1C20', ratio: 6 },
        ]
      },
      {
        name: 'ui-success',
        color: '#4FA37C',
        lightness: 60,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.05 },
          { name: '-text', color: '#1D1C20', ratio: 9 },
          { name: '-muted', color: '#1D1C20', ratio: 6 },
        ]
      }
    ],
    output: 'tokens/multi/themes/duo/dark.json',
    indent: 2
  },
  'leo-light': {
    backgrounds: [
      {
        name: 'root',
        color: '#B3B6C0',
        lightness: 95,
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.2 },
          { name: '-text', color: '#1D1C20', ratio: 7 },
          { name: '-muted', color: '#1D1C20', ratio: 4.8 },
          { name: '-accent', color: '#E3E9F0', ratio: 7 },
          { name: '-brand', color: '#B3B6C0', ratio: 7 },
          { name: '-alert', color: '#C94F4F', ratio: 7 },
          { name: '-info', color: '#81A9CB', ratio: 7 },
          { name: '-success', color: '#4FA37C', ratio: 7 }
        ]
      },
      {
        name: 'layer',
        color: '#B3B6C0',
        lightness: 92,
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.2 },
          { name: '-text', color: '#1D1C20', ratio: 7 },
          { name: '-muted', color: '#1D1C20', ratio: 4.8 },
          { name: '-accent', color: '#E3E9F0', ratio: 7 },
          { name: '-brand', color: '#B3B6C0', ratio: 7 },
          { name: '-alert', color: '#C94F4F', ratio: 7 },
          { name: '-info', color: '#81A9CB', ratio: 7 },
          { name: '-success', color: '#4FA37C', ratio: 7 }
        ]
      },
      {
        name: 'ui',
        color: '#B3B6C0',
        lightness: 86,
        ratios: { default: -1.15, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.2 },
          { name: '-text', color: '#1D1C20', ratio: 7 },
          { name: '-muted', color: '#1D1C20', ratio: 4.8 },

        ]
      },
      {
        name: 'ui-accent',
        color: '#E3E9F0',
        lightness: 45,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.2 },
          { name: '-text', color: '#1D1C20', ratio: 7 },
          { name: '-muted', color: '#1D1C20', ratio: 4.8 },
        ]
      },
      {
        name: 'ui-brand',
        color: '#B3B6C0',
        lightness: 32,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.2 },
          { name: '-text', color: '#1D1C20', ratio: 7 },
          { name: '-muted', color: '#1D1C20', ratio: 4.8 },
        ]
      },
      {
        name: 'ui-alert',
        color: '#C94F4F',
        lightness: 32,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.2 },
          { name: '-text', color: '#1D1C20', ratio: 7 },
          { name: '-muted', color: '#1D1C20', ratio: 4.8 },
        ]
      },
      {
        name: 'ui-info',
        color: '#81A9CB',
        lightness: 32,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.2 },
          { name: '-text', color: '#1D1C20', ratio: 7 },
          { name: '-muted', color: '#1D1C20', ratio: 4.8 },
        ]
      },
      {
        name: 'ui-success',
        color: '#4FA37C',
        lightness: 32,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.2 },
          { name: '-text', color: '#1D1C20', ratio: 7 },
          { name: '-muted', color: '#1D1C20', ratio: 4.8 }
        ]
      }
    ],
    output: 'tokens/multi/themes/leo/light.json',
    indent: 2
  },

  'leo-dark': {
    backgrounds: [
      {
        name: 'root',
        color: '#B3B6C0',
        lightness: 8,
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.6 },
          { name: '-text', color: '#1D1C20', ratio: 9 },
          { name: '-muted', color: '#1D1C20', ratio: 6 },
          { name: '-accent', color: '#E3E9F0', ratio: 7 },
          { name: '-brand', color: '#B3B6C0', ratio: 7 },
          { name: '-alert', color: '#C94F4F', ratio: 7 },
          { name: '-info', color: '#81A9CB', ratio: 7 },
          { name: '-success', color: '#4FA37C', ratio: 7 }
        ]
      },
      {
        name: 'layer',
        color: '#B3B6C0',
        lightness: 12,
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.6 },
          { name: '-text', color: '#1D1C20', ratio: 9 },
          { name: '-muted', color: '#1D1C20', ratio: 6 },
          { name: '-accent', color: '#E3E9F0', ratio: 7 },
          { name: '-brand', color: '#B3B6C0', ratio: 7 },
          { name: '-alert', color: '#C94F4F', ratio: 7 },
          { name: '-info', color: '#81A9CB', ratio: 7 },
          { name: '-success', color: '#4FA37C', ratio: 7 }
        ]
      },
      {
        name: 'ui',
        color: '#B3B6C0',
        lightness: 16,
        ratios: { default: -1.15, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.6 },
          { name: '-text', color: '#1D1C20', ratio: 9 },
          { name: '-muted', color: '#1D1C20', ratio: 6 },

        ]
      },
      {
        name: 'ui-accent',
        color: '#E3E9F0',
        lightness: 55,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.6 },
          { name: '-text', color: '#1D1C20', ratio: 9 },
          { name: '-muted', color: '#1D1C20', ratio: 6 },
        ]
      },
      {
        name: 'ui-brand',
        color: '#B3B6C0',
        lightness: 55,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.6 },
          { name: '-text', color: '#1D1C20', ratio: 9 },
          { name: '-muted', color: '#1D1C20', ratio: 6 },
        ]
      },
      {
        name: 'ui-alert',
        color: '#C94F4F',
        lightness: 55,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.6 },
          { name: '-text', color: '#1D1C20', ratio: 9 },
          { name: '-muted', color: '#1D1C20', ratio: 6 },
        ]
      },
      {
        name: 'ui-info',
        color: '#81A9CB',
        lightness: 55,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.6 },
          { name: '-text', color: '#1D1C20', ratio: 9 },
          { name: '-muted', color: '#1D1C20', ratio: 6 },
        ]
      },
      {
        name: 'ui-success',
        color: '#4FA37C',
        lightness: 55,
        ratios: { default: -1.2, hover: -1.1, active: 1 },
        contrastColors: [
          { name: '-border', color: '#D8DBDE', ratio: 1.6 },
          { name: '-text', color: '#1D1C20', ratio: 9 },
          { name: '-muted', color: '#1D1C20', ratio: 6 },
        ]
      }
    ],
    output: 'tokens/multi/themes/leo/dark.json',
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
  const colorKeys = Array.isArray(bg.color) ? bg.color : [bg.color].filter(Boolean);
  return new BackgroundColor({ name: bg.name, colorKeys: colorKeys.length ? colorKeys : ['#ffffff'], ratios });
}

// -----------------------------
function createTextColors(textColorConfigs) {
  return (textColorConfigs || []).map(tc => {
    const colorKeys = Array.isArray(tc.color) ? tc.color : [tc.color].filter(Boolean);
    const ratio = typeof tc.ratio === 'number' ? tc.ratio : 1;
    return new Color({ name: tc.name, colorKeys: colorKeys.length ? colorKeys : ['#000000'], ratios: { default: ratio } });
  });
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
// Convert Leonardo output to Style Dictionary JSON with theme structure
// -----------------------------
function toStyleDictionaryFormat(themes, themeName) {
  const result = {};
  const themeKey = themeName || "theme";

  result[themeKey] = {
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
    if (!result[themeKey].color[bg._name]) {
      result[themeKey].color[bg._name] = {};
    }

    // Add contrast colors (text, muted, etc.)
    theme._contrastColors?.forEach(colorObj => {
      if (!colorObj.name || colorObj.name === bg._name) return;

      const key = colorObj.name;
      if (!result[themeKey].color[bg._name][key]) {
        result[themeKey].color[bg._name][key] = {};
      }

      // If values exist, use them; otherwise, use default ratio/color
      if (colorObj.values?.length) {
        colorObj.values.forEach(v => {
          const stateName = v.name || 'default';
          result[themeKey].color[bg._name][key][stateName] = {
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
        result[themeKey].color[bg._name][key][stateName] = {
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
        result[themeKey].color[bg._name][stateName] = {
          value: v.value,
          type: 'color',
          description: `${v.contrast}:1 contrast against ${bg._name}-${mainState} (${bgValue})`
        };
      });
    } else {
      // fallback to base background color
      const stateName = 'default';
      result[themeKey].color[bg._name][stateName] = {
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
          value: `{theme.color.${bgName}.${stateName}}`,
          type: 'color'
        };
      });
    } else if (bg._colorKeys?.length) {
      result.color[bgName].default = {
        value: `{theme.color.${bgName}.default}`,
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
          value: `{theme.color.${bgName}.${key}.${stateName}}`,
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
