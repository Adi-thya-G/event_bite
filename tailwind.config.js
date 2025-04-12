import { space } from 'postcss/lib/list'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
  
        colors: {
            primary: {
                DEFAULT: "#0D6EFD",
                foreground: "#FFFFFF"
            },
            secondary: {
                DEFAULT: "#F0F1F3",
                foreground: "#020817"
            },
            accent: {
                DEFAULT: "#6D7074",
                foreground: "#020817"
            },
            background: "#FAFAFB",
            foreground: "#020817",
            card: {
                DEFAULT: "#FFFFFF",
                foreground: "#020817"
            },
            popover: {
                DEFAULT: "#FFFFFF",
                foreground: "#020817"
            },
            muted: {
                DEFAULT: "#F0F1F3",
                foreground: "#6D7074"
            },
            destructive: {
                DEFAULT: "#FF4C4C",
                foreground: "#FFFFFF"
            },
            border: "#E0E0E0",
            input: "#E0E0E0",
            ring: "#0D6EFD",
            chart: {
                1: "#FF6F61",
                2: "#4CAF50",
                3: "#03A9F4",
                4: "#FFC107",
                5: "#8E44AD"
            },
            dark: {
                primary: {
                    DEFAULT: "#0D6EFD",
                    foreground: "#FFFFFF"
                },
                secondary: {
                    DEFAULT: "#1E1E2C",
                    foreground: "#FAFAFB"
                },
                accent: {
                    DEFAULT: "#6D7074",
                    foreground: "#FAFAFB"
                },
                background: "#020817",
                foreground: "#FAFAFB",
                card: {
                    DEFAULT: "#121212",
                    foreground: "#FAFAFB"
                },
                popover: {
                    DEFAULT: "#121212",
                    foreground: "#FAFAFB"
                },
                muted: {
                    DEFAULT: "#1E1E2C",
                    foreground: "#6D7074"
                },
                destructive: {
                    DEFAULT: "#FF4C4C",
                    foreground: "#FFFFFF"
                },
                border: "#3C3C3C",
                input: "#3C3C3C",
                ring: "#0D6EFD"
            }
        },
        borderRadius: {
            sm: '0.125rem'
        },
        boxShadow: {
            sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
        },
        fontFamily: {
            inter: ['Inter', 'sans-serif']
        },
        fontSize: {
            heading: '36px',
            body: '14px'
        },
        fontWeight: {
            heading: '700',
            body: '600'
        }
    ,
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

