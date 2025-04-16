module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      padding: {
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    fontSize: {
      xs:['10px','12px'],
      sm: ['12px', '14.4px'],
      base: ['14px', '16.8px'],
      lg: ['16px', '19.2px'],
      xl: ['20px', '24px'],
      '2xl': ['24px','28.8px'],
      '4xl': ['48px','57.6px'],
      '6xl': ['72px','86.4px'],
    },
    extend: {
      colors: {
        'primary' : '#6648D8',
        'secondary' : '#4c4c4c',
        'ts-grey-primary': '#4c4c4c',
        // Border Color
        'grey-primary':'#F8F8F8',
        'grey-secondary':'#EAEAEA',
        'grey' : '#CCCCCC',
        'white': '#FFFFFF',
        'ts-green':'#03A973',
        'jordy-blue':'#7DB8F5',
        'ts-red' : '#E96958',
        'ts-yellow':'#F9AC67',
        'ts-light-grey':'rgba(185, 185, 185, 0.3)',
        'ts-black':'#000000',
        'yellow-light' : '#FDE6D1'
      },
      spacing: {
        '9px': '9px',
        '5px': '5px',
        '3px': '3px',
        '128': '54rem',
      },
      fontSize:{
        '10': '10px',
        '12': '12px'
      },
      borderRadius: {
        '10': '10px',
        '5': '5px',
        '1': '1px'
      },
      boxShadow: {
        'table': '0 0 0 0.5px rgba(0, 0, 0, 0.3)',
        'flight': '0px 0px 10px rgba(0, 0, 0, 0.25)',
        'cards':'0px 2px 5px rgba(0, 0, 0, 0.1)'
      },
      borderWidth : {
        '0.5':'0.5px'
      }
    }
  },
  plugins: [],
}
