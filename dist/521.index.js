export const id = 521;
export const ids = [521];
export const modules = {

/***/ 5521:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   populateCard: () => (/* binding */ populateCard)
/* harmony export */ });
const populateCard = ({ title, text, color = 'emphasis', }) => ({
    type: 'message',
    attachments: [
        {
            contentType: 'application/vnd.microsoft.card.adaptive',
            content: {
                type: 'AdaptiveCard',
                $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
                version: '1.3',
                msteams: {
                    width: 'Full',
                },
                body: [
                    {
                        type: 'Container',
                        items: [
                            {
                                type: 'TextBlock',
                                text: title,
                                wrap: true,
                                size: 'Large',
                                weight: 'Bolder',
                            },
                        ],
                        style: color,
                        bleed: true,
                    },
                    {
                        type: 'TextBlock',
                        text: text,
                        wrap: true,
                        height: 'stretch',
                    },
                ],
            },
        },
    ],
});


/***/ })

};

//# sourceMappingURL=521.index.js.map