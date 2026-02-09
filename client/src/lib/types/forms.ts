/**
 * Form Types & Interfaces
 * Centralized type definitions for forms and validation
 */

export interface ValidationRule {
	required?: boolean;
	minLength?: number;
	maxLength?: number;
	pattern?: RegExp;
	custom?: (value: string) => boolean;
	message: string;
}

export interface ValidationResult {
	isValid: boolean;
	error?: string;
}

export interface FieldState {
	value: string;
	error: string;
	touched: boolean;
	valid: boolean;
}

export interface FormState<T extends Record<string, any>> {
	values: T;
	errors: Record<keyof T, string>;
	touched: Record<keyof T, boolean>;
	isSubmitting: boolean;
	isValid: boolean;
}

export interface BookingFormData {
	service: string;
	appointmentDate: string;
	appointmentTime: string;
	fullName: string;
	email: string;
	phone: string;
	address: string;
	notes?: string;
	// Training specific
	experienceLevel?: string;
	preferredFormat?: string;
	schedulingPreference?: string;
}

export interface ContactDetails {
	name: string;
	email: string;
	phone: string;
	address: string;
}

export interface TrainingDetails {
	experienceLevel?: string;
	preferredFormat?: string;
	schedulingPreference?: string;
}

export interface BookingPayload {
	service: string;
	dateTime: string;
	contactDetails: ContactDetails;
	notes?: string;
	trainingDetails?: TrainingDetails;
}
