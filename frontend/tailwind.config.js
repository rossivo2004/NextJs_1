/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
 
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
   extend: {
      colors: {
        'primary': '#FF9F0D',
        'secondary': '#698141',
        'bg_popup': 'rgba(0, 0, 0, 0.8)',
        'hover_1': '#ffffff99',
        'price': '#e8b007',
        'text_1': '#828282',
        'page': '#E5E5E5',
        'active_admin_nav': 'rgba(165, 165, 165, 0.30)',
        'hover_admin_nav': 'rgba(165, 165, 165, 0.09)',
      },
    }
  },
  plugins: [],
}