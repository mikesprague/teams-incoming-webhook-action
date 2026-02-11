import { describe, expect, it } from 'vitest';

import { populateCard } from './simple.js';

describe('simple card', () => {
	it('builds an adaptive card payload', () => {
		const card = populateCard({
			title: 'Hello',
			text: 'World',
			color: 'accent',
		});

		expect(card.type).toBe('message');
		expect(card.attachments[0].contentType).toBe(
			'application/vnd.microsoft.card.adaptive',
		);
		expect(card.attachments[0].content.body[0].items[0].text).toBe('Hello');
		expect(card.attachments[0].content.body[0].style).toBe('accent');
		expect(card.attachments[0].content.body[1].text).toBe('World');
	});
});
