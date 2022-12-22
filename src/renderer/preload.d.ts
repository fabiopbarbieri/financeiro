import { Channels } from 'main/preload';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage(channel: Channels, args: unknown[]): void;
        on(
          channel: string,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: string, func: (...args: unknown[]) => void): void;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dbInsert(query: string, ...params: any[]): Promise<any>;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dbGet(query: string, ...params: any[]): Promise<any>;
      };
    };
  }
}

export {};
