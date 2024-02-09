/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      sans: ["IBM Plex Sans Arabic", "sans-serif"],
    },
    extend: {
      colors: {
        gray: {
          900: "#101828",
          800: "#1D2939",
          700: "#344054",
          600: "#475467",
          500: "#667085",
          400: "#98A2B3",
          300: "#D0D5DD",
          200: "#EAECF0",
          100: "#F2F4F7",
          50: "#F9FAFB",
          25: "#FCFCFD",
        },
        success: {
          900: "#054f31",
          800: "#05603a",
          700: "#027a48",
          600: "#039855",
          500: "#12b76a",
          400: "#32d583",
          300: "#6ce9a6",
          200: "#a6f4c5",
          100: "#d1fadf",
          50: "#ecfdf3",
          25: "#f6fef9",
        },
        warning: {
          900: "#7a2e0e",
          800: "#93370d",
          700: "#b54708",
          600: "#dc6803",
          500: "#f79009",
          400: "#fdb022",
          300: "#fec84b",
          200: "#fedf89",
          100: "#fef0c7",
          50: "#fffaeb",
          25: "#fffcf5",
        },
        error: {
          900: "#7a271a",
          800: "#912018",
          700: "#b42318",
          600: "#d92d20",
          500: "#f04438",
          400: "#f97066",
          300: "#fda29b",
          200: "#fecdca",
          100: "#fee4e2",
          50: "#fef3f2",
          25: "#fffbfa",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          900: "#134E4A",
          800: "#115E59",
          700: "#0F766E",
          DEFAULT: "hsl(var(--primary))",
          500: "#14B8A6",
          400: "#2DD4BF",
          300: "#5EEAD4",
          200: "#99F6E4",
          100: "#CCFBF1",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },

  plugins: [require("tailwindcss-animate")],
};
