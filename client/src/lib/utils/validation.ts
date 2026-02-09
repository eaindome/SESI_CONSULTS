/**
 * Validation Utilities
 * Reusable validation functions for forms
 */

import type { ValidationResult } from '$lib/types/forms';

/**
 * Validates email format
 */
export function validateEmail(email: string): ValidationResult {
	if (!email) {
		return { isValid: false, error: 'Please enter your email' };
	}
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return { isValid: false, error: 'Please enter a valid email address' };
	}
	return { isValid: true };
}

/**
 * Validates Ghana phone number format
 * Accepts: +233 XXX XXX XXXX or 0XX XXX XXXX
 */
export function validatePhone(phone: string): ValidationResult {
	if (!phone) {
		return { isValid: false, error: 'Please enter your phone number' };
	}
	const cleanPhone = phone.replace(/\s/g, '');
	const isValidFormat = cleanPhone.length >= 10 && /^(\+233|0)[0-9]{9,10}$/.test(cleanPhone);

	if (!isValidFormat) {
		return { isValid: false, error: 'Please enter a valid Ghana phone number' };
	}
	return { isValid: true };
}

/**
 * Formats Ghana phone number with spaces
 */
export function formatPhoneNumber(value: string): string {
	const cleaned = value.replace(/[^\d+]/g, '');

	// Format: +233 XXX XXX XXXX
	if (cleaned.startsWith('+233')) {
		const numbers = cleaned.substring(4);
		if (numbers.length <= 3) return `+233 ${numbers}`;
		if (numbers.length <= 6) return `+233 ${numbers.slice(0, 3)} ${numbers.slice(3)}`;
		return `+233 ${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6, 10)}`;
	}
	// Format: 0XX XXX XXXX
	else if (cleaned.startsWith('0')) {
		if (cleaned.length <= 3) return cleaned;
		if (cleaned.length <= 6) return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
		return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 10)}`;
	}
	return cleaned;
}

/**
 * Validates required field
 */
export function validateRequired(value: string, fieldName: string): ValidationResult {
	if (!value || value.trim().length === 0) {
		return { isValid: false, error: `Please enter your ${fieldName}` };
	}
	return { isValid: true };
}

/**
 * Validates minimum length
 */
export function validateMinLength(value: string, minLength: number, fieldName: string): ValidationResult {
	if (!value) {
		return { isValid: false, error: `Please enter your ${fieldName}` };
	}
	if (value.length < minLength) {
		return { isValid: false, error: `${fieldName} must be at least ${minLength} characters` };
	}
	return { isValid: true };
}

/**
 * Validates maximum length
 */
export function validateMaxLength(value: string, maxLength: number, fieldName: string): ValidationResult {
	if (value && value.length > maxLength) {
		return { isValid: false, error: `${fieldName} must be less than ${maxLength} characters` };
	}
	return { isValid: true };
}

/**
 * Validates date is not in the past
 */
export function validateFutureDate(date: string): ValidationResult {
	if (!date) {
		return { isValid: false, error: 'Please select a date' };
	}
	const selectedDate = new Date(date);
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	if (selectedDate < today) {
		return { isValid: false, error: 'Please select a future date' };
	}
	return { isValid: true };
}

/**
 * Validates select field
 */
export function validateSelect(value: string, fieldName: string): ValidationResult {
	if (!value) {
		return { isValid: false, error: `Please select ${fieldName}` };
	}
	return { isValid: true };
}

/**
 * Convert 12-hour time to 24-hour format
 */
export function convertTo24Hour(time12: string): string {
	const [time, period] = time12.split(' ');
	let [hours, minutes] = time.split(':');

	if (period === 'PM' && hours !== '12') {
		hours = String(Number(hours) + 12);
	} else if (period === 'AM' && hours === '12') {
		hours = '00';
	}

	return `${hours.padStart(2, '0')}:${minutes}:00`;
}

/**
 * Get today's date in YYYY-MM-DD format
 */
export function getTodayDate(): string {
	return new Date().toISOString().split('T')[0];
}
