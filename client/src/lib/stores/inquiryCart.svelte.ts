// Inquiry cart store for medical supplies
export interface InquiryItem {
	id: string;
	name: string;
	category: string;
	image?: string;
}

class InquiryCartStore {
	items = $state<InquiryItem[]>([]);

	add(item: InquiryItem) {
		// Check if item already exists
		const exists = this.items.find(i => i.id === item.id);
		if (!exists) {
			this.items = [...this.items, item];
		}
	}

	remove(itemId: string) {
		this.items = this.items.filter(i => i.id !== itemId);
	}

	clear() {
		this.items = [];
	}

	has(itemId: string): boolean {
		return this.items.some(i => i.id === itemId);
	}

	get count(): number {
		return this.items.length;
	}
}

export const inquiryCart = new InquiryCartStore();
