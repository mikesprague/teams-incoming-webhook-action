export const id = 288;
export const ids = [288];
export const modules = {

/***/ 8288:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "populateCard": () => (/* binding */ populateCard)
/* harmony export */ });
const populateCard = ({ title, text, color = 'emphasis' }) => ({
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

//# sourceMappingURL=288.index.js.map