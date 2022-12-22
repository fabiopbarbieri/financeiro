import DatabaseConstructor, { Database, RunResult } from 'better-sqlite3';
import path from 'path';

import webpackPaths from '../../../.erb/configs/webpack.paths';
import gastosDiarios from './tables/gastosDiarios';
import gastosFixos from './tables/gastosFixos';
import salarios from './tables/salarios';

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
  db.prepare(gastosDiarios).run();
  db.prepare(salarios).run();
  db.prepare(gastosFixos).run();

  return db;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dbInsert = (db: Database, query: string, ...params: any[]): void => {
  const statement = db.prepare(query);

  const insertMany = db.transaction((table: unknown[]) => {
    console.log('table insert');
    console.log(table);
    table.forEach((row) => statement.run(row));
  });

  insertMany(params);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dbAll = (db: Database, query: string, ...params: any[]): any[] => {
  const statement = db.prepare(query);
  console.log(params);
  if (params === undefined || params === null || params.length === 0) {
    return statement.all();
  }
  return statement.all(params);
};

export default { configureDB, dbInsert, dbAll };
