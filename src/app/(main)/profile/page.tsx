export default function ProfilePage() {
	return (
		<>
			<div className="w-full bg-[#f8f8f8] py-8">
				<div className="max-w-6xl mx-auto">
					<div className="mt-8 p-6 bg-zinc-100">
						<div className="w-[200px] h-[200px] bg-zinc-400 rounded-full" />
					</div>
					<div className="flex justify-between items-end mt-8 border-b-1 border-zinc-200">
						<div className="text-6xl">Miłosz Głowacki</div>
						<div>Opinions: 4.7</div>
					</div>
					<div className="text-3xl mt-8">Products</div>
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
				</div>
			</div>
		</>
	);
}
