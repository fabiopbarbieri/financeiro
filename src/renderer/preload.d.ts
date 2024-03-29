import { RunResult } from 'better-sqlite3';
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
        dbInsertMany(query: string, ...params: unknown[]): Promise<RunResult[]>;
        dbInsertOne(query: string, object: unknown): Promise<RunResult>;
        dbGet(
          query: string,
          ...params: unknown[]
        ): Promise<Record<string, unknown>[]>;
      };
    };
  }
}

export {};
