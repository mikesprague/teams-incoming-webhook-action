export const id = 521;
export const ids = [521];
export const modules = {

/***/ 5521:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   populateCard: () => (/* binding */ populateCard)
/* harmony export */ });
const populateCard = ({ color = 'Emphasis', text, title, titleSize = 'Default', }) => {
    // console.log({ color, text, title, titleSize });
    const simpleNotificationCard = {
        type: 'message',
        attachments: [
            {
                contentType: 'application/vnd.microsoft.card.adaptive',
                content: {
                    type: 'AdaptiveCard',
                    $schema: 'https://adaptivecards.io/schemas/adaptive-card.json',
                    version: '1.5',
                    msteams: {
                        width: 'Full',
                    },
                    body: [
                        {
                            type: 'Container',
                            targetWidth: 'atLeast:Narrow',
                            items: [
                                {
                                    type: 'TextBlock',
                                    text: title,
                                    wrap: true,
                                    size: titleSize,
                                    weight: 'Bolder',
                                    spacing: 'None',
                                },
                            ],
                            spacing: 'None',
                            style: color,
                            bleed: true,
                        },
                        {
                            type: 'TextBlock',
                            text: text,
                            wrap: true,
                            size: 'Default',
                            height: 'stretch',
                            spacing: 'Small',
                        },
                    ],
                },
            },
        ],
    };
    return simpleNotificationCard;
};


/***/ })

};

//# sourceMappingURL=521.index.js.map