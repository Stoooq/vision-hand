"use client"

import { signout } from "@/actions/signout";

export function SignOutButton() {
	const handleSignOut = async () => {
		await signout();
	};

	return <button onClick={handleSignOut} className="cursor-pointer">Signout</button>;
}
