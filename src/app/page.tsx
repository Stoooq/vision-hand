"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
	return (
		<>
			<main className="min-h-screen">
				<Navbar />
				<section className="min-h-screen gradient-bg max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
					<div className="text-center">
						<h1 className="text-5xl md:text-9xl text-gray-900 tracking-tight">
							The Beauty of Handcrafted Art
						</h1>
						<p className="mt-6 text-xl text-gray-500 max-w-3xl mx-auto">
							Handcrafted with care, each piece is a masterpiece born from
							passion and skill. Explore one-of-a-kind creations that add beauty
							and meaning to your world.
						</p>
						<div className="mt-10">
							<Button asChild variant="outline">
								<Link href="/">Explore All Products</Link>
							</Button>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
