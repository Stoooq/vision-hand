import { motion } from "motion/react";

interface MenubarProps {
    isMenuOpen: boolean;
	onToggle: () => void;
}

export function Menubar({ isMenuOpen, onToggle }: MenubarProps) {
	return (
		<div className="relative">
			<div className="cursor-pointer" onClick={onToggle}>
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
						animate={{ opacity: isMenuOpen ? 0 : 1, transition: { duration: 0.1 } }}
						x1="4"
						x2="20"
						y1="12"
						y2="12"
					/>
					<motion.line
						initial={{rotate: 0, y: 0}}
						animate={{rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6 : 0}}
						x1="4"
						x2="20"
						y1="6"
						y2="6"
					/>
					<motion.line
						initial={{ rotate: 0, y: 0 }}
						animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6 : 0 }}
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
