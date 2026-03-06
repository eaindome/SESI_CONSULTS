// Intersection Observer options for scroll-triggered animations
export const intersectionObserverOptions: IntersectionObserverInit = {
	threshold: 0.15,
	rootMargin: '0px 0px -50px 0px'
};

// Setup staggered animations with Intersection Observer
export function setupStaggeredAnimations(
	elements: HTMLElement[],
	baseDelay = 100,
	animationClass = 'animate-fade-in-up'
): () => void {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const index = elements.indexOf(entry.target as HTMLElement);
				if (index !== -1) {
					setTimeout(() => {
						entry.target.classList.add(animationClass);
						entry.target.classList.add('opacity-100');
						entry.target.classList.remove('opacity-0');
					}, index * baseDelay);
				}
				observer.unobserve(entry.target);
			}
		});
	}, intersectionObserverOptions);

	elements.forEach((el) => {
		el.classList.add('opacity-0');
		observer.observe(el);
	});

	// Cleanup function
	return () => {
		elements.forEach((el) => observer.unobserve(el));
		observer.disconnect();
	};
}

// Setup single element animation on scroll
export function setupScrollAnimation(
	element: HTMLElement,
	animationClass = 'animate-fade-in-up'
): () => void {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add(animationClass);
				entry.target.classList.add('opacity-100');
				entry.target.classList.remove('opacity-0');
				observer.unobserve(entry.target);
			}
		});
	}, intersectionObserverOptions);

	element.classList.add('opacity-0');
	observer.observe(element);

	// Cleanup function
	return () => {
		observer.unobserve(element);
		observer.disconnect();
	};
}

// Easing functions
export const easing = {
	cubicOut: (t: number) => --t * t * t + 1,
	quintOut: (t: number) => --t * t * t * t * t + 1,
	sineInOut: (t: number) => -(Math.cos(Math.PI * t) - 1) / 2
};

// Utility to check if user prefers reduced motion
export function prefersReducedMotion(): boolean {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
