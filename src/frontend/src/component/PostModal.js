import {Dialog, Popover, Transition} from "@headlessui/react";
import {Fragment, useEffect, useRef, useState} from "react";
import {createPost} from "../service/service";
import toast from "react-hot-toast";
import {
    FiChevronUp,
    GiCoffeeBeans,
    GiDespair,
    GiFossil,
    GiPerspectiveDiceSixFacesRandom
} from "react-icons/all";


const PostModal = ({closeModal, isOpen, loadPosts, url}) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState({preview: "", raw: ""});
    const inputRef = useRef(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    //TODO: Refactor this mess into somewhere else
    const sections = [
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

    const [section, setSection] = useState(sections[0]);
    useEffect(() => {
        //holy molly how the hell is this monstrosity actually working
        if (isOpen) setSection(sections.filter(s => s.name === window.location.pathname.slice(1))[0] || sections[0]);
    }, [isOpen]);


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
            formData.append("section", section.name.toLowerCase())
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
                onClose={() => {
                    close();
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
                                Create a new post
                            </Dialog.Title>
                            {error && <p className="text-left font-semibold text-red-500">{error}</p>}
                            <form className="mt-2 space-y-4 w-full" onSubmit={submitHandler}>
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

                                <div className="flex w-full">
                                    <input
                                        type="file"
                                        hidden
                                        disabled={loading}
                                        ref={inputRef}
                                        style={{display: "none"}}
                                        onChange={handleImageUpload}
                                    />
                                    <div className="flex w-full">
                                        <button
                                            className="border-2 font-semibold border-red-500 rounded-full px-3 py-1 "
                                            onClick={(e) => {
                                                e.preventDefault();
                                                inputRef.current.click();
                                            }}>Upload
                                        </button>

                                        <div className="border border-gray-200 rounded-lg flex ml-auto">
                                            <Popover className="relative">
                                                <>
                                                    <Popover.Button
                                                        className="px-3 py-2">
                                                        <div className="flex items-center w-56 justify-between">
                                                            <div className="flex items-center">
                                                                {section.icon()}
                                                                <p className="text-gray-900 text-sm">{section.name}</p>
                                                            </div>
                                                            <FiChevronUp size={18} className="text-gray-900"/>
                                                        </div>
                                                    </Popover.Button>
                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-200"
                                                        enterFrom="opacity-0 translate-y-1"
                                                        enterTo="opacity-100 translate-y-0"
                                                        leave="transition ease-in duration-150"
                                                        leaveFrom="opacity-100 translate-y-0"
                                                        leaveTo="opacity-0 translate-y-1"
                                                    >
                                                        <Popover.Panel
                                                            className="absolute z-10 w-full max-w-sm mt-3 bottom-12">
                                                            {({close}) => (
                                                                <div
                                                                    className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                                                    <div className="relative grid gap-8 bg-white p-7">
                                                                        {sections.map((item) => (
                                                                            <div
                                                                                onClick={() => {
                                                                                    setSection(item)
                                                                                    close();
                                                                                }}
                                                                                key={item.name}
                                                                                className="cursor-pointer flex items-center py-1 px-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                                                            >
                                                                                <div
                                                                                    className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-8">
                                                                                    <item.icon/>
                                                                                </div>
                                                                                <div className="ml-2">
                                                                                    <p className="text-sm font-base text-gray-900">
                                                                                        {item.name}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Popover.Panel>
                                                    </Transition>
                                                </>
                                            </Popover>
                                        </div>
                                    </div>
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

