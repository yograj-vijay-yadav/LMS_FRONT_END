import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

export default function Footer() {
    // Social media icons data
    const socialLinks = [
        { name: "Facebook", icon: Facebook, url: "#" },
        { name: "Instagram", icon: Instagram, url: "#" },
        { name: "Twitter", icon: Twitter, url: "#" },
        { name: "LinkedIn", icon: Linkedin, url: "#" },
        { name: "GitHub", icon: Github, url: "#" }
    ];

    // Navigation links data
    const navLinks = ["Home", "About", "Services", "Contact", "Help", "Privacy Policy", "Terms of Use"];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
                
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            
            <footer 
                className="flex flex-col py-14 text-sm justify-center items-center w-full"
                style={{
                    background: "linear-gradient(to bottom, #000000, #1a0010, #2a0a1a)"
                }}
            >
                <div className="container mx-auto px-6">
                    
                    {/* Navigation Links */}
                    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mb-8">
                        {navLinks.map((link, index) => (
                            <a 
                                key={index}
                                href="#" 
                                className="font-medium text-gray-400 hover:text-pink-400 transition-all duration-300 hover:scale-105"
                            >
                                {link}
                            </a>
                        ))}
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex items-center justify-center gap-4 md:gap-5 mb-8">
                        {socialLinks.map((social, index) => {
                            const Icon = social.icon;
                            return (
                                <a 
                                    key={index}
                                    href={social.url}
                                    className="p-2 border border-pink-500 rounded-full hover:bg-pink-500 hover:scale-110 transition-all duration-300"
                                    aria-label={social.name}
                                >
                                    <Icon size={20} className="text-pink-400 hover:text-white transition" />
                                </a>
                            );
                        })}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-pink-500/20 my-6"></div>

                    {/* Copyright */}
                    <p className="text-center text-gray-500 text-sm">
                        Copyright © 2025 <a href="#" className="text-pink-400 hover:text-pink-300 transition">LMS Platform</a>. All rights reserved.
                    </p>
                </div>
            </footer>
        </>
    );
}