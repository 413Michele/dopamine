import { AlbumArtworkCacheId } from './album-artwork-cache-id';

export abstract class BaseAlbumArtworkCacheService {
    public abstract addArtworkDataToCacheAsync(data: Buffer): Promise<AlbumArtworkCacheId>;
    public abstract removeArtworkDataFromCache(albumKey: string): void;
}
