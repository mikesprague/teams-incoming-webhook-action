export declare const validateColorString: (colorString: string) => RegExpMatchArray | null;
export interface ObjectMap {
    [name: string]: string | undefined;
}
export interface ColorStrings extends ObjectMap {
    default?: string;
    info: string;
    failure: string;
    success: string;
    warning: string;
}
export declare const getHexForColorString: (colorString: string) => string;
export declare const getAdaptiveCardColorString: (colorString: string) => string;
export interface EmojiStrings extends ObjectMap {
    good: string;
    accent: string;
    warning: string;
    attention: string;
    emphasis?: string;
}
export declare const getEmoji: (adaptiveCardColor?: string) => string;
