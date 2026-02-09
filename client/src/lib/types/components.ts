/**
 * Component Props Types
 * Type definitions for reusable UI components
 */

import type { Snippet } from 'svelte';
import type { ComponentType } from 'svelte';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type AlertVariant = 'success' | 'error' | 'warning' | 'info';

export type InputType = 'text' | 'email' | 'tel' | 'password' | 'number' | 'url' | 'date';

export interface IconComponent {
	class?: string;
}

export interface BaseInputProps {
	id: string;
	name?: string;
	value?: string;
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
	readonly?: boolean;
	autocomplete?: string;
	error?: string;
	hint?: string;
}
