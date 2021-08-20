import { join } from 'path';
import * as fs from 'fs-extra';
import simpleGit from 'simple-git';
import { TMP, GITBOOK_SOURCE, GITBOOK_REVISION, DESTINATION, ASSETS_DIR } from './constants';
import { Node, Parser } from './parser';
import { transform } from './transformer';
import { GuidePage, createSearchIndex, createFuseIndex, createLunrIndex } from './search';

// See /docs/misc/guide.md for documentation of this script.

/** Ensures the given directory exists and prunes its contents. */
const pruneDirectory = (path: string) => {
    fs.removeSync(path);
    fs.mkdirpSync(path);
};

/**
 * Clears the @param destination directory and then populates it with
 * content of the @param repository checked out at @param revision commit.
 */
const fetchSource = async (repository: string, revision: string, destination: string) => {
    pruneDirectory(TMP);
    // Run all subsequent git commands in the TMP directory.
    const git = simpleGit({ baseDir: destination });
    await git.clone(repository, '.');
    await git.checkout(revision);
};

const getAllPages = (index: Node, destination: string, locale = 'en') => {
    const readContent = (id: string) => fs.readFileSync(join(destination, locale, id)).toString();

    const processNode = (node: Node): GuidePage[] =>
        node.type === 'page'
            ? [
                  {
                      title: node.title[locale],
                      url: node.id,
                      content: readContent(node.id),
                  },
              ]
            : ([] as GuidePage[]).concat(...node.children.map(processNode));

    return processNode(index);
};

const main = async () => {
    // Fetch content from GitBook mirror.
    await fetchSource(GITBOOK_SOURCE, GITBOOK_REVISION, TMP);
    // Parse content tree.
    const parser = new Parser(TMP);
    const index = parser.parse();

    // Transform the markdown and copy it to the DESTINATION.
    pruneDirectory(DESTINATION);
    transform(index, TMP, DESTINATION);

    const pages = getAllPages(index, DESTINATION);

    const searchIndex = createSearchIndex(pages);
    fs.writeJSONSync(join(DESTINATION, 'search-index.json'), searchIndex);

    const fuseIndex = createFuseIndex(pages);
    fs.writeJSONSync(join(DESTINATION, 'fuse-index.json'), fuseIndex.toJSON());

    const lunrIndex = createLunrIndex(pages);
    fs.writeJSONSync(join(DESTINATION, 'lunr-index.json'), lunrIndex.toJSON());

    fs.writeJSONSync(join(DESTINATION, 'index.json'), index);
    fs.copySync(join(TMP, ASSETS_DIR), join(DESTINATION, ASSETS_DIR));
};

main();
