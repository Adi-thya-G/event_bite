import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 font-mono mt-10 w-full">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="w-full flex flex-wrap justify-between gap-y-10 gap-x-10 sm:gap-x-20 py-10">
            {/* Our Services */}
            <div className="w-full sm:w-[45%] md:w-[22%]">
              <h2 className="mb-6 text-[17px] font-semibold text-gray-900 uppercase dark:text-white">Our Service</h2>
              <ul className="text-gray-600 dark:text-gray-400 text-[15px] space-y-3">
                <li><a href="#" className="hover:underline hover:text-orange-400">Wedding Event</a></li>
                <li><a href="#" className="hover:underline hover:text-orange-400">60th Wedding Event</a></li>
                <li><a href="#" className="hover:underline hover:text-orange-400">Birthday Party</a></li>
                <li><a href="#" className="hover:underline hover:text-orange-400">Reception</a></li>
                <li><a href="#" className="hover:underline hover:text-orange-400">Achievements</a></li>
              </ul>
            </div>

            {/* Menu */}
            <div className="w-full sm:w-[45%] md:w-[22%]">
              <h2 className="mb-6 text-[17px] font-semibold text-gray-900 uppercase dark:text-white">Menu</h2>
              <ul className="text-gray-600 dark:text-gray-400 space-y-3">
                <li><a href="#" className="hover:underline hover:text-orange-400">Starters</a></li>
                <li><a href="#" className="hover:underline hover:text-orange-400">Main Course</a></li>
                <li><a href="#" className="hover:underline hover:text-orange-400">Desserts</a></li>
                <li><a href="#" className="hover:underline hover:text-orange-400">Chats</a></li>
                <li><a href="#" className="hover:underline hover:text-orange-400">Mocktail</a></li>
              </ul>
            </div>

            {/* Contact Now */}
            <div className="w-full sm:w-[45%] md:w-[22%]">
              <h2 className="mb-6 text-[17px] font-semibold text-gray-900 uppercase dark:text-white">Contact Now</h2>
              <ul className="text-gray-600 dark:text-gray-400 text-[15px] space-y-3">
                <li className="flex items-center">
                  📞 <a href="tel:+919741781136" className="ml-2 hover:underline hover:text-orange-400">9741781136</a>
                </li>
                <li className="flex items-center">
                  📧 <a href="mailto:eventbite.official@gmail.com" className="ml-2 hover:underline hover:text-orange-400">eventbite.official@gmail.com</a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="w-full sm:w-[45%] md:w-[22%]">
              <h2 className="mb-6 text-[17px] font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
              <ul className="text-gray-600 dark:text-gray-400 space-y-3">
                <li><a href="#" className="hover:underline hover:text-orange-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline hover:text-orange-400">Terms &amp; Conditions</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-200 dark:border-gray-700 py-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 dark:text-gray-300">
            <span>© 2025 <Link to="/" className="hover:underline">EventBite™</Link>. All Rights Reserved.</span>
            <div className="mt-4 sm:mt-0 flex space-x-4">
              <a href="#" className="hover:text-orange-400">Facebook</a>
              <a href="#" className="hover:text-orange-400">Twitter</a>
              <a href="#" className="hover:text-orange-400">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer