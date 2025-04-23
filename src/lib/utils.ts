import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function convertBlobUrlToImage(blobUrl: string) {
	const response = await fetch(blobUrl);
	const blob = await response.blob();
	const imageName = Math.random().toString(36).substring(2, 9);
	const type = blob.type;
	const file = new File([blob], `${imageName}.${type.split("/")[1]}`, { type });
	return file;
}
