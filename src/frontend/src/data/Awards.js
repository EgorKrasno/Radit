import {
    AiFillHome, GiBanknote, GiChiliPepper, GiClownfish, GiCobra,
    GiCoffeeBeans, GiCupcake,
    GiDespair,
    GiFossil, GiHolyGrail,
    GiPerspectiveDiceSixFacesRandom, GiTrashCan,
    RiAliensFill
} from "react-icons/all";

export const awards = [
    {
        key: 1,
        name: 'Spicy',
        price: "0.99",
        cents: 99,
        color: "red",
        icon: () => <GiChiliPepper className={`text-red-500 group-hover:animate-award`} size={50}/>
    },
    {
        key: 2,
        name: 'Holy Grail',
        price: "0.99",
        cents: 99,
        color: "yellow",
        icon: () => <GiHolyGrail className={`text-yellow-400 group-hover:animate-award`} size={50}/>
    },
    {
        key: 3,
        name: 'Trash',
        price: "0.99",
        cents: 99,
        color: "yellow",
        icon: () => <GiTrashCan className={`text-yellow-800 group-hover:animate-award`} size={50}/>
    },
    {
        key: 4,
        name: 'Zucked',
        price: "0.99",
        cents: 99,
        color: "purple",
        icon: () => <RiAliensFill className={`text-purple-800 group-hover:animate-award`} size={50}/>
    },
    {
        key: 5,
        name: 'Cupcake',
        price: "0.99",
        cents: 99,
        color: "pink",
        icon: () => <GiCupcake className={`text-pink-500 group-hover:animate-award`} size={50}/>
    },
    {
        key: 6,
        name: 'Where is my son',
        price: "1.49",
        cents: 149,
        color: "red",
        icon: () => <GiClownfish className={`text-red-500 group-hover:animate-award`} size={50}/>
    },
    {
        key: 7,
        name: 'Fake Money',
        price: "2.49",
        cents: 249,
        color: "green",
        icon: () => <GiBanknote className={`text-green-500 group-hover:animate-award`} size={50}/>
    },
    {
        key: 8,
        name: 'Snek',
        price: "0.99",
        cents: 99,
        color: "yellow",
        icon: () => <GiCobra className={`text-yellow-500 group-hover:animate-award`} size={50}/>
    },
]