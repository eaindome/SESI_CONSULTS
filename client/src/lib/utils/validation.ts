import { z } from 'zod';

// Booking form validation schema
export const bookingSchema = z.object({
	service: z.string().min(1, 'Service is required'),
	date: z.string().min(1, 'Date is required'),
	time: z.string().min(1, 'Time is required'),
	fullName: z.string().min(2, 'Name must be at least 2 characters'),
	email: z.string().email('Invalid email address'),
	phone: z.string().min(10, 'Phone number must be at least 10 digits'),
	address: z.string().min(5, 'Address is required'),
	notes: z.string().optional()
});

export type BookingFormData = z.infer<typeof bookingSchema>;

// Utility function to validate a field
export function validateField<T>(schema: z.ZodType<T>, value: unknown): {
	valid: boolean;
	message?: string;
} {
	try {
		schema.parse(value);
		return { valid: true };
	} catch (error) {
		if (error instanceof z.ZodError) {
			return { valid: false, message: error.errors[0]?.message };
		}
		return { valid: false, message: 'Validation error' };
	}
}

// Email validation helper
export function validateEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

// Phone validation helper
export function validatePhone(phone: string): boolean {
	const phoneRegex = /^\d{10,}$/;
	return phoneRegex.test(phone.replace(/\D/g, ''));
}

// Required field validation
export function validateRequired(value: string): boolean {
	return value.trim().length > 0;
}

// Minimum length validation
export function validateMinLength(value: string, minLength: number): boolean {
	return value.trim().length >= minLength;
}
