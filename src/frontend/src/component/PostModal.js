import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useRef, useState} from "react";
import {createPost} from "../service/service";
import toast from "react-hot-toast";

const PostModal = ({closeModal, isOpen, loadPosts}) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState({preview: "", raw: ""});
    const inputRef = useRef(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            if (title.trim() === '') {
                setError("At least put some effort into your 💩 post");
                return;
            }
            if (content.trim() === "" && image.raw === "") {
                setError("At least put some effort into your 💩 post")
                return;
            }

            setLoading(true);
            let formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            formData.append("file", image.raw);
            await createPost(formData);
            toast.success("Post created, Very Nice!");
            close();
            loadPosts();
        } catch (e) {
            setError(e.response.data);
        } finally {
            setLoading(false);
        }
    }

    const close = () => {
        closeModal();
        setImage({preview: "", raw: ""});
        setTitle("");
        setContent("");
        setError("");
    }

    const handleImageUpload = e => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-30 overflow-y-auto"
                onClose={close}
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
                                Create a new post
                            </Dialog.Title>
                            {error && <p className="text-left font-semibold text-red-500">{error}</p>}
                            <form className="mt-2 space-y-4" onSubmit={submitHandler}>
                                <input type="text"
                                       disabled={loading}
                                       className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                                       placeholder="Title"
                                       onChange={e => setTitle(e.target.value)}
                                />
                                <textarea
                                    disabled={loading}
                                    className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                                    id="comment" placeholder="Shenanigans" name="comment" rows="8" cols="40"
                                    onChange={e => setContent(e.target.value)}
                                />
                                {image.preview &&
                                <img src={image.preview} className="flex mx-auto max-h-72" alt="preview"/>}
                                <div className="flex ">
                                    <input
                                        type="file"
                                        hidden
                                        disabled={loading}
                                        ref={inputRef}
                                        style={{display: "none"}}
                                        onChange={handleImageUpload}
                                    />
                                    <button className="border-2 font-semibold border-red-500 rounded-full px-3 py-1 "
                                            onClick={(e) => {
                                                e.preventDefault();
                                                inputRef.current.click();
                                            }}>Upload
                                    </button>
                                </div>
                                <button
                                    disabled={loading}
                                    className={`${loading && 'opacity-75 cursor-not-allowed'} w-full cursor-pointer rounded-lg text-white focus:outline-none font-semibold p-2 bg-gradient-to-r from-red-600 to-yellow-500`}>
                                    {loading ? "Shitposting 💩" : "Post 🚀"}
                                </button>
                            </form>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}

export default PostModal;

