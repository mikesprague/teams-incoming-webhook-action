import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
	getAdaptiveCardColorString,
	getEmoji,
	getHexForColorString,
	validateColorString,
} from './helpers.js';

describe('helpers', () => {
	let consoleLogSpy: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
	});

	afterEach(() => {
		consoleLogSpy.mockRestore();
	});

	it('validates color strings', () => {
		expect(validateColorString('#abc')).not.toBeNull();
		expect(validateColorString('success')).not.toBeNull();
		expect(validateColorString('not-a-color')).toBeNull();
	});

	it('maps hex colors or returns default on invalid', () => {
		expect(getHexForColorString('success')).toBe('007300');
		expect(getHexForColorString('abc123')).toBe('abc123');
		expect(getHexForColorString('bad-color')).toBe('808080');
	});

	it('maps adaptive card colors with fallback', () => {
		expect(getAdaptiveCardColorString('success')).toBe('good');
		expect(getAdaptiveCardColorString('default')).toBe('emphasis');
		expect(getAdaptiveCardColorString('unknown')).toBe('emphasis');
	});

	it('returns emojis for known adaptive card colors', () => {
		expect(getEmoji('good')).toBe('✅ ');
		expect(getEmoji('unknown')).toBe('');
	});
});
