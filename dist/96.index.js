export const id = 96;
export const ids = [96];
export const modules = {

/***/ 9096:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   populateCard: () => (/* binding */ populateCard)
/* harmony export */ });
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5358);

const populateCard = ({ title, color, commit, branch, author, runNum, runId, repoName, sha, repoUrl, timestamp, }) => ({
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
                                text: `${(0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__/* .getEmoji */ .xp)(color)}${title}`,
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
                        text: `**Workflow Run #${runNum}** on [${repoName}](${repoUrl})`,
                        wrap: true,
                    },
                    {
                        type: 'TextBlock',
                        text: `by ${commit.data.commit.author?.name ?? 'Unknown'}${author?.login ? ` (@${author.login})` : ''} on ${timestamp}`,
                        wrap: true,
                        size: 'Small',
                        spacing: 'None',
                    },
                    {
                        type: 'FactSet',
                        facts: [
                            {
                                title: 'Branch',
                                value: branch,
                            },
                            {
                                title: 'Commit',
                                value: `${sha.substr(0, 7)}`,
                            },
                        ],
                    },
                    {
                        type: 'ActionSet',
                        actions: [
                            {
                                type: 'Action.OpenUrl',
                                title: 'View Workflow Run',
                                url: `${repoUrl}/actions/runs/${runId}`,
                                style: 'default',
                            },
                            {
                                type: 'Action.OpenUrl',
                                title: 'View Commit Changes',
                                url: commit.data.html_url,
                                style: 'default',
                            },
                        ],
                    },
                ],
            },
        },
    ],
});


/***/ })

};

//# sourceMappingURL=96.index.js.map