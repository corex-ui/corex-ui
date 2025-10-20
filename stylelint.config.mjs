/** @type {import("stylelint").Config} */
export default {
  "extends": ["stylelint-config-standard", "stylelint-config-tailwindcss",
],
ignoreFiles: [
  "**/dist/**",
  "**/node_modules/**",
  "**/public/**",

],
rules: {
  'custom-property-pattern': null,
  'color-hex-length':  null,
  'no-descending-specificity': null,
  'media-query-no-invalid': null,
  'selector-class-pattern': '^[a-z][a-z0-9]*(?:[-_][a-z0-9]+)*(?:__[-a-z0-9]+)*(?:--[-a-z0-9]+)*$',
  "nesting-selector-no-missing-scoping-root": null

}
};
