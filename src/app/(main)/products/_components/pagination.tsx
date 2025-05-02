"use client"

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

export default function Pagination({
	pages,
	activePage,
}: {
	pages: string[];
	activePage: string;
}) {
	return (
		<>
			<button className="flex justify-center items-center w-10 h-10 bg-slate-900 text-slate-100 cursor-pointer">
				<motion.div whileHover={{ x: -3 }} className="flex justify-center items-center h-full w-full">
					<ChevronLeft />
				</motion.div>
			</button>
			<div className="flex items-center">
				{pages.map((page, index) => (
					<button
						key={index}
						className={`border-b-1 w-10 h-10 border-zinc-200 transition hover:bg-zinc-100 cursor-pointer ${
							activePage == page ? "border-b-2 border-zinc-700" : null
						}`}
					>
						{page}
					</button>
				))}
			</div>
			<button className="flex justify-center items-center w-10 h-10 bg-slate-900 text-slate-100 cursor-pointer">
            <motion.div whileHover={{ x: 3 }} className="flex justify-center items-center h-full w-full">
					<ChevronRight />
				</motion.div>
			</button>
		</>
	);
}
