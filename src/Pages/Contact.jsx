import { useState } from "react";
import { toast } from "react-hot-toast";
import { Mail, Phone, MapPin, Github, Twitter, Facebook, Instagram, Send } from "lucide-react";

import { isEmail } from "../Helpers/regexMatcher";
import HomeLayout from "../Layouts/HomeLayout";
import axiosInstance from "../Helpers/axiosInstace";

function Contact() {

    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        message: "",
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        });
    }

    async function onFormSubmit(e) {
        e.preventDefault();

        if (!userInput.email || !userInput.name || !userInput.message) {
            toast.error("All fields are mandatory");
            return;
        }

        if (!isEmail(userInput.email)) {
            toast.error("Invalid email");
            return;
        }

        try {
            const response = axiosInstance.post("/contact", userInput);

            toast.promise(response, {
                loading: "Submitting your message...",
                success: "Form submitted successfully",
                error: "Failed to submit the form"
            });

            const contactResponse = await response;

            if (contactResponse?.data?.success) {
                setUserInput({
                    name: "",
                    email: "",
                    message: "",
                });
            }

        } catch (err) {
            toast.error("operation failed....");
        }
    }

    return (
        <HomeLayout>

          <section className="w-full pt-24 pb-16 max-w-[1000px] mx-auto px-6">

                {/* TITLE */}
                <h2 className="mb-4 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-700 bg-clip-text text-center text-4xl md:text-5xl font-bold text-transparent">
                    Let's Get in Touch
                </h2>

                <p className="text-gray-400 mb-12 text-center text-lg">
                    Fill out the form below and we'll get back to you as soon as possible.
                </p>

                {/* MAIN CONTAINER */}
                <div
                    className="grid w-full gap-12 rounded-2xl border border-pink-500 px-8 py-10 shadow-2xl md:grid-cols-2 items-start min-h-[500px]"
                    style={{
                        background: "linear-gradient(to bottom, #1a0010, #3b0a2a, #000000)"
                    }}
                >

                    {/* FORM */}
                    <form onSubmit={onFormSubmit} className="space-y-6 text-gray-200">

                        <div>
                            <label className="text-lg font-medium text-gray-300">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={userInput.name}
                                onChange={handleInputChange}
                                placeholder="Enter your name"
                                className="w-full mt-2 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500 transition"
                            />
                        </div>

                        <div>
                            <label className="text-lg font-medium text-gray-300">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={userInput.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email"
                                className="w-full mt-2 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500 transition"
                            />
                        </div>

                        <div>
                            <label className="text-lg font-medium text-gray-300">
                                Message
                            </label>
                            <textarea
                                name="message"
                                value={userInput.message}
                                onChange={handleInputChange}
                                placeholder="Enter your message"
                                className="w-full mt-2 px-4 py-3 h-36 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500 transition resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-pink-500 hover:bg-pink-600 transition py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 text-lg shadow-lg"
                        >
                            Submit <Send size={18} />
                        </button>

                    </form>

                    {/* CONTACT INFO */}
                    <div className="flex flex-col justify-start pt-2 space-y-4 ml-14  text-gray-300">

                        <h3 className="mt-1 text-2xl font-semibold text-pink-400">
                            Connect with Us
                        </h3>

                        {/* EMAIL */}
                        <div className="mt-8 flex items-start gap-4">
                            <div className="p-2 border border-pink-500 rounded-full">
                                <Mail className="text-white" />
                            </div>
                            <div className="text-gray-300">
                                <p className="font-medium">Email us</p>
                                <p className="text-gray-400 text-sm">subha9.5roy350@gmail.com</p>
                            </div>
                        </div>

                        {/* PHONE */}
                        <div className="mt-8 flex items-start gap-4">
                            <div className="p-2 border border-pink-500 rounded-full">
                                <Phone className="text-white" />
                            </div>
                            <div className="text-gray-300">
                                <p className="font-medium">Call us</p>
                                <p className="text-gray-400 text-sm">XXXXX XXXXX</p>
                            </div>
                        </div>

                        {/* LOCATION */}
                        <div className="mt-8 flex items-start gap-4">
                            <div className="p-2 border border-pink-500 rounded-full">
                                <MapPin className="text-white" />
                            </div>
                            <div className="text-gray-300">
                                <p className="font-medium">Location</p>
                                <p className="text-gray-400 text-sm">
                                    Techno Main Salt Lake, Kolkata
                                </p>
                            </div>
                        </div>

                        {/* SOCIALS */}
                        <div className="flex gap-5 mt-12 ml-2">
                            {[Twitter, Facebook, Instagram, Github].map((Icon, i) => (
                                <div
                                    key={i}
                                    className="p-3  border border-pink-500 rounded-full hover:bg-pink-500 transition cursor-pointer"
                                >
                                    <Icon className="text-white" size={18} />
                                </div>
                            ))}
                        </div>

                    </div>

                </div>

            </section>

        </HomeLayout>
    );
}

export default Contact;