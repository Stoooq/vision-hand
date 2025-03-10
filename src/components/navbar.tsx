import { ShoppingBag, Search, UserRound } from "lucide-react";
import { Menubar } from "./menubar";
import { useState } from "react";

export function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleMenuToggle = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<nav
			className={`fixed w-full bg-white shadow-md py-4 px-6 transition-all duration-300 overflow-hidden ${
				isMenuOpen ? "h-[350px]" : "h-[56px]"
			}`}
		>
			<div className="flex items-center justify-between">
				<div className="flex items-center z-10">
					<Menubar onToggle={handleMenuToggle} />
				</div>

				<div className="absolute left-0 right-0 mx-auto w-full flex justify-center">
					<div className="text-xl font-semibold">VisionHand</div>
				</div>

				<div className="flex items-center space-x-6 z-10">
					<button className="focus:outline-none" aria-label="Search">
						<Search size={22} />
					</button>

					<button
						className="focus:outline-none relative"
						aria-label="Shopping bag"
					>
						<ShoppingBag size={22} />
						<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
							0
						</span>
					</button>

					<button className="focus:outline-none" aria-label="User profile">
						<UserRound size={22} />
					</button>
				</div>
			</div>

			{/* Menu Items */}
			{isMenuOpen && (
				<div className="mt-4 transition-opacity duration-300 ease-in-out opacity-100">
					<ul className="p-0 m-0">
						<li className="py-4 px-8 hover:bg-gray-100">
							<a href="/o-nas" className="text-gray-800 text-lg block">
								O nas
							</a>
						</li>
						<li className="py-4 px-8 hover:bg-gray-100">
							<a href="/uslugi" className="text-gray-800 text-lg block">
								Usługi
							</a>
						</li>
						<li className="py-4 px-8 hover:bg-gray-100">
							<a href="/portfolio" className="text-gray-800 text-lg block">
								Portfolio
							</a>
						</li>
						<li className="py-4 px-8 hover:bg-gray-100">
							<a href="/kontakt" className="text-gray-800 text-lg block">
								Kontakt
							</a>
						</li>
					</ul>
				</div>
			)}
		</nav>
	);
}
