"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { useTransition } from "react";
import { loginSchema } from "@/schemas";
import { Button } from "@/components/button";

export default function NewProductPage() {
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function onSubmit(values: z.infer<typeof loginSchema>) {
		console.log(values);
		startTransition(async () => {});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="max-w-7xl mx-auto px-4 md:px-8 h-screen flex justify-center items-center">
					<div className="w-[400px] p-8 flex flex-col">
						<div className="mb-12">
							<div className="font-bold text-3xl">Welcome back</div>
							<div className="text-lg">Please enter your account details</div>
						</div>
						<div className="flex flex-col gap-4">
							<div>
								<div>Email</div>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<input
											placeholder="john.doe@gmail.com"
											{...field}
											className={`w-full text-md py-1 mb-4 border-b border-gray-200 focus:outline-none focus:border-gray-300 ${
												form.formState.errors.email
													? "border-red-500 focus:border-red-500"
													: "border-gray-200 focus:border-gray-300"
											}`}
										/>
									)}
								/>
							</div>
							<div>
								<div>Password</div>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<input
											type="password"
											placeholder="******"
											{...field}
											className={`w-full text-md py-1 mb-4 border-b border-gray-200 focus:outline-none focus:border-gray-300 ${
												form.formState.errors.email
													? "border-red-500 focus:border-red-500"
													: "border-gray-200 focus:border-gray-300"
											}`}
										/>
									)}
								/>
								<div>Forgot password?</div>
							</div>
							<Button disabled={isPending} type="submit" variant="outline">Login</Button>
						</div>
					</div>
				</div>
			</form>
		</Form>
	);
}
