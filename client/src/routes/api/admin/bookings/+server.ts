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
		const status = url.searchParams.get('status') || '';
		const search = url.searchParams.get('search') || '';
		const limit = url.searchParams.get('limit') || '50';
		const offset = url.searchParams.get('offset') || '0';

		const queryParams = new URLSearchParams();
		if (status) queryParams.set('status', status);
		if (search) queryParams.set('search', search);
		queryParams.set('limit', limit);
		queryParams.set('offset', offset);

		const response = await fetch(`${BACKEND_API_URL}/bookings?${queryParams}`, {
			headers: getAuthHeaders(cookies)
		});

		if (!response.ok) {
			const error = await response.json().catch(() => ({ message: 'Failed to fetch bookings' }));
			return json(error, { status: response.status });
		}

		const data = await response.json();
		return json(data);
	} catch (error) {
		console.error('Bookings API error:', error);
		return json({ error: 'An error occurred while fetching bookings' }, { status: 500 });
	}
};

export const PATCH: RequestHandler = async ({ request, cookies }) => {
	try {
		const { id, ...data } = await request.json();

		const response = await fetch(`${BACKEND_API_URL}/bookings/${id}`, {
			method: 'PATCH',
			headers: getAuthHeaders(cookies),
			body: JSON.stringify(data)
		});

		if (!response.ok) {
			const error = await response.json().catch(() => ({ message: 'Failed to update booking' }));
			return json(error, { status: response.status });
		}

		const result = await response.json();
		return json(result);
	} catch (error) {
		console.error('Update booking API error:', error);
		return json({ error: 'An error occurred while updating booking' }, { status: 500 });
	}
};

export const DELETE: RequestHandler = async ({ request, cookies }) => {
	try {
		const { id } = await request.json();

		const response = await fetch(`${BACKEND_API_URL}/bookings/${id}`, {
			method: 'DELETE',
			headers: getAuthHeaders(cookies)
		});

		if (!response.ok) {
			const error = await response.json().catch(() => ({ message: 'Failed to delete booking' }));
			return json(error, { status: response.status });
		}

		const result = await response.json();
		return json(result);
	} catch (error) {
		console.error('Delete booking API error:', error);
		return json({ error: 'An error occurred while deleting booking' }, { status: 500 });
	}
};
