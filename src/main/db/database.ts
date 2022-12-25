import DatabaseConstructor, { Database, RunResult } from 'better-sqlite3';
import path from 'path';

import webpackPaths from '../../../.erb/configs/webpack.paths';
import { index1, index2, index3, valores } from './tables/valores';

const configureDB = (isDebug: boolean): Database => {
  // Read run-time assets
  if (isDebug) {
    path.join(webpackPaths.appPath, 'sql');
  } else {
    path.join(__dirname, '../../sql');
    // In prod, __dirname is release/app/dist/main. We want release/app/sql
  }

  const dbFile = isDebug
    ? path.join(webpackPaths.appPath, '../db.sqlite')
    : path.join(__dirname, '../db.sqlite');

  // Connect to db
  const db: Database = new DatabaseConstructor(dbFile, {
    verbose: console.log,
  });

  // Tabelas
  db.prepare(valores).run();
  db.prepare(index1).run();
  db.prepare(index2).run();
  db.prepare(index3).run();

  return db;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dbInsert = (
  db: Database,
  query: string,
  ...params: unknown[]
): RunResult[] => {
  const statement = db.prepare(query);
  const result: RunResult[] = [];

  db.transaction((table: unknown[]) => {
    table.forEach((row) => {
      result.push(statement.run(row));
    });
  })(params);

  return result;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dbAll = (
  db: Database,
  query: string,
  ...params: Record<string, unknown>[]
): Record<string, unknown>[] => {
  const statement = db.prepare(query);
  if (params === undefined || params === null || params.length === 0) {
    return statement.all();
  }
  return statement.all(params);
};

export default { configureDB, dbInsert, dbAll };
