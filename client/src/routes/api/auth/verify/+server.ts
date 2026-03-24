import { json } from '@sveltejs/kit';
import { BACKEND_API_URL } from '$env/static/private';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
	try {
		const token = cookies.get('auth_token');

		if (!token) {
			return json(
				{ success: false, message: 'Not authenticated' },
				{ status: 401 }
			);
		}

		const response = await fetch(`${BACKEND_API_URL}/auth/verify`, {
			headers: {
				Cookie: `auth_token=${token}`
			}
		});

		const data = await response.json();

		if (!response.ok) {
			return json(data, { status: response.status });
		}

		return json(data);
	} catch (error) {
		console.error('Verify API error:', error);
		return json(
			{ success: false, message: 'Verification failed' },
			{ status: 500 }
		);
	}
};
