import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/globals.css",
  ],
  theme: {
    extend: {
      boxShadow: {
        "custom-dark": "0 0px 10px rgba(255, 255, 255, 0.1)",
        "custom-light": "0 0px 10px rgba(0, 0, 0, 0.1)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gold: {
          DEFAULT: "rgb(200, 155, 60)",
        },
        gray: {
          100: "#F7FAFC", // cool gray 100 (가장 밝은 색상)
          200: "#E2E8F0", // cool gray 200
          300: "#CBD5E1", // cool gray 300
          400: "#A0AEC0", // cool gray 400
          500: "#718096", // cool gray 500
          600: "#4A5568", // cool gray 600
          700: "#2D3748", // cool gray 700
          800: "#1A202C", // cool gray 800
          900: "#171923", // cool gray 900 (가장 어두운 색상)
        },
      },
      fontSize: {
        xxl: "3.5rem",
        xl: "1.5rem",
        m: "1.2rem",
        sm: "0.9rem",
      },
      fontWeight: {
        bold: "800",
        light: "200",
      },
    },
  },
  plugins: [],
};
export default config;
