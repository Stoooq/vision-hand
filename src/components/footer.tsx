import { Separator } from "./ui/separator";

export function Footer() {
	return (
		<>
			<div className="min-h-[56px] mt-8">
				<Separator />
				<div className="flex justify-between items-center p-6">
                    <div className="text-6xl">VISIONHAND</div>
                    <div className="absolute left-0 right-0 mx-auto w-full flex justify-center">VisionHand. All Rights Reserved</div>
                    <div>Terns & Conditions | Privacy Policy</div>
                </div>
			</div>
		</>
	);
}
