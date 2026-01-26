import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Replace with your actual backend API URL
const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3000';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const bookingData = await request.json();

		// Forward the request to your backend
		const response = await fetch(`${BACKEND_API_URL}/bookings`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(bookingData),
		});

		if (!response.ok) {
			const error = await response.json().catch(() => ({ message: 'Failed to create booking' }));
			return json({ error: error.message || 'Failed to create booking' }, { status: response.status });
		}

		const result = await response.json();
		return json(result, { status: 201 });
	} catch (error) {
		console.error('Booking API error:', error);
		return json(
			{ error: 'An error occurred while processing your booking' },
			{ status: 500 }
		);
	}
};
