import StripeCheckout from 'react-stripe-checkout';
import {onToken} from "../service/service";

const Checkout = ({awardId, amount, name, handleClose}) => {

    return (
        <StripeCheckout
            amount={amount}
            billingAddress
            // description="Awesome Product"
            image="/pepper-icon.png"
            locale="auto"
            name={name + ' award'}
            stripeKey="pk_test_51JhP27Ii8cxaK5wbpolSWcUFZzUxgQaaV4G9aAI88onmoOVa110uqdhuScdP2tBzmkhaNdjF32Xr1ktI7lSI083a00VCndDqO1"
            token={(token) => onToken(token, awardId)}
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