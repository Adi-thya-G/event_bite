import { space } from 'postcss/lib/list'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
     animation:{
      'colidx':'colidsx 5s ease-in-out  4 ',
        'colidy':'colidsy 5s ease-in-out 4'
     }
     ,keyframes:{
      colidsx:{
        '0%':{transform: 'translateX(0px)'
               ,letterSpacing:"20px",
        },
        '50%':{transform:'translateX(20px)'
         , letterSpacing:'10px'
        },
        '75%':{transform:'translateX(5px)',
          letterSpacing:'5px',},
          '100%':{transform: 'translateX(10px)'
               ,letterSpacing:"2px"},


        
      },
     colidsy:{
      '0%':{transform:'translateX(0px)',
        letterSpacing:'20px'
      }
      ,
      '50%':{transform:'translateX(-20px)'
         ,letterSpacing:'10px'
      },
      '75%':{transform:'transalteX(-10px)',
         letterSpacing:'5px'
      },
      '100%':{
          transform:'transalteX(10px)',
         letterSpacing:'2px'
      }
     }

     }
    },
  },
  plugins: [require('tailwindcss-motion')],
}

