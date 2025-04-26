"use client";

import { Trash } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

interface ImageCarouselBaseProps {
	urls: string[];
}

interface ImageCarouselShowProps extends ImageCarouselBaseProps {
	variant: "show";
	onDelete?: never;
}

interface ImageCarouselDeleteProps extends ImageCarouselBaseProps {
	variant: "delete";
	onDelete: (urlToDelete: string) => void;
}

type ImageCarouselProps = ImageCarouselShowProps | ImageCarouselDeleteProps;

export default function ImageCarousel({
	urls,
	variant,
	onDelete,
}: ImageCarouselProps) {
	const [isMoreImagesShown, setIsMoreImagesShown] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	useOnClickOutside(ref as RefObject<HTMLDivElement>, () =>
		setIsMoreImagesShown(false)
	);

	const handleShowMoreImages = () => {
		setIsMoreImagesShown((prev) => !prev);
	};

	useEffect(() => {
		if (urls.length < 1) {
			setIsMoreImagesShown(false);
		}
	}, [urls]);

	return (
		<>
			<AnimatePresence>
				{isMoreImagesShown && (
					<motion.div
						className="absolute flex justify-center items-center inset-0 z-100"
						initial={{ background: "rgba(0, 0, 0, 0)" }}
						animate={{ background: "rgba(0, 0, 0, 0.4)" }}
						exit={{ background: "rgba(0, 0, 0, 0)" }}
						transition={{ delay: 0.2 }}
					>
						<div className="flex gap-4 p-4" ref={ref}>
							{urls.length > 0 &&
								urls.map((url, index) => (
									<React.Fragment key={url}>
										{index < 3 ? (
											<motion.div
												className="relative w-64 h-64"
												layoutId={`image-${url}`}
												transition={{ duration: 0.3, delay: 0.05 * index }}
												whileHover={{
													scale: 1.05,
													transition: { duration: 0.1 },
												}}
												whileTap={{
													scale: 0.95,
													transition: { duration: 0.1 },
												}}
											>
												{variant === "delete" && (
													<button
														className="absolute top-0 right-0 p-2 z-10 cursor-pointer"
														type="button"
														onClick={() => onDelete(url)}
													>
														<Trash size={16} />
													</button>
												)}
												<Image
													src={url}
													alt="Selected Image"
													fill
													className="w-full h-full object-cover"
												/>
											</motion.div>
										) : (
											<motion.div
												key={url}
												className="relative w-64 h-64"
												initial={{ opacity: 0, scale: 0.8 }}
												animate={{ opacity: 1, scale: 1 }}
												exit={{
													opacity: 0,
													scale: 0.8,
												}}
												transition={{ duration: 0.3 }}
												whileHover={{
													scale: 1.05,
													transition: { duration: 0.1 },
												}}
												whileTap={{
													scale: 0.95,
													transition: { duration: 0.1 },
												}}
											>
												{variant === "delete" && (
													<button
														className="absolute top-0 right-0 p-2 z-10 cursor-pointer"
														type="button"
														onClick={() => onDelete(url)}
													>
														<Trash size={18} />
													</button>
												)}
												<Image
													src={url}
													alt="Selected Image"
													fill
													className="w-full h-full object-cover"
												/>
											</motion.div>
										)}
									</React.Fragment>
								))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
			<div className="space-y-4">
				<div className="relative w-full">
					<div className="absolute inset-0 bg-gray-100" />
					{urls[0] && !isMoreImagesShown ? (
						<motion.div className="aspect-square" layoutId={`image-${urls[0]}`}>
							<Image
								src={urls[0]}
								alt="Selected Image"
								fill
								className="w-full h-full object-cover"
							/>
						</motion.div>
					) : (
						<div className="aspect-square bg-gray-100" />
					)}
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="relative w-full">
						<div className="absolute inset-0 bg-gray-100" />
						{urls[1] && !isMoreImagesShown ? (
							<motion.div
								className="aspect-square"
								layoutId={`image-${urls[1]}`}
							>
								<Image
									src={urls[1]}
									alt="Selected Image"
									fill
									className="w-full h-full object-cover"
								/>
							</motion.div>
						) : (
							<div className="aspect-square bg-gray-100" />
						)}
					</div>
					<div className="relative">
						<motion.button
							type="button"
							className="absolute bg-white p-2 border-1 border-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
							onClick={handleShowMoreImages}
							initial={{ opacity: urls.length < 1 ? 0 : 1 }}
							animate={{
								opacity: (isMoreImagesShown || urls.length < 0) ? 0 : 1,
								transition: {
									duration: 0.2,
									delay: isMoreImagesShown ? 0 : 0.3,
								},
							}}
						>
							Show more
						</motion.button>
						<div className="relative w-full">
							<div className="absolute inset-0 bg-gray-100" />
							{urls[2] && !isMoreImagesShown ? (
								<motion.div
									className="aspect-square blur-sm"
									layoutId={`image-${urls[2]}`}
								>
									<Image
										src={urls[2]}
										alt="Selected Image"
										fill
										className="w-full h-full object-cover"
									/>
								</motion.div>
							) : (
								<div className="aspect-square bg-gray-100" />
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
