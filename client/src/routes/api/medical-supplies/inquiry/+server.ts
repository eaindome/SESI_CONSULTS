import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();

		// Validate required fields
		if (!data.items || data.items.length === 0) {
			return json({ error: 'No items in inquiry' }, { status: 400 });
		}

		if (!data.contactDetails?.name || !data.contactDetails?.email || !data.contactDetails?.phone) {
			return json({ error: 'Missing required contact details' }, { status: 400 });
		}

		// Log the inquiry (in production, save to database)
		console.log('Medical Supplies Inquiry:', {
			timestamp: new Date().toISOString(),
			items: data.items,
			contact: data.contactDetails,
			message: data.message
		});

		// TODO: In production:
		// 1. Save inquiry to database
		// 2. Send email notification to sales team
		// 3. Send confirmation email to customer
		// 4. Integrate with CRM system

		return json({
			success: true,
			message: 'Inquiry submitted successfully. We will contact you shortly.'
		});

	} catch (error) {
		console.error('Error processing inquiry:', error);
		return json({ error: 'Failed to process inquiry' }, { status: 500 });
	}
};
