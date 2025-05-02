"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function DropdownText({
	title,
	text,
}: {
	title: string;
	text: string;
}) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<div className="relative mb-4">
			<div className="relative bg-background overflow-hidden">
				<button
					type="button"
					className="flex justify-between gap-2 text-xl py-2 cursor-pointer w-full relative z-20 border-b border-gray-200 focus:outline-none"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
					<div>{title}</div>
					<motion.div
						initial={{ rotate: 0 }}
						animate={{ rotate: isMenuOpen ? 180 : 0 }}
					>
						<ChevronDown />
					</motion.div>
					<div
						className={`absolute bg-black h-[1px] bottom-0 transition-[width] duration-300 ${
							isMenuOpen ? "w-full" : "w-0"
						}`}
					/>
				</button>
			</div>

			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						initial={{ height: 0 }}
						animate={{ height: "auto" }}
						exit={{ height: 0 }}
						className="w-full backdrop-blur-md overflow-hidden z-10"
					>
						<>
							<div className="p-2">{text}</div>
						</>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
