import {
    AiFillHome,
    GiCoffeeBeans,
    GiDespair,
    GiFossil,
    GiPerspectiveDiceSixFacesRandom,
    RiAliensFill
} from "react-icons/all";

export const sections = [
    {
        name: 'All',
        href: '/All',
        icon: (small) => <AiFillHome className={`${!small && "mr-2"} dark:text-white text-gray-900`} size={small ? 18 : 22}/>
    },
    {
        name: 'RareMemes',
        href: '/RareMemes',
        icon: (small) => <GiFossil className={`${!small && "mr-2"} text-yellow-500`} size={small ? 18 : 22}/>
    },
    {
        name: 'Beans',
        href: '/Beans',
        icon: (small) => <GiCoffeeBeans className={`${!small && "mr-2"} text-yellow-900`} size={small ? 18 : 22}/>

    }, {
        name: 'Programming',
        href: '/Programming',
        icon: (small) => <GiDespair className={`${!small && "mr-2"} text-blue-600`} size={small ? 18 : 22}/>
    },
    {
        name: 'Random',
        href: '/Random',
        icon: (small) => <GiPerspectiveDiceSixFacesRandom className={`${!small && "mr-2"} text-red-600`}
                                                          size={small ? 18 : 22}/>
    },
    {
        name: 'Zuck',
        href: '/Zuck',
        icon: (small) => <RiAliensFill className={`${!small && "mr-2"} text-purple-600`}
                                                          size={small ? 18 : 22}/>
    }
]

export const postModalSections = sections.slice(1);