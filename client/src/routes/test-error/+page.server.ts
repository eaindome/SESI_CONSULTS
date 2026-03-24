import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// This endpoint intentionally throws a 500 error for testing
	throw error(500, 'This is a test 500 error - Server encountered an unexpected condition');
};
