/**
 * Service Constants
 * Centralized service definitions and categories
 */

export const WOUND_CARE_SERVICES = [
	'Wound Care - Acute Wounds',
	'Wound Care - Chronic Wounds',
	'Wound Care - Burns',
	'Wound Care - Post-Surgical'
] as const;

export const HOME_CARE_SERVICES = [
	'Home Care - General Nursing',
	'Home Care - Injection Services',
	'Home Care - Post-Operative Care',
	'Home Care - Chronic Disease Management',
	'Home Care - Elderly Care',
	'Home Care - Maternal & Child Care'
] as const;

export const CONSULTATION_SERVICES = [
	'Consultation - General Health',
	'Consultation - Follow-up',
	'Consultation - Specialist (Orthopedics)'
] as const;

export const TRAINING_SERVICES = [
	'Training - Wound Care & Dressing',
	'Training - Catheterization & IV Therapy',
	'Training - Emergency & Trauma Care',
	'Training - Patient Mobility & Transfer',
	'Training - Post-Operative Care',
	'Training - Pediatric Nursing',
	'Training - Geriatric Care',
	'Training - Medical Equipment Operation'
] as const;

export const ALL_SERVICES = [
	...WOUND_CARE_SERVICES,
	...HOME_CARE_SERVICES,
	...CONSULTATION_SERVICES,
	...TRAINING_SERVICES
] as const;

export type ServiceType = typeof ALL_SERVICES[number];

export const SERVICE_CATEGORIES = {
	woundCare: {
		title: 'Wound Care',
		services: WOUND_CARE_SERVICES
	},
	homeCare: {
		title: 'Home Care',
		services: HOME_CARE_SERVICES
	},
	consultations: {
		title: 'Consultations',
		services: CONSULTATION_SERVICES
	},
	training: {
		title: 'Training Programs',
		services: TRAINING_SERVICES
	}
} as const;
