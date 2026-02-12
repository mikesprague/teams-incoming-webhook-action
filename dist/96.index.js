export const id = 96;
export const ids = [96];
export const modules = {

/***/ 9096:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   populateCard: () => (/* binding */ populateCard)
/* harmony export */ });
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5358);

const populateCard = ({ author, branch, color, commit, repoName, repoUrl, runId, runNum, sha, timestamp, title, titleSize = 'Default', }) => {
    const workflowStatusCard = {
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
                                    text: `${(0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__/* .getEmoji */ .x)(color)}${title}`,
                                    wrap: true,
                                    size: titleSize,
                                    weight: 'Bolder',
                                },
                            ],
                            style: color,
                            bleed: true,
                        },
                        {
                            type: 'TextBlock',
                            text: `[**Workflow Run #${runNum}**](${repoUrl}/actions/runs/${runId}) on [**${repoName}**](${repoUrl})`,
                            wrap: true,
                            size: 'Default',
                            spacing: 'Small',
                            weight: 'Default',
                        },
                        {
                            type: 'TextBlock',
                            text: `by **${commit.data.commit.author?.name ?? 'Unknown'}**${author?.login
                                ? author.login.includes('dependabot') ||
                                    author.login.includes('github-actions')
                                    ? ` (**@${author.login}**)`
                                    : ` ([**@${author.login}**](https://github.com/${author.login}))`
                                : ''} on **${timestamp}**`,
                            wrap: true,
                            size: 'Small',
                            spacing: 'None',
                        },
                        {
                            type: 'Container',
                            spacing: 'Small',
                            targetWidth: 'atLeast:Narrow',
                            items: [
                                {
                                    type: 'ColumnSet',
                                    height: 'auto',
                                    spacing: 'None',
                                    targetWidth: 'atLeast:Narrow',
                                    width: 'auto',
                                    columns: [
                                        {
                                            type: 'Column',
                                            width: 'auto',
                                            verticalContentAlignment: 'Top',
                                            items: [
                                                {
                                                    type: 'TextBlock',
                                                    text: 'Branch:',
                                                    weight: 'Bolder',
                                                    size: 'Default',
                                                    spacing: 'None',
                                                },
                                                {
                                                    type: 'TextBlock',
                                                    text: 'Commit:',
                                                    weight: 'Bolder',
                                                    size: 'Default',
                                                    spacing: 'None',
                                                },
                                            ],
                                        },
                                        {
                                            type: 'Column',
                                            width: 'auto',
                                            verticalContentAlignment: 'Top',
                                            items: [
                                                {
                                                    type: 'TextBlock',
                                                    text: `[**${branch}**](${repoUrl}/tree/${branch})`,
                                                    size: 'Default',
                                                    spacing: 'None',
                                                },
                                                {
                                                    type: 'TextBlock',
                                                    text: `[**${sha.slice(0, 7)}**](${commit.data.html_url})`,
                                                    size: 'Default',
                                                    spacing: 'None',
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            },
        ],
    };
    return workflowStatusCard;
};


/***/ })

};

//# sourceMappingURL=96.index.js.map