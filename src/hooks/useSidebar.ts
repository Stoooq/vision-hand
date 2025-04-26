import EventEmitter from "events";
import { useEffect, useState } from "react";

const events = new EventEmitter();

export const useSidebar = (type: string) => {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const onOpen = (receivedType: string) => {
			if (receivedType !== type) return;
			setIsOpen(true);
		};
		events.on("open", onOpen);
		const onClose = (receivedType: string) => {
			if (receivedType !== type) return;
			setIsOpen(false);
		};
		events.on("close", onClose);

		return () => {
			events.off("open", onOpen);
			events.off("close", onClose);
		};
	}, []);

	const open = () => {
		events.emit("open", type);
	};
	const close = () => {
		events.emit("close", type);
	};

	return {
		isOpen,
		open,
		close,
	};
};
