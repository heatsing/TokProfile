/** @type {import("prettier").Config} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  printWidth: 90,
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  tailwindConfig: "./tailwind.config.ts",
};

export default config;
