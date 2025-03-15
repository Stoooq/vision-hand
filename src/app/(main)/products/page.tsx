import DropdownMenu from "@/components/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronLeft, ChevronRight, Search } from "lucide-react";

const dropDownMenuItems = {
	Category: [
		"jewellery",
		"pictures",
		"toys",
		"natural products",
		"clothes",
		"ceramics",
	],
	Color: [
		"red",
		"blue",
		"green",
		"yellow",
		"black",
		"white",
	]
}

export default function ProductsPage() {
	return (
		<>
			<div className="max-w-6xl mx-auto">
				<div className="flex relative items-center mt-8">
					<Input placeholder="Search Product" />
					<button className="flex h-full px-2 justify-center items-center absolute right-0 cursor-pointer text-slate-500 hover:text-slate-900">
						<Search size={18} className="transition-colors duration-300" />
					</button>
				</div>
				<div className="flex justify-between mt-8">
					<div className="flex gap-6">
						<DropdownMenu title="Category" items={dropDownMenuItems['Category']} />
						<DropdownMenu title="Color" items={dropDownMenuItems['Color']} />
						<div className="flex gap-2 h-full cursor-pointer p-2 bg-red-200">
							<div>Price</div>
							<button>
								<ChevronDown />
							</button>
						</div>
					</div>
					<div className="h-full cursor-pointer p-2 bg-red-200">56 items Sort By: Price</div>
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
						<button className="flex justify-center items-center w-10 h-10 bg-slate-900 text-slate-100">
							<ChevronLeft />
						</button>
						<div className="flex items-center">
							<button className="border-b-1 w-10 h-10 border-zinc-200">1</button>
							<button className="border-b-1 w-10 h-10 border-zinc-200">2</button>
							<button className="border-b-1 w-10 h-10 border-zinc-200">3</button>
							<button className="border-b-1 w-10 h-10 border-zinc-200">4</button>
							<button className="border-b-1 w-10 h-10 border-zinc-200">5</button>
						</div>
						<button className="flex justify-center items-center w-10 h-10 bg-slate-900 text-slate-100">
							<ChevronRight />
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
