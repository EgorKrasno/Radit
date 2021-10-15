import {Toaster} from "react-hot-toast";

const Toast = () => {
    return (<Toaster
        toastOptions={{
            success: {
                style: {
                    background: '#E0F5E9',
                },
            },
            error: {
                style: {
                    background: '#FADEDE',
                },
            },
        }}/>);
}

export default Toast;