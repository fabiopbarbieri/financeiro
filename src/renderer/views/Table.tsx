/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import ItemFinanceiro from 'renderer/classes/db/ItemFinanceiro';
import proper from './helpers/properCase';

import '../styles/Table.css';

interface TableProps {
  id: string;
  data: ItemFinanceiro[] | undefined;
}

const Table = ({ id, data }: TableProps) => {
  const [table, setTable] = useState<JSX.Element>();

  const format = (value: unknown) => {
    return value;
  };

  const generateRow = (item: ItemFinanceiro, i: number) => {
    return (
      <tr id={`${id}-${i}`}>
        {Object.keys(item).map((key) => {
          return <td id={`${id}-${i}-${key}`}> {format(item[key])} </td>;
        })}
      </tr>
    );
  };

  const generateHeader = (item: ItemFinanceiro) => {
    return (
      <tr id={`${id}-header`}>
        {Object.keys(item).map((key) => {
          let chave = key;

          if (chave.endsWith('_calculado')) {
            chave = chave.substring(0, key.indexOf('_calculado'));
          }

          return <th id={`${id}-${key}`}> {proper(chave)} </th>;
        })}
      </tr>
    );
  };

  const generateTable = (rows: ItemFinanceiro[]) => {
    return (
      <table>
        <>
          {[generateHeader(rows[0])].concat(
            ...rows.map((item, i) => generateRow(item, i))
          )}
        </>
      </table>
    );
  };

  useEffect(() => {
    if (data) setTable(generateTable(data));
    else setTable(undefined);
  }, [data]);

  return <>{table}</>;
};

export default Table;
