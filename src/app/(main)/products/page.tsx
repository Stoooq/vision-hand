// import DropdownMenu from "@/components/dropdown-menu";
import Pagination from "@/components/pagination";
import { ChevronDown, Search } from "lucide-react";

// const dropDownMenuItems = {
// 	Category: {
// 		"jewellery": ["rings", "necklaces", "bracelets", "earrings", "watches"],
// 		"pictures": ["paintings", "photographs", "digital art", "sketches", "prints"],
// 		"toys": ["plush toys", "board games", "puzzles", "action figures", "educational toys"],
// 		"natural products": ["essential oils", "herbal teas", "soaps", "candles", "cosmetics"],
// 		"clothes": ["shoes", "hats", "shirts", "pants", "dresses", "jackets"],
// 		"ceramics": ["mugs", "plates", "vases", "decorations", "tableware"],
// 	},
// 	Color: ["red", "blue", "green", "yellow", "black", "white"],
// };

export default function ProductsPage() {
	return (
		<>
			<div className="w-full bg-[#f8f8f8] py-8">
				<div className="max-w-6xl mx-auto">
					<div className="flex relative items-center">
						<div className="w-full">
							<input
								placeholder="Search Products"
								className="w-full h-9 bg-white px-3 py-1 rounded-md focus:ring-0 focus:outline-2 focus:outline-zinc-200"
							/>
						</div>
						<button className="flex h-full px-2 justify-center items-center absolute right-0 cursor-pointer text-slate-500 hover:text-slate-900">
							<Search size={18} className="transition-colors duration-300" />
						</button>
					</div>
					<div className="flex justify-between mt-8">
						<div className="flex gap-6">
							{/* <DropdownMenu
								title="Category"
								items={dropDownMenuItems["Category"]}
							/>
							<DropdownMenu
								title="Color"
								items={dropDownMenuItems["Color"]}
							/> */}
							<div className="flex gap-2 h-full cursor-pointer p-2 bg-red-200">
								<div>Price</div>
								<button>
									<ChevronDown />
								</button>
							</div>
						</div>
						<div className="h-full cursor-pointer p-2 bg-red-200">
							56 items Sort By: Price
						</div>
					</div>
					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-12 mt-8">
						<div className="aspect-2/3 bg-slate-200"></div>
						<div className="aspect-2/3 bg-slate-200"></div>
						<div className="aspect-2/3 bg-slate-200"></div>
						<div className="aspect-2/3 bg-slate-200"></div>
						<div className="aspect-2/3 bg-slate-200"></div>
						<div className="aspect-2/3 bg-slate-200"></div>
						<div className="aspect-2/3 bg-slate-200"></div>
						<div className="aspect-2/3 bg-slate-200"></div>
					</div>
					<div className="mt-8">
						<div className="flex justify-center gap-8">
							<Pagination pages={["1", "2", "3", "4", "5"]} activePage="1" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
