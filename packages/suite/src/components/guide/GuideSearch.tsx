import React, { useState, useEffect, useMemo } from 'react';
import { tokenize, SearchIndex } from '@trezor/suite-data/src/guide/search';
import styled from 'styled-components';
import { Input, variables } from '@trezor/components';
import { GuideNode } from '@guide-components';
import { Category, Page } from '@suite-types/guide';

const SEARCH_DELAY = 300;
const MIN_QUERY_LENGTH = 3;
const MAX_RESULTS = 5;

const PageFoundList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const PageFound = styled(GuideNode)`
    margin-bottom: 4px;
`;

const NoResults = styled.p`
    font-size: ${variables.FONT_SIZE.SMALL};
    font-weight: ${variables.FONT_WEIGHT.REGULAR};
    color: ${props => props.theme.TYPE_LIGHT_GREY};
`;

const QueryInput = styled(Input)`
    margin-bottom: 8px;
`;

const GuideSearch = ({ pageRoot }: { pageRoot: Category | null }) => {
    const [query, setQuery] = useState('');
    const [index, setIndex] = useState<SearchIndex>();
    const [pageUrlsFound, setPageUrlsFound] = useState<string[]>([]);

    useEffect(() => {
        if (index || !query) return;
        let active = true;
        import('@trezor/suite-data/files/guide/search-index.json').then(idx => {
            if (!active) return;
            setIndex(idx.default as SearchIndex);
        });
        return () => {
            active = false;
        };
    }, [query, index]);

    useEffect(() => {
        if (!index) return;
        const timeout = setTimeout(() => {
            const [pages, tokens] = index;
            const queryTokens = tokenize(query);
            const urlsFound =
                query.length < MIN_QUERY_LENGTH || !queryTokens[0]
                    ? []
                    : tokens[queryTokens[0]]?.map(pageIndex => pages[pageIndex]) || [];
            setPageUrlsFound(urlsFound);
        }, SEARCH_DELAY);
        return () => clearTimeout(timeout);
    }, [query, index]);

    const pageUrlMap = useMemo(() => {
        const reduceNode = (node: Category | Page): { [url: string]: Page } =>
            node.type === 'page'
                ? { [node.id]: node }
                : node.children.reduce(
                      (map, child) => ({
                          ...map,
                          ...reduceNode(child),
                      }),
                      {},
                  );
        return pageRoot ? reduceNode(pageRoot) : {};
    }, [pageRoot]);

    const pagesFound = useMemo(
        () =>
            pageUrlsFound
                .map(url => pageUrlMap[url])
                .filter(page => !!page)
                .slice(0, MAX_RESULTS),
        [pageUrlsFound, pageUrlMap],
    );

    return (
        <>
            <QueryInput
                noTopLabel
                placeholder="Search in Guide..."
                noError
                value={query}
                onChange={e => setQuery(e.currentTarget.value)}
            />
            {pagesFound.length ? (
                <PageFoundList>
                    {pagesFound.map(page => (
                        <PageFound key={page.id} node={page} />
                    ))}
                </PageFoundList>
            ) : (
                query && <NoResults>No results found</NoResults>
            )}
        </>
    );
};

export default GuideSearch;
