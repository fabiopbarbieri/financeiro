import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'db-get' | 'db-insert';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    dbGet(query: string, ...params: unknown[]) {
      return ipcRenderer.invoke('db-get', query, ...params);
    },
    dbInsertMany(query: string, ...params: unknown[]) {
      return ipcRenderer.invoke('db-insert-many', query, ...params);
    },
    dbInsertOne(query: string, object: unknown) {
      return ipcRenderer.invoke('db-insert-one', query, object);
    },
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
});
