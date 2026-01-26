import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Replace with your actual backend API URL
const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3000';

export const GET: RequestHandler = async () => {
	try {
		// Fetch services from your backend
		const response = await fetch(`${BACKEND_API_URL}/services`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			const error = await response.json().catch(() => ({ message: 'Failed to fetch services' }));
			return json({ error: error.message || 'Failed to fetch services' }, { status: response.status });
		}

		const services = await response.json();
		return json(services, { status: 200 });
	} catch (error) {
		console.error('Services API error:', error);
		return json(
			{ error: 'An error occurred while fetching services' },
			{ status: 500 }
		);
	}
};
