import React from 'react';
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-[#0a0f17] text-gray-400 py-8 mt-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    <div>
                        <h2 className="text-lg font-semibold mb-4 text-white">Company</h2>
                        <ul className="space-y-2">
                            <li><Link href="/" className="hover:text-white">About</Link></li>
                            <li><Link href="/" className="hover:text-white">Jobs</Link></li>
                            <li><Link href="/" className="hover:text-white">For the Record</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-4 text-white">Communities</h2>
                        <ul className="space-y-2">
                            <li><Link href="/" className="hover:text-white">For Artists</Link></li>
                            <li><Link href="/" className="hover:text-white">Developers</Link></li>
                            <li><Link href="/" className="hover:text-white">Advertising</Link></li>
                            <li><Link href="/" className="hover:text-white">Investors</Link></li>
                            <li><Link href="/" className="hover:text-white">Vendors</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-4 text-white">Useful Links</h2>
                        <ul className="space-y-2">
                            <li><Link href="/" className="hover:text-white">Support</Link></li>
                            <li><Link href="/" className="hover:text-white">Free Mobile App</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-4 text-white">Spotify Plans</h2>
                        <ul className="space-y-2">
                            <li><Link href="/" className="hover:text-white">Premium Individual</Link></li>
                            <li><Link href="/" className="hover:text-white">Premium Duo</Link></li>
                            <li><Link href="/" className="hover:text-white">Premium Family</Link></li>
                            <li><Link href="/" className="hover:text-white">Premium Student</Link></li>
                            <li><Link href="/" className="hover:text-white">Spotify Free</Link></li>
                        </ul>
                    </div>

                    <div>
                        <div className="flex space-x-4">
                            <Link href="#" className="hover:text-white"><FaFacebook size="1.5em" /></Link>
                            <Link href="#" className="hover:text-white"><FaTwitter size="1.5em" /></Link>
                            <Link href="#" className="hover:text-white"><FaInstagram size="1.5em" /></Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 my-6"></div>

                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                    <ul className="flex space-x-6 mb-4 md:mb-0">
                        <li><Link href="/" className="hover:text-white">Legal</Link></li>
                        <li><Link href="/" className="hover:text-white">Safety & Privacy Center</Link></li>
                        <li><Link href="/" className="hover:text-white">Privacy Policy</Link></li>
                        <li><Link href="/" className="hover:text-white">Cookies</Link></li>
                        <li><Link href="/" className="hover:text-white">About Ads</Link></li>
                        <li><Link href="/" className="hover:text-white">Accessibility</Link></li>
                    </ul>
                    <p className="text-gray-500">&copy; 2024 Spotify AB</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
