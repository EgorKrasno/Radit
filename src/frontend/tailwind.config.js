module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            custom: ['flood-std', 'sans-serif']
        },
        extend: {
            screens: {
                'tablet': '1100px',
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
                }
            },
            animation: {
                wiggle: "wiggle 250ms ease-out",
                upvote: "upvote 400ms cubic-bezier(.26,.72,.6,.59)",
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}