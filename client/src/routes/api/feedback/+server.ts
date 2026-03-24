import { json } from '@sveltejs/kit';
import { BACKEND_API_URL } from '$env/static/private';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();

		const response = await fetch(`${BACKEND_API_URL}/feedback`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		});

		const data = await response.json();
		return json(data, { status: response.status });
	} catch (error) {
		console.error('Feedback submit error:', error);
		const message = error instanceof Error ? error.message : 'Failed to submit feedback';
		return json({ success: false, message }, { status: 500 });
	}
};
