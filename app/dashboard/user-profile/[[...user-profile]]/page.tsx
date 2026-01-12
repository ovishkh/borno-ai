"use client";

import { UserProfile } from "@clerk/nextjs";

export default function UserProfilePage() {
    return (
        <div className="flex items-center justify-center p-4 md:p-8 min-h-[calc(100vh-64px)] overflow-y-auto">
            <UserProfile
                routing="path"
                path="/dashboard/user-profile"
                appearance={{
                    elements: {
                        rootBox: "mx-auto shadow-xl rounded-2xl border border-gray-100",
                        card: "rounded-2xl",
                    }
                }}
            />
        </div>
    );
}
