import {useEffect, useState} from 'react'
import {Switch} from '@headlessui/react'
import {FiSun, GiNightSky} from "react-icons/all";
import useDarkMode from "../hook/useDarkMode";

export default function CustomLabelExample() {
    const [colorTheme, setTheme] = useDarkMode();
    const [enabled, setEnabled] = useState(colorTheme === 'light')

    const swapTheme = (b) => {
        setEnabled(b);
        b ? setTheme('dark') : setTheme('light');

    }


    return (
        <Switch.Group>
            <div className="flex items-center">
                <Switch.Label className="mr-1"><FiSun className={`${enabled ? 'text-gray-300' : 'text-gray-900'}`} size={19}/></Switch.Label>
                <Switch
                    checked={enabled}
                    onChange={swapTheme}
                    className={`${
                        enabled ? 'bg-gray-900' : 'bg-gray-300'
                    } relative inline-flex items-center h-5 rounded-full w-9 transition-colors focus:outline-none`}
                >
          <span
              className={`${
                  enabled ? 'translate-x-4' : 'translate-x-0.5'
              } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
          />
                </Switch>
                <Switch.Label className="ml-1"><GiNightSky className={`${enabled ? 'text-gray-300' : 'text-gray-900'}`} size={19}/></Switch.Label>
            </div>
        </Switch.Group>
    )
}