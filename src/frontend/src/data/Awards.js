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
        color: "hover:bg-red-50 dark:hover:bg-opacity-10",
        icon: (small) => <GiChiliPepper className={`text-red-500 ${!small && 'group-hover:animate-award'}`} size={small ? 25 : 50}/>
    },
    {
        key: 2,
        name: 'Holy Grail',
        price: "0.99",
        cents: 99,
        color: "hover:bg-yellow-50 dark:hover:bg-opacity-10",
        icon: (small) => <GiHolyGrail className={`text-yellow-400 ${!small && 'group-hover:animate-award'}`} size={small ? 25 : 50}/>
    },
    {
        key: 3,
        name: 'Trash',
        price: "0.99",
        cents: 99,
        color: "hover:bg-yellow-50 dark:hover:bg-opacity-10",
        icon: (small) => <GiTrashCan className={`text-yellow-800 ${!small && 'group-hover:animate-award'}`} size={small ? 25 : 50}/>
    },
    {
        key: 4,
        name: 'Zucked',
        price: "0.99",
        cents: 99,
        color: "hover:bg-purple-50 dark:hover:bg-opacity-10",
        icon: (small) => <RiAliensFill className={`text-purple-800 ${!small && 'group-hover:animate-award'}`} size={small ? 25 : 50}/>
    },
    {
        key: 5,
        name: 'Cupcake',
        price: "0.99",
        cents: 99,
        color: "hover:bg-pink-50 dark:hover:bg-opacity-10",
        icon: (small) => <GiCupcake className={`text-pink-500 ${!small && 'group-hover:animate-award'}`} size={small ? 25 : 50}/>
    },
    {
        key: 6,
        name: 'Where is my son',
        price: "1.49",
        cents: 149,
        color: "hover:bg-red-50 dark:hover:bg-opacity-10",
        icon: (small) => <GiClownfish className={`text-red-500 ${!small && 'group-hover:animate-award'}`} size={small ? 25 : 50}/>
    },
    {
        key: 7,
        name: 'Fake Money',
        price: "2.49",
        cents: 249,
        color: "hover:bg-green-50 dark:hover:bg-opacity-10",
        icon: (small) => <GiBanknote className={`text-green-500 ${!small && 'group-hover:animate-award'}`} size={small ? 25 : 50}/>
    },
    {
        key: 8,
        name: 'Snek',
        price: "0.99",
        cents: 99,
        color: "hover:bg-yellow-50 dark:hover:bg-opacity-10",
        icon: (small) => <GiCobra className={`text-yellow-500 ${!small && 'group-hover:animate-award'}`} size={small ? 25 : 50}/>
    },
]