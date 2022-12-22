import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'db-get' | 'db-insert';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dbGet(query: string, ...params: any[]) {
      return ipcRenderer.invoke('db-get', query, ...params);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dbInsert(query: string, ...params: any[]) {
      return ipcRenderer.invoke('db-insert', query, ...params);
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
