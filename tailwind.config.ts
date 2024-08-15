import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        color1: '#FF1510', 
        color2: '#FDECEC', 
        color3: '#E7F6E7',
        textColor1: '#404040',
        textColor2: '#8C8C8C',
        textColor3: '#B9B9B9',
      },
    },
  },
  plugins: [],
};
export default config;
