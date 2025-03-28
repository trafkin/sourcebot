interface BaseRepository {
    vcs: 'git' | 'local';
    id: string;
    name: string;
    path: string;
    isStale: boolean;
    lastIndexedDate?: string;
    isFork?: boolean;
    isArchived?: boolean;
    codeHost?: string;
    topics?: string[];
    sizeInBytes?: number;
}

export interface GitRepository extends BaseRepository {
    vcs: 'git';
    cloneUrl: string;
    branches: string[];
    tags: string[];
    gitConfigMetadata?: Record<string, string>;
}

export interface LocalRepository extends BaseRepository {
    vcs: 'local';
    excludedPaths: string[];
    watch: boolean;
}

export type Repository = GitRepository | LocalRepository;

export type AppContext = {
    /**
     * Path to the repos cache directory.
     */
    reposPath: string;

    /**
     * Path to the index cache directory;
     */
    indexPath: string;

    cachePath: string;

    configPath: string;
}

export type Settings = {
    /**
     * The maximum size of a file (in bytes) to be indexed. Files that exceed this maximum will not be indexed.
     */
    maxFileSize: number;
    /**
     * The maximum number of trigrams per document. Files that exceed this maximum will not be indexed.
     */
    maxTrigramCount: number;
    /**
     * Automatically delete stale repositories from the index. Defaults to true.
     */
    autoDeleteStaleRepos: boolean;
    /**
     * The interval (in milliseconds) at which the indexer should re-index all repositories.
     */
    reindexInterval: number;
    /**
     * The interval (in milliseconds) at which the configuration file should be re-synced.
     */
    resyncInterval: number;
}

// @see : https://stackoverflow.com/a/61132308
export type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;