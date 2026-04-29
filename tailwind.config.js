/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
		"./src/Components/**/*.{js,ts,jsx,tsx}",
		"./src/app/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				brand: {
					DEFAULT: "rgb(var(--brand) / <alpha-value>)",
					dim:     "rgb(var(--brand-dim) / <alpha-value>)",
				},
				accent: {
					green: "rgb(var(--accent-green) / <alpha-value>)",
				},
				background: "rgb(var(--bg-base) / <alpha-value>)",
				foreground:  "rgb(var(--text-secondary) / <alpha-value>)",
				surface: {
					base:     "rgb(var(--bg-base) / <alpha-value>)",
					raised:   "rgb(var(--bg-raised) / <alpha-value>)",
					card:     "rgb(var(--bg-card) / <alpha-value>)",
					elevated: "rgb(var(--bg-elevated) / <alpha-value>)",
				},
				/* shadcn-compat */
				primary: {
					DEFAULT:    "rgb(var(--primary) / <alpha-value>)",
					foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
				},
				secondary: {
					DEFAULT:    "rgb(var(--secondary) / <alpha-value>)",
					foreground: "rgb(var(--secondary-foreground) / <alpha-value>)",
				},
				muted: {
					DEFAULT:    "rgb(var(--muted) / <alpha-value>)",
					foreground: "rgb(var(--muted-foreground) / <alpha-value>)",
				},
				card: {
					DEFAULT:    "rgb(var(--card) / <alpha-value>)",
					foreground: "rgb(var(--card-foreground) / <alpha-value>)",
				},
				popover: {
					DEFAULT:    "rgb(var(--popover) / <alpha-value>)",
					foreground: "rgb(var(--popover-foreground) / <alpha-value>)",
				},
				destructive: {
					DEFAULT:    "rgb(var(--destructive) / <alpha-value>)",
					foreground: "rgb(var(--destructive-foreground) / <alpha-value>)",
				},
				border: "rgb(var(--border) / 0.2)",
				input:  "rgb(var(--input) / <alpha-value>)",
				ring:   "rgb(var(--ring) / <alpha-value>)",
			},
			borderRadius: {
				lg:  "var(--radius)",
				md:  "calc(var(--radius) - 2px)",
				sm:  "calc(var(--radius) - 4px)",
				xl:  "1rem",
				"2xl": "1.25rem",
			},
			backgroundImage: {
				"chat-bg": "linear-gradient(-45deg, #183850 0%, #101c2e 40%, #0c1420 70%, #10172a 100%)",
				"hero-bg":  "radial-gradient(ellipse at 60% 0%, rgba(25,147,147,0.18) 0%, transparent 65%), linear-gradient(160deg, #0a0e16 0%, #101c2e 60%, #0c1420 100%)",
			},
			fontFamily: {
				sans: ["Inter", ...fontFamily.sans],
			},
			keyframes: {
				"fade-in": {
					from: { opacity: "0", transform: "translateY(4px)" },
					to:   { opacity: "1", transform: "translateY(0)" },
				},
				"pulse-brand": {
					"0%, 100%": { opacity: "1" },
					"50%":      { opacity: "0.5" },
				},
			},
			animation: {
				"fade-in":    "fade-in 0.2s ease-out",
				"pulse-brand":"pulse-brand 2s ease-in-out infinite",
			},
		},
	},
	plugins: [],
};
