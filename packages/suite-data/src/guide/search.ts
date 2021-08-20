import Fuse from 'fuse.js';
import lunr from 'lunr';

const sanitize = (text: string) =>
    text
        .replace(/[^a-zA-Z0-9]+([a-zA-Z0-9]{1,2}[^a-zA-Z0-9]+)*/g, ' ')
        .trim()
        .toLowerCase();

const pipeline = new lunr.Pipeline();
pipeline.add(lunr.trimmer, lunr.stopWordFilter, lunr.stemmer);

export const tokenize = (text: string) => {
    const tokens = sanitize(text)
        .split(' ')
        .map(s => new lunr.Token(s, {}));
    return pipeline.run(tokens).map(t => t.toString());
};

type TokenCountMap = {
    [token: string]: number;
};

type TokenPageCountMap = {
    [token: string]: {
        [pageIndex: number]: number;
    };
};

type TokenPagesMap = {
    [token: string]: number[];
};

export type GuidePage = {
    title: string;
    url: string;
    content: string;
};

export type SearchIndex = [string[], TokenPagesMap];

export const createSearchIndex = (pages: GuidePage[]): SearchIndex => {
    const getTokenCounts = (text: string) =>
        tokenize(text).reduce<TokenCountMap>(
            (dic, token) => ({
                ...dic,
                [token]: 1 + (dic[token] || 0),
            }),
            {},
        );

    const guideIndex = pages
        .map(({ content, title }, docIndex) => ({
            id: docIndex,
            contentTokens: getTokenCounts(content),
            titleTokens: getTokenCounts(title),
        }))
        .map(({ id, contentTokens, titleTokens }) => ({
            id,
            tokens: Object.keys({ ...contentTokens, ...titleTokens }).reduce(
                (dic, token) => ({
                    ...dic,
                    [token]: (contentTokens[token] || 0) + 10 * (titleTokens[token] || 0),
                }),
                {} as TokenCountMap,
            ),
        }))
        .reduce<TokenPageCountMap>(
            (dic, { id, tokens }) =>
                Object.entries(tokens).reduce(
                    (newDic, [token, count]) => ({
                        ...newDic,
                        [token]: {
                            ...(newDic[token] || {}),
                            [id]: count,
                        },
                    }),
                    dic,
                ),
            {},
        );

    const tokenPagesMap = Object.keys(guideIndex).reduce<TokenPagesMap>(
        (dic, token) => ({
            ...dic,
            [token]: Object.entries(guideIndex[token])
                .sort(([, a], [, b]) => b - a)
                .map(([id]) => Number.parseInt(id, 10)),
        }),
        {},
    );

    return [pages.map(({ url }) => url), tokenPagesMap];
};

export const createFuseIndex = (pages: GuidePage[]) =>
    Fuse.createIndex(
        ['title', 'content'],
        pages.map(({ content, ...doc }) => ({
            ...doc,
            content: sanitize(content),
        })),
    );

export const createLunrIndex = (pages: GuidePage[]) =>
    lunr(builder => {
        builder.ref('index');
        builder.field('content');
        pages
            .map(({ content, ...doc }, index) => ({
                ...doc,
                content: sanitize(content),
                index,
            }))
            .forEach(doc => {
                builder.add(doc);
            });
    });
