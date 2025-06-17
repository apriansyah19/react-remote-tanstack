import { experimental_createQueryPersister } from "@tanstack/query-persist-client-core";
import { get, set, del, createStore } from "idb-keyval";

const store = createStore("reactcache", "query");

export const persister = experimental_createQueryPersister({
  storage: {
    getItem: (key) => get(key, store),
    setItem: (key, value) => set(key, value, store),
    removeItem: (key) => del(key, store),
  },
});
