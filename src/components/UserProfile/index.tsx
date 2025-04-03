import { AccountCircle } from '@mui/icons-material';
import React, { useState } from 'react';

export default function Index() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className="relative">
            <button 
                className="p-2 rounded-full h-12 w-12 flex items-center justify-center"
                onClick={() => setIsOpen(true)}
            >
                <AccountCircle className="text-[#1e3245]" fontSize="large" />
            </button>
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-10" 
                    onClick={() => setIsOpen(false)}
                >
                    <div 
                        className="fixed top-0 right-0 h-full w-64 bg-white shadow-md p-4 z-20"
                        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the sidebar
                    >
                        <button className="w-full text-left p-2 hover:bg-gray-100">Profile</button>
                        <button className="w-full text-left p-2 hover:bg-gray-100">Settings</button>
                        <button className="w-full text-left p-2 hover:bg-gray-100">Logout</button>
                    </div>
                </div>
            )}
        </div>
    );
}
