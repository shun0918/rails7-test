module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/assets/stylesheets/**/*.css',
    './app/javascript/**/*.{js,jsx,ts,tsx}',
    './app/javascript/components/**/*.{js,jsx,ts,tsx}',
  ],
  important: '#root',
  theme: {
    body: ['"Roboto"', '"Helvetica"', '"Arial"', 'sans-s'],
  },
  // plugins: [],
}
