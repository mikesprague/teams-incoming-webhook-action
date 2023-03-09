export interface SimpleCardParams {
    title: string;
    text: string;
    color?: string;
}
export declare const populateCard: ({ title, text, color, }: SimpleCardParams) => {
    type: string;
    attachments: {
        contentType: string;
        content: {
            type: string;
            $schema: string;
            version: string;
            msteams: {
                width: string;
            };
            body: ({
                type: string;
                items: {
                    type: string;
                    text: string;
                    wrap: boolean;
                    size: string;
                    weight: string;
                }[];
                style: string;
                bleed: boolean;
                text?: undefined;
                wrap?: undefined;
                height?: undefined;
            } | {
                type: string;
                text: string;
                wrap: boolean;
                height: string;
                items?: undefined;
                style?: undefined;
                bleed?: undefined;
            })[];
        };
    }[];
};
