import { useRouter, useSearchParams } from "next/navigation";

export const useSidebar = (type: string) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const isOpen = searchParams.get(type) === "1";

	const open = () => {
		const params = new URLSearchParams(searchParams.toString());
		params.set(type, "1");
		router.replace(`?${params.toString()}`);
	};
	const close = () => {
		const params = new URLSearchParams(searchParams.toString());
		params.delete(type);
		router.replace(`?${params.toString()}`);
	};

	return {
		isOpen,
		open,
		close,
	};
};
