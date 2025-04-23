"use client";

import { useSidebar } from "@/hooks/useSidebar";
import { AnimatePresence, motion } from "motion/react";

export default function CartMenu() {
	const { isOpen, close } = useSidebar("cart");

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed min-h-screen w-full bg-black/50 z-140"
					/>
					<motion.div
						initial={{ width: 0 }}
						animate={{ width: 350 }}
						exit={{ width: 0 }}
						className="fixed right-0 top-0 min-h-screen w-[350px] bg-white z-150"
					>
						<div className="">CART</div>
						<button onClick={close}>zamknij</button>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
