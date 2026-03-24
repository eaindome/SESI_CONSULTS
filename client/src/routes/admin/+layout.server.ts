import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
	// Skip auth check for login page
	if (url.pathname === '/admin/login') {
		return {};
	}

	const token = cookies.get('auth_token');

	if (!token) {
		throw redirect(302, '/admin/login');
	}

	// Verify token with backend
	try {
		const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:3000';
		const response = await fetch(`${backendUrl}/auth/verify`, {
			headers: {
				Cookie: `auth_token=${token}`
			}
		});

		if (!response.ok) {
			cookies.delete('auth_token', { path: '/' });
			throw redirect(302, '/admin/login');
		}

		const data = await response.json();

		return {
			admin: data.admin
		};
	} catch (error) {
		cookies.delete('auth_token', { path: '/' });
		throw redirect(302, '/admin/login');
	}
};
