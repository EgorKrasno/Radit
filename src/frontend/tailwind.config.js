module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        fontFamily: {
            custom: ['flood-std', 'sans-serif']
        },
        extend: {
            width: {
                '550': '550px',
            },
            height: {
                '450': '450px',
            },
            screens: {
                'tablet': '1160px',
            },
            fontFamily: {
                sans: ['Soleil', 'sans-serif']
            },
            keyframes: {
                wiggle: {
                    "0%, 100%": {transform: "rotate(-20deg)"},
                    "50%": {transform: "rotate(20deg)"}
                },
                upvote: {
                    "0%": {transform: "scale(1,1)"},
                    "20%": {transform: "scale(1.2,.8)"},
                    "40%": {transform: "scale(.8,1.2)"},
                    "50%": {transform: 'translateY(-18px) scale(1.1,.90)'},
                    "100%": {transform: "scale(1,1)"},
                },
                award: {
                    "0%": {transform: "translateY(0px)"},
                    "100%": {transform: "translateY(-10px)"},
                }
            },
            animation: {
                wiggle: "wiggle 250ms ease-out",
                upvote: "upvote 400ms cubic-bezier(.26,.72,.6,.59)",
                award: "award 500ms infinite alternate",
            }
        },
    },
    variants: {
        extend: {
            animation: ['hover', 'group-hover']
        },
    },
    plugins: [],
}