import { insertValores, queryTagSelect } from '../db/queries';
import Tipo from '../Tipo';
import Form from './Form';

const salario: Form = {
  insert: insertValores,
  inputs: [
    {
      name: 'id',
      label: 'ID',
      type: 'number',
      readOnly: true,
      disabled: true,
      width: '50px',
      hidden: true,
    },
    {
      name: 'data',
      label: 'Mês / Ano',
      type: 'month',
      width: '200px',
      value: `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
      formatFn: (value: string | string[]) => {
        return {
          ano: Number(String(value).substring(0, 4)),
          mes: Number(String(value).substring(5)),
        };
      },
    },
    {
      name: 'tag',
      label: 'TAG',
      type: 'select',
      select: {
        type: 'async',
        loadFn: (value: string) =>
          window.electron.ipcRenderer
            .dbGet(queryTagSelect, `%${value}%`)
            .then((data: Record<string, unknown>[]) => {
              return data.map((item) => {
                return { label: item.tag, value: item.tag };
              });
            }),
      },
      width: '250px',
      clearAfterInsert: true,
    },
    {
      name: 'descricao',
      label: 'Descrição',
      type: 'text',
      width: '400px',
      clearAfterInsert: true,
    },
    {
      name: 'valor',
      label: 'Valor',
      type: 'number',
      min: 0,
      step: '0.01',
      clearAfterInsert: true,
    },
    {
      name: 'tipo',
      label: 'Tipo',
      type: 'text',
      value: Tipo.SALARIO,
      hidden: true,
      readOnly: true,
      disabled: true,
    },
  ],
};

export default salario;
