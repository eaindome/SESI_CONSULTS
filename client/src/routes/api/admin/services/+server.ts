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

export const GET: RequestHandler = async ({ cookies }) => {
	try {
		const response = await fetch(`${BACKEND_API_URL}/services`, {
			headers: getAuthHeaders(cookies)
		});

		if (!response.ok) {
			const error = await response.json().catch(() => ({ message: 'Failed to fetch services' }));
			return json(error, { status: response.status });
		}

		const data = await response.json();
		return json(data);
	} catch (error) {
		console.error('Services API error:', error);
		return json({ error: 'An error occurred while fetching services' }, { status: 500 });
	}
};

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const data = await request.json();

		const response = await fetch(`${BACKEND_API_URL}/services`, {
			method: 'POST',
			headers: getAuthHeaders(cookies),
			body: JSON.stringify(data)
		});

		if (!response.ok) {
			const error = await response.json().catch(() => ({ message: 'Failed to create service' }));
			return json(error, { status: response.status });
		}

		const result = await response.json();
		return json(result);
	} catch (error) {
		console.error('Create service API error:', error);
		return json({ error: 'An error occurred while creating service' }, { status: 500 });
	}
};

export const PATCH: RequestHandler = async ({ request, cookies }) => {
	try {
		const { id, ...data } = await request.json();

		const response = await fetch(`${BACKEND_API_URL}/services/${id}`, {
			method: 'PATCH',
			headers: getAuthHeaders(cookies),
			body: JSON.stringify(data)
		});

		if (!response.ok) {
			const error = await response.json().catch(() => ({ message: 'Failed to update service' }));
			return json(error, { status: response.status });
		}

		const result = await response.json();
		return json(result);
	} catch (error) {
		console.error('Update service API error:', error);
		return json({ error: 'An error occurred while updating service' }, { status: 500 });
	}
};

export const DELETE: RequestHandler = async ({ request, cookies }) => {
	try {
		const { id } = await request.json();

		const response = await fetch(`${BACKEND_API_URL}/services/${id}`, {
			method: 'DELETE',
			headers: getAuthHeaders(cookies)
		});

		if (!response.ok) {
			const error = await response.json().catch(() => ({ message: 'Failed to delete service' }));
			return json(error, { status: response.status });
		}

		const result = await response.json();
		return json(result);
	} catch (error) {
		console.error('Delete service API error:', error);
		return json({ error: 'An error occurred while deleting service' }, { status: 500 });
	}
};
