/**
 * Booking Constants
 * Time slots, training options, and booking-related constants
 */

export const TIME_SLOTS = [
	'08:00 AM',
	'09:00 AM',
	'10:00 AM',
	'11:00 AM',
	'12:00 PM',
	'01:00 PM',
	'02:00 PM',
	'03:00 PM',
	'04:00 PM',
	'05:00 PM',
	'06:00 PM'
] as const;

export type TimeSlot = typeof TIME_SLOTS[number];

export const EXPERIENCE_LEVELS = [
	{ value: 'student', label: 'Nursing Student (Pre-qualification)' },
	{ value: 'new', label: 'Newly Qualified Nurse (< 1 year)' },
	{ value: 'experienced', label: 'Experienced Nurse (1-5 years)' },
	{ value: 'advanced', label: 'Advanced Training (5+ years)' }
] as const;

export const TRAINING_FORMATS = [
	{ value: 'one-on-one', label: 'One-on-One Training' },
	{ value: 'small-group', label: 'Small Group (2-5 participants)' },
	{ value: 'workshop', label: 'Workshop (6+ participants)' }
] as const;

export const SCHEDULING_PREFERENCES = [
	{ value: 'weekday-morning', label: 'Weekday Mornings' },
	{ value: 'weekday-afternoon', label: 'Weekday Afternoons' },
	{ value: 'weekday-evening', label: 'Weekday Evenings' },
	{ value: 'weekend', label: 'Weekend Sessions' }
] as const;

export const BOOKING_SUCCESS_STEPS = [
	{
		step: 1,
		description: 'We receive your booking request'
	},
	{
		step: 2,
		description: 'Our team contacts you to confirm details'
	},
	{
		step: 3,
		description: 'Your nurse arrives at the scheduled time'
	}
] as const;
