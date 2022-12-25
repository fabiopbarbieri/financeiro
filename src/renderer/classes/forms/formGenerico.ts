import { queryTagSelect } from '../db/queries';
import Tipo from '../Tipo';
import Form from './Form';

const generico: Form = {
  inputs: [
    {
      name: 'id',
      label: 'ID',
      type: 'number',
      readOnly: true,
      disabled: true,
      width: '50px',
    },
    {
      name: 'data',
      label: 'Data',
      type: 'date',
      width: '200px',
      value: `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`,
      formatFn: (value: string) => {
        return {
          ano: Number(value.substring(0, 4)),
          mes: Number(value.substring(5, 7)),
          dia: Number(value.substring(8)),
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
    },
    { name: 'descricao', label: 'Descrição', type: 'text', width: '400px' },
    {
      name: 'valor',
      label: 'Valor',
      type: 'number',
      min: 0,
      step: '0.01',
      formatFn: (value: string) => {
        return { valor: Math.abs(Number(value)) * -1 };
      },
    },
    {
      name: 'tipo',
      label: 'Tipo',
      type: 'number',
      value: Tipo.GENERICO,
      hidden: true,
      readOnly: true,
      disabled: true,
    },
  ],
};

export default generico;
