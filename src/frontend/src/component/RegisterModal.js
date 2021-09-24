import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useRef, useState} from "react";
import {createPost} from "../service/service";
import {useForm} from "react-hook-form";

const RegisterModal = ({closeModal, isOpen, handleRegister}) => {
    const [errorMessage, setErrorMessage] = useState("");
    const {register, handleSubmit, watch, reset, formState: {errors, isValid}} = useForm({mode: 'onChange'});
    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = async (data) => {
        try {
            await handleRegister(data);
            setErrorMessage("");
            closeModal();
        } catch (e) {
            setErrorMessage(e);
        }
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={() => {
                    reset();
                    closeModal();
                    setErrorMessage("");
                }}
            >
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-70 transition-opacity"/>
                    </Transition.Child>
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
              &#8203;
            </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div
                            className="inline-block w-full max-w-lg px-8 py-6 overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium text-center text-gray-900 pb-3"
                            >
                                Create an account
                            </Dialog.Title>
                            {errorMessage !== "" && <p className="text-red-500 text-sm text-left">{errorMessage}</p>}
                            <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
                                <input
                                    {...register("username", {
                                        required: "Username is required", minLength: {
                                            value: 2,
                                            message: "Username is required"
                                        },
                                        maxLength: {
                                            value: 18,
                                            message: "username is invalid"
                                        },
                                        pattern: {
                                            value: /^[a-z ,.'-]+$/i,
                                            message: "Invalid Username"
                                        }
                                    })}
                                    type="text"
                                    className={`${errors.username && "ring-2 ring-red-500"} rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2.5 px-3 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent`}
                                    autoComplete="off"
                                    autoFocus
                                    placeholder="Username"
                                />
                                {errors.username &&
                                <p className="mt-1 text-left text-normal text-red-500 ">{errors.username.message}</p>}

                                {/* Password */}
                                <input
                                    {...register("password", {
                                        required: "You must specify a password",
                                        minLength: {
                                            value: 6,
                                            message: "Password must have at least 6 characters"
                                        },
                                    })}
                                    type="password"
                                    className={`${errors.username && "ring-2 ring-red-500"} mt-6 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2.5 px-3 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent`}
                                    autoComplete="off"
                                    placeholder="Password"
                                />
                                {errors.password &&
                                <p className="mt-1 text-left text-normal text-red-500 ">{errors.password.message}</p>}

                                {/* Verify Password */}
                                <input
                                    {...register("verifyPassword", {
                                        validate: value =>
                                            value === password.current || "The passwords do not match"
                                    })}
                                    type="password"
                                    className={`${errors.username && "ring-2 ring-red-500"} mt-6 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2.5 px-3 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent`}
                                    autoComplete="off"
                                    placeholder="Verify Password"
                                />
                                {errors.verifyPassword &&
                                <p className="mt-1 text-left text-normal text-red-500 ">{errors.verifyPassword.message}</p>}

                                <button
                                    className="mt-6 w-full cursor-pointer rounded-lg text-white focus:outline-none font-semibold p-2 bg-gradient-to-r from-red-600 to-yellow-500">
                                    Create Account
                                </button>
                            </form>


                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}

export default RegisterModal;

