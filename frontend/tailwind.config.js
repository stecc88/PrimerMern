export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B5CF6', // Morado
        secondary: '#F59E0B', // Naranja
        dark: '#1F2937',
        light: '#F9FAFB'
      },
      backgroundImage: {
        'gradient-purple': 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
        'gradient-orange': 'linear-gradient(135deg, #F59E0B 0%, #DC2626 100%)'
      }
    },
  },
  plugins: [],
}