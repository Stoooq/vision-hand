import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const buttonVariants = cva(
	"w-full mt-4 py-3 px-6 font-medium cursor-pointer",
	{
		variants: {
			variant: {
				default:
					"bg-black text-white",
				outline:
					"border-1 border-black",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

export function Button({
	children,
	className,
	type,
	variant,
	...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
	return (
		<button
			type={type ? type : "button"}
			className={`${cn(buttonVariants({ variant, className }))}`}
			{...props}
		>
			{children}
		</button>
	);
}
