
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#4e6ef2", // blue
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#ea384c", // red
          foreground: "#ffffff",
        },
        soft: {
          green: "#F2FCE2",
          yellow: "#FEF7CD",
          orange: "#FEC6A1",
          purple: "#E5DEFF",
          pink: "#FFDEE2",
          blue: "#D3E4FD",
          red: "#FFE5E8",
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
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "pulse-blue": {
          "0%, 100%": {
            "box-shadow": "0 0 0 0 rgba(78, 110, 242, 0.4)",
          },
          "50%": {
            "box-shadow": "0 0 0 10px rgba(78, 110, 242, 0)",
          },
        },
        "pulse-red": {
          "0%, 100%": {
            "box-shadow": "0 0 0 0 rgba(234, 56, 76, 0.4)",
          },
          "50%": {
            "box-shadow": "0 0 0 10px rgba(234, 56, 76, 0)",
          },
        },
        "float": {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.5s ease-out",
        "fade-down": "fade-down 0.5s ease-out",
        "pulse-blue": "pulse-blue 2s infinite",
        "pulse-red": "pulse-red 2s infinite",
        "float": "float 3s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #4e6ef2 0%, #72a1f8 100%)",
        "gradient-secondary": "linear-gradient(135deg, #ea384c 0%, #ff7085 100%)",
        "gradient-blend": "linear-gradient(135deg, #4e6ef2 0%, #ea384c 100%)",
        "gradient-dark": "linear-gradient(180deg, #1a1a1a 0%, #333333 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
