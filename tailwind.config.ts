import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
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
        "rise-slow": {
          "0%":   { transform: "translateY(0) scale(1)", opacity: "1" },
          "90%":  { opacity: "0.8" },
          "100%": { transform: "translateY(-100vh) scale(1.2)", opacity: "0" },
        },
        "rise-medium": {
          "0%":   { transform: "translateY(0) scale(1)", opacity: "1" },
          "90%":  { opacity: "0.7" },
          "100%": { transform: "translateY(-100vh) scale(1.1)", opacity: "0" },
        },
        "rise-fast": {
          "0%":   { transform: "translateY(0) scale(1)", opacity: "1" },
          "90%":  { opacity: "0.6" },
          "100%": { transform: "translateY(-100vh) scale(1)", opacity: "0" },
        },
        "rise-float": {
          "0%":   { transform: "translateY(0) translateX(0) scale(1)", opacity: "1" },
          "50%":  { transform: "translateY(-50vh) translateX(15px) scale(1.1)", opacity: "0.6" },
          "100%": { transform: "translateY(-100vh) translateX(-15px) scale(1.2)", opacity: "0" },
        },
        sparkle: {
          "0%":   { transform: "translateY(0) translateX(0) scale(1)", opacity: "1" },
          "25%":  { transform: "translateY(-25vh) translateX(20px) scale(1.1)", opacity: "0.8" },
          "50%":  { transform: "translateY(-50vh) translateX(-15px) scale(1)", opacity: "1" },
          "75%":  { transform: "translateY(-75vh) translateX(10px) scale(1.1)", opacity: "0.5" },
          "100%": { transform: "translateY(-100vh) translateX(-5px) scale(1.2)", opacity: "0" },
        },
        // ❇️ Keyframe do carrossel (move 50% para um loop suave)
        "infinite-scroll": {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "rise-slow": "rise-slow 60s linear infinite",
        "rise-medium": "rise-medium 45s linear infinite",
        "rise-fast": "rise-fast 35s linear infinite",
        "rise-float": "rise-float 50s linear infinite",
        sparkle: "sparkle 40s linear infinite",

        // 🌀 Carrossel Desktop: 40 segundos
        "infinite-scroll": "infinite-scroll 40s linear infinite",
        // 🐢 Carrossel Mobile: 80 segundos (mais lento)
        "infinite-scroll-mobile": "infinite-scroll 80s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
