"use client";

import { ShoppingBag, Search, UserRound } from "lucide-react";
import { Menubar } from "./menubar";
import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useSidebar } from "@/hooks/useSidebar";

export function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { open } = useSidebar("cart");

	const handleMenuToggle = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<div className="min-h-[56px] bg-[#f8f8f8]">
			<motion.nav className="fixed top-0 w-full bg-white py-4 px-6 z-100 border-b-1 border-zinc-200">
				<div className="flex items-center justify-between">
					<div className="flex items-center z-10">
						<Menubar isMenuOpen={isMenuOpen} onToggle={handleMenuToggle} />
					</div>

					<div className="absolute left-0 right-0 mx-auto w-full flex justify-center">
						<Link href="/" className="text-xl font-semibold">
							VisionHand
						</Link>
					</div>

					<div className="flex items-center space-x-6 z-10">
						<button className="focus:outline-none">
							<Search size={22} />
						</button>

						<button
							className="focus:outline-none relative cursor-pointer"
							onClick={open}
						>
							<ShoppingBag size={22} />
							<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
								0
							</span>
						</button>

						<button className="focus:outline-none">
							<Link href="/profile">
								<UserRound size={22} />
							</Link>
						</button>
					</div>
				</div>

				<AnimatePresence>
					{isMenuOpen && (
						<motion.div
							initial={{ height: 0 }}
							animate={{ height: "auto" }}
							exit={{ height: 0 }}
							className="overflow-hidden"
						>
							<div className="flex justify-center p-8">
								<div className="py-4 px-8 hover:bg-gray-100">
									<Link href="/products" onClick={() => handleMenuToggle()}>
										Products
									</Link>
								</div>
								<div className="py-4 px-8 hover:bg-gray-100">
									<Link href="/new-product" onClick={() => handleMenuToggle()}>
										Add Product
									</Link>
								</div>
								<div className="py-4 px-8 hover:bg-gray-100">
									<a href="/portfolio" className="text-gray-800 text-lg">
										Portfolio
									</a>
								</div>
								<div className="py-4 px-8 hover:bg-gray-100">
									<a href="/kontakt" className="text-gray-800 text-lg">
										Kontakt
									</a>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.nav>
		</div>
	);
}
