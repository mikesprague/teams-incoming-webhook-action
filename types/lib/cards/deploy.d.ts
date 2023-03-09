export interface DeployCardParams {
    title: string;
    color: string;
    commit: any;
    branch: string | undefined;
    author: any;
    runNum: string;
    runId: string;
    repoName: string;
    sha: string;
    repoUrl: string;
    timestamp: string;
}
export declare const populateCard: ({ title, color, commit, branch, author, runNum, runId, repoName, sha, repoUrl, timestamp, }: DeployCardParams) => {
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
                size?: undefined;
                spacing?: undefined;
                facts?: undefined;
                actions?: undefined;
            } | {
                type: string;
                text: string;
                wrap: boolean;
                items?: undefined;
                style?: undefined;
                bleed?: undefined;
                size?: undefined;
                spacing?: undefined;
                facts?: undefined;
                actions?: undefined;
            } | {
                type: string;
                text: string;
                wrap: boolean;
                size: string;
                spacing: string;
                items?: undefined;
                style?: undefined;
                bleed?: undefined;
                facts?: undefined;
                actions?: undefined;
            } | {
                type: string;
                facts: {
                    title: string;
                    value: string | undefined;
                }[];
                items?: undefined;
                style?: undefined;
                bleed?: undefined;
                text?: undefined;
                wrap?: undefined;
                size?: undefined;
                spacing?: undefined;
                actions?: undefined;
            } | {
                type: string;
                actions: {
                    type: string;
                    title: string;
                    url: any;
                    style: string;
                }[];
                items?: undefined;
                style?: undefined;
                bleed?: undefined;
                text?: undefined;
                wrap?: undefined;
                size?: undefined;
                spacing?: undefined;
                facts?: undefined;
            })[];
        };
    }[];
};
