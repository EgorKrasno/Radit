import {AiFillHome, GiCoffeeBeans, GiDespair, GiFossil, GiPerspectiveDiceSixFacesRandom} from "react-icons/all";

export const sections = [
    {
        name: 'All',
        href: '/All',
        icon: () => <AiFillHome className="text-gray-900 mr-2" size={22}/>
    },
    {
        name: 'RareMemes',
        href: '/RareMemes',
        icon: () => <GiFossil className="text-yellow-500 mr-2" size={22}/>
    },
    {
        name: 'Beans',
        href: '/Beans',
        icon: () => <GiCoffeeBeans className="text-yellow-900 mr-2" size={22}/>
    }, {
        name: 'Programming',
        href: '/Programming',
        icon: () => <GiDespair className="text-blue-600 mr-2" size={22}/>
    },
    {
        name: 'Random',
        href: '/Random',
        icon: () => <GiPerspectiveDiceSixFacesRandom className="text-red-600 mr-2" size={22}/>
    }
]

export const postModalSections = sections.slice(1);