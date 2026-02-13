export const id = 521;
export const ids = [521];
export const modules = {

/***/ 5521:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   populateCard: () => (/* binding */ populateCard)
/* harmony export */ });
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5358);

const populateCard = ({ color = 'Emphasis', text, title, titleSize = 'Default', userMentions = [], }) => {
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
                        ...(userMentions.length > 0
                            ? {
                                entities: (0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__/* .buildMentionEntities */ .G8)(userMentions),
                            }
                            : {}),
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
                        ...(userMentions.length > 0
                            ? [
                                {
                                    type: 'TextBlock',
                                    text: (0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__/* .renderMentionsText */ .jx)(userMentions),
                                    wrap: true,
                                    size: 'Small',
                                    spacing: 'Small',
                                },
                            ]
                            : []),
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