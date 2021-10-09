import StripeCheckout from 'react-stripe-checkout';
import {onToken} from "../service/service";
import toast from "react-hot-toast";
import {useHistory} from "react-router-dom";

const Checkout = ({awardId, postId, amount, name, handleClose}) => {
    let history = useHistory();

    const onSubmit = async (token) => {
        try {
            const response = await onToken(token, awardId, postId);
            toast.success("Success");
        } catch (e) {
            toast.error(e.response.data);
        } finally {
            history.push("/temp");
            history.goBack();
        }

    }


    return (
        <StripeCheckout
            amount={amount}
            billingAddress
            // description="Awesome Product"
            image="/pepper-icon.png"
            locale="auto"
            name={name + ' award'}
            stripeKey="pk_test_51JhP27Ii8cxaK5wbpolSWcUFZzUxgQaaV4G9aAI88onmoOVa110uqdhuScdP2tBzmkhaNdjF32Xr1ktI7lSI083a00VCndDqO1"
            token={onSubmit}
            zipCode
        >
            <button
                onClick={handleClose}
                className="shadow-md mt-6 w-full cursor-pointer rounded-lg text-white focus:outline-none text-xl font-bold p-2 bg-gradient-to-r from-red-600 to-yellow-500">
                Next
            </button>
        </StripeCheckout>
    )
}

export default Checkout;