import NodeCache from "node-cache";
import { Unsure } from "./types.universal";

const cache = new NodeCache({
    stdTTL: 100,
    checkperiod: 120
})

export const cacheSet = <T>(key: string, value: T, ttl = 100) => {
    cache.set(key, value, ttl);
};

export const cacheGet = <T>(key: string): Unsure<T> => {
    return cache.get<T>(key);
};

export const cacheClearOne = (key: string) => {
    cache.del(key);
};

export const cacheAllKeys = () => {
    return cache.keys();
};

export const cacheClearAll = () => {
    cache.flushAll();
};