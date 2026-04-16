"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CreateEventDrawer from "@/components/CreateEventDrawer";

export default function Dashboard() {
    const [events, setEvents] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [activeTab, setActiveTab] = useState("event");
    const [selectedType, setSelectedType] = useState("One-on-one"); // ✅ NEW

    const router = useRouter();

    // FETCH EVENTS
    const fetchEvents = async () => {
        try {
            const res = await fetch("http://localhost:4000/api/v1/event-types");
            const data = await res.json();
            setEvents(data.data || []);
        } catch (err) {
            console.error("Error:", err);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-50">

            {/* SIDEBAR */}
            <div className="w-64 bg-white border-r p-6">

                {/* LOGO */}
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-full border-4 border-blue-600 border-r-transparent"></div>
                    <h1 className="text-lg font-bold tracking-wide">CALENDLY</h1>
                </div>

                {/* CREATE */}
                <button
                    onClick={() => setShowDropdown((prev) => !prev)}
                    className="w-full border rounded-full py-2 font-medium hover:bg-gray-100"
                >
                    + Create
                </button>

                {/* DROPDOWN */}
                {showDropdown && (
                    <div className="mt-4 bg-white border rounded-xl shadow p-4 space-y-4">

                        {["One-on-one", "Group", "Round robin"].map((type) => (
                            <div
                                key={type}
                                onClick={() => {
                                    localStorage.setItem("eventType", type);
                                    setSelectedType(type); // ✅ IMPORTANT
                                    setOpenDrawer(true);
                                    setShowDropdown(false);
                                }}
                                className="cursor-pointer"
                            >
                                <p className="font-semibold text-blue-600">{type}</p>

                                {type === "One-on-one" && (
                                    <>
                                        <p className="text-sm text-gray-500">1 host → 1 invitee</p>
                                        <p className="text-sm text-gray-400">
                                            Good for coffee chats
                                        </p>
                                    </>
                                )}

                                {type === "Group" && (
                                    <>
                                        <p className="text-sm text-gray-500">1 host → Multiple invitees</p>
                                        <p className="text-sm text-gray-400">
                                            Webinars, classes
                                        </p>
                                    </>
                                )}

                                {type === "Round robin" && (
                                    <>
                                        <p className="text-sm text-gray-500">Rotating hosts</p>
                                        <p className="text-sm text-gray-400">
                                            Team distribution
                                        </p>
                                    </>
                                )}
                            </div>
                        ))}

                    </div>
                )}

                {/* NAVIGATION ✅ FIXED */}
                <div className="mt-6 space-y-4 text-gray-600">

                    <p
                        onClick={() => router.push("/dashboard")}
                        className="cursor-pointer hover:text-black"
                    >
                        Scheduling
                    </p>

                    <p
                        onClick={() => router.push("/meetings")}
                        className="cursor-pointer hover:text-black"
                    >
                        Meetings
                    </p>

                    <p
                        onClick={() => router.push("/availability")}
                        className="cursor-pointer hover:text-black"
                    >
                        Availability
                    </p>

                </div>
            </div>

            {/* MAIN */}
            <div className="flex-1 p-10">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Scheduling</h1>

                    <button
                        onClick={() => setShowDropdown((prev) => !prev)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
                    >
                        + Create
                    </button>
                </div>

                {/* TABS */}
                <div className="flex gap-6 border-b mb-6">
                    {["event", "single", "polls"].map((tab) => (
                        <p
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-2 cursor-pointer ${
                                activeTab === tab
                                    ? "border-b-2 border-blue-600"
                                    : "text-gray-500"
                            }`}
                        >
                            {tab === "event"
                                ? "Event types"
                                : tab === "single"
                                ? "Single-use links"
                                : "Meeting polls"}
                        </p>
                    ))}
                </div>

                {/* EVENT TYPES */}
                {activeTab === "event" && (
                    <>
                        {events.length === 0 ? (
                            <div className="bg-white border rounded-xl p-10 text-center">
                                <p className="text-gray-500">No event types found.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {events.map((e) => (
                                    <div
                                        key={e.id}
                                        className="bg-white border rounded-xl p-4 flex justify-between"
                                    >
                                        <div>
                                            <p className="font-semibold">{e.title}</p>

                                            {/* ✅ FIXED TYPE DISPLAY */}
                                            <p className="text-sm text-gray-500">
                                                {e.duration} min • {e.type || "One-on-One"}
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => router.push(`/book/${e.slug}`)}
                                            className="text-blue-600"
                                        >
                                            View
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* DRAWER */}
            <CreateEventDrawer
                open={openDrawer}
                type={selectedType} // ✅ PASS TYPE
                onClose={() => setOpenDrawer(false)}
                onCreate={() => {
                    fetchEvents();
                    setOpenDrawer(false);
                }}
            />
        </div>
    );
}