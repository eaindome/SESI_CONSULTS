import { json } from '@sveltejs/kit';
import { BACKEND_API_URL } from '$env/static/private';
import type { RequestHandler } from './$types';

function getAuthHeaders(cookies: any) {
	const token = cookies.get('auth_token');
	return {
		'Content-Type': 'application/json',
		Cookie: `auth_token=${token}`
	};
}

export const GET: RequestHandler = async ({ url, cookies }) => {
	try {
		const limit = url.searchParams.get('limit') || '50';
		const offset = url.searchParams.get('offset') || '0';

		const response = await fetch(
			`${BACKEND_API_URL}/feedback?limit=${limit}&offset=${offset}`,
			{ headers: getAuthHeaders(cookies) }
		);

		if (!response.ok) {
			const error = await response.json().catch(() => ({ message: 'Failed to fetch feedback' }));
			return json(error, { status: response.status });
		}

		const data = await response.json();
		return json(data);
	} catch (error) {
		console.error('Admin feedback API error:', error);
		const message = error instanceof Error ? error.message : 'Failed to fetch feedback';
		return json({ error: message }, { status: 500 });
	}
};
