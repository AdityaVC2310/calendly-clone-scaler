"use client";

import { useEffect, useState } from "react";

export default function MeetingsPage() {
    const [meetings, setMeetings] = useState([]);
    const [tab, setTab] = useState("upcoming");

    const userId = "demo-user-id"; // replace later

    const fetchMeetings = async () => {
        try {
            const res = await fetch(
                `http://localhost:4000/api/v1/meetings/${userId}`
            );
            const data = await res.json();

            setMeetings(data.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchMeetings();
    }, []);

    const handleCancel = async (id) => {
        try {
            await fetch(
                `http://localhost:4000/api/v1/meetings/cancel/${id}`,
                {
                    method: "PUT",
                }
            );

            alert("❌ Meeting Cancelled");
            fetchMeetings();

        } catch (err) {
            console.error(err);
        }
    };

    const now = new Date();

    const upcoming = meetings.filter(
        (m) => new Date(m.startTime) > now && m.status !== "CANCELLED"
    );

    const past = meetings.filter(
        (m) => new Date(m.startTime) <= now
    );

    const displayData = tab === "upcoming" ? upcoming : past;

    return (
        <div className="p-10 bg-gray-50 min-h-screen">

            <h1 className="text-3xl font-bold mb-6">Meetings</h1>

            {/* TABS */}
            <div className="flex gap-6 mb-6">
                <button
                    onClick={() => setTab("upcoming")}
                    className={tab === "upcoming" ? "font-bold text-blue-600" : ""}
                >
                    Upcoming
                </button>

                <button
                    onClick={() => setTab("past")}
                    className={tab === "past" ? "font-bold text-blue-600" : ""}
                >
                    Past
                </button>
            </div>

            {/* LIST */}
            {displayData.length === 0 ? (
                <p className="text-gray-500">No meetings</p>
            ) : (
                <div className="space-y-4">
                    {displayData.map((m) => (
                        <div
                            key={m.id}
                            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
                        >
                            <div>
                                <p className="font-semibold">{m.title}</p>
                                <p className="text-sm text-gray-500">
                                    {new Date(m.startTime).toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-400">
                                    Status: {m.status}
                                </p>
                            </div>

                            {tab === "upcoming" && (
                                <button
                                    onClick={() => handleCancel(m.id)}
                                    className="text-red-500"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}