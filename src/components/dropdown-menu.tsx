"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function DropdownMenu({ title, items }: { title: string, items: string[] }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<>
			<div className="relative h-full bg-blue-200">
				<button
					className="flex gap-2 cursor-pointer p-2"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
					<div>{title}</div>
					<motion.div
						initial={{ rotate: 0 }}
						animate={{ rotate: isMenuOpen ? 180 : 0 }}
					>
						<ChevronDown />
					</motion.div>
				</button>
				<AnimatePresence>
					{isMenuOpen && (
						<motion.div
							initial={{ height: 0 }}
							animate={{ height: "auto" }}
							exit={{ height: 0 }}
							className="absolute bottom-0 translate-y-[100%] w-full bg-green-200 overflow-hidden"
						>
							<div className="flex flex-col">
                                {items.map((item, index) => (
                                    <div key={index} className="p-4">{item}</div>
                                ))}
                            </div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</>
	);
}
