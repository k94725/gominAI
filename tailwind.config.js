import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-pink-500",
    "bg-blue-500",
    "bg-green-100",
    "bg-blue-100",
    "bg-purple-100",
    "text-green-600",
    "text-blue-600",
    "text-purple-600",
    "bg-empathetic",
    "bg-empathetic-light",
    "bg-analytical",
    "bg-analytical-light",
    "border-empathetic/20",
    "border-analytical/20",
    // themeColor 클래스들
    "bg-themeColor-violet",
    "bg-themeColor-green",
    "bg-themeColor-yellow",
    "text-themeColor-violet",
    "text-themeColor-green",
    "text-themeColor-yellow",
    "border-themeColor-violet",
    "border-themeColor-green",
    "border-themeColor-yellow",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        empathetic: {
          DEFAULT: "#ec4899", // pink-500
          light: "#fce7f3", // pink-100
        },
        analytical: {
          DEFAULT: "#3b82f6", // blue-500
          light: "#dbeafe", // blue-100
        },
        themeColor: {
          violet: "#AB9BFF",
          green: "#97FABB",
          yellow: "#FFEFB9",
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
