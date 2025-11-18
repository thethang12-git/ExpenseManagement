import React, {useRef, useState} from "react";
import {HiOutlineMagnifyingGlass} from "react-icons/hi2";
import {createPortal} from "react-dom";

export default function SearchModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [query, setQuery] = useState("");
    const [scale, setScale] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const openModal = () => {
        setIsOpen(true);
        setTimeout(() => setShow(true), 10);
        setTimeout(() => inputRef.current?.focus() , 100);
    };

    const closeModal = () => {
        setShow(false);
        setTimeout(() => setIsOpen(false), 200);
    };

    const handleFocus = () => {
        setScale(true);
        setTimeout(() => setScale(false), 200); // Scale lại về bình thường sau 200ms
    };

    return (
        <>
            <button
                onClick={openModal}
                className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-110 hover:shadow-md group"
                aria-label="Search"
            >
                <HiOutlineMagnifyingGlass className="text-xl text-gray-600 group-hover:text-orange-600 transition-colors" />
            </button>

            {isOpen && createPortal(
                <div className="fixed inset-0 z-50 flex items-start justify-center m-0 ">
                    {/* Backdrop */}
                    <div
                        className={`fixed inset-0 bg-black transition-opacity ${
                            show ? "opacity-50" : "opacity-0"
                        }`}
                        onClick={closeModal}
                    ></div>

                    {/* Modal Panel */}
                    <div
                        className={`bg-white rounded-3xl shadow-md max-w-3xl w-full mx-4 z-50 transform transition-all duration-200 ${
                            show ? "opacity-100 scale-100" : "opacity-0 scale-95"
                        } ${scale ? "scale-105" : ""}`}
                        style={{ marginTop: "10%" }}
                    >
                        {/* Header with input */}
                        <div className="flex justify-between items-center px-6 py-4">
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onFocus={handleFocus}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform duration-200"
                            />
                        </div>

                        {/* Body */}
                        <div style={{ transformOrigin: "top" }} className={`transition-all duration-300 ease-in-out p-6 text-gray-700 max-h-[60vh] overflow-x-hidden overflow-y-auto ${query.trim() === ""  ? "scale-y-0 opacity-0" : "scale-y-100 opacity-100"}`}>
                            {query.trim() === "" ? (
                                <span className="text-gray-400">Trống</span>
                            ) : (
                                <div style={{ display: "flex",flexDirection: "column",width: "100%",gap:'20px' }}>
                                    <div className="w-full bg-white p-5 mb-4 rounded-lg shadow-md flex items-center justify-between hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-linear-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                                                🍔
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-lg font-semibold text-gray-800">sadasd</span>
                                                <span className="text-sm text-gray-500">ădawdawd</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className={`font-bold ${ 1 < 0 ?"text-red-500" : "text-green-500" } `}>ădawdawdad</span>
                                            <div className="text-sm text-gray-400">123123123</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end gap-3 px-6 py-4">
                            <button
                                onClick={closeModal}
                                style={{borderRadius:'8px'}}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md shadow-sm transition-all duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    alert("Confirmed!");
                                    closeModal();
                                }}
                                style={{borderRadius: '8px'}}
                                className=" px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-sm transition-all duration-200"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>, document.body
            )
            }
        </>
    )
}
