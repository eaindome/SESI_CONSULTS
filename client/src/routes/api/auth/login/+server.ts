import { json } from '@sveltejs/kit';
import { BACKEND_API_URL } from '$env/static/private';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const body = await request.json();

		const response = await fetch(`${BACKEND_API_URL}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});

		const data = await response.json();

		if (!response.ok) {
			return json(data, { status: response.status });
		}

		// Get the auth_token cookie from the backend response
		const setCookieHeader = response.headers.get('set-cookie');
		if (setCookieHeader) {
			// Extract token value from set-cookie header
			const tokenMatch = setCookieHeader.match(/auth_token=([^;]+)/);
			if (tokenMatch) {
				cookies.set('auth_token', tokenMatch[1], {
					path: '/',
					httpOnly: true,
					secure: process.env.NODE_ENV === 'production',
					sameSite: 'lax',
					maxAge: 7 * 24 * 60 * 60 // 7 days
				});
			}
		}

		return json(data);
	} catch (error) {
		console.error('Login API error:', error);
		return json(
			{ success: false, message: 'An error occurred during login' },
			{ status: 500 }
		);
	}
};
