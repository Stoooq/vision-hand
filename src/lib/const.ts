export const Categories = {
	jewellery: ["rings", "necklaces", "bracelets", "earrings", "watches"],
	pictures: ["paintings", "photographs", "digital art", "sketches", "prints"],
	toys: [
		"plush toys",
		"board games",
		"puzzles",
		"action figures",
		"educational toys",
	],
	"natural products": [
		"essential oils",
		"herbal teas",
		"soaps",
		"candles",
		"cosmetics",
	],
	clothes: ["shoes", "hats", "shirts", "pants", "dresses", "jackets"],
	ceramics: ["mugs", "plates", "vases", "decorations", "tableware"],
};

export const MAIN_CATEGORIES = Object.keys(Categories);

export const ALL_SUBCATEGORIES = Object.values(Categories).flatMap(
	(subcategories) => subcategories
);

export const ALL_CATEGORIES = [...MAIN_CATEGORIES, ...ALL_SUBCATEGORIES];
