import { Separator } from "@/components/ui/separator";

export default async function ProductPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const productId = (await params).id;

	return (
		<>
			<div className="w-full bg-[#f8f8f8] py-8">
				<div className="max-w-6xl mx-auto grid grid-cols-2 gap-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="col-span-2 aspect-1/1 bg-zinc-400" />
						<div className="aspect-1/1 bg-zinc-300" />
						<div className="aspect-1/1 bg-zinc-200" />
					</div>
					<div className="">
						<div className="text-6xl">{productId}</div>
						<div>Made in 3 weeks</div>
						<Separator className="my-4" />
						<div className="text-xl font-bold">Description</div>
					</div>
				</div>
			</div>
		</>
	);
}
