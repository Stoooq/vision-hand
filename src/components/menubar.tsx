import { motion } from "motion/react";
import { useState } from "react";

interface MenubarProps {
	onToggle: () => void;
}

export function Menubar({ onToggle }: MenubarProps) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
		onToggle();
	};

	return (
		<div className="relative">
			{/* Hamburger Icon */}

			<div
				className="flex flex-col justify-between w-8 h-6 cursor-pointer z-50 relative"
				onClick={toggleMenu}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="lucide lucide-menu"
				>
					<motion.line
						initial={{ opacity: 1 }}
						animate={{ opacity: isOpen ? 0 : 1, transition: { duration: 0.1 } }}
						x1="4"
						x2="20"
						y1="12"
						y2="12"
					/>
					<motion.line
						initial={{rotate: 0, y: 0}}
                        animate={{rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0}}
						x1="4"
						x2="20"
						y1="6"
						y2="6"
					/>
					<motion.line
						initial={{rotate: 0, y: 0}}
                        animate={{rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0}}
						x1="4"
						x2="20"
						y1="18"
						y2="18"
					/>
				</svg>
			</div>
		</div>
	);
}
