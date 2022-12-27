import { insertGenericos, queryTagSelect } from '../db/queries';
import Tipo from '../Tipo';
import Form from './Form';

const generico: Form = {
  insert: insertGenericos,
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
      label: 'Data',
      type: 'date',
      width: '200px',
      value: `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`,
      formatFn: (value: string | string[]) => {
        return {
          ano: Number(String(value).substring(0, 4)),
          mes: Number(String(value).substring(5, 7)),
          dia: Number(String(value).substring(8)),
        };
      },
      min: '1900-01-01',
      max: '3000-12-31',
      required: true,
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
      width: '225px',
      clearAfterInsert: true,
      required: true,
      placeholder: 'Selecione ou crie uma tag',
    },
    {
      name: 'descricao',
      label: 'Descrição',
      type: 'text',
      width: '400px',
      clearAfterInsert: true,
      required: true,
    },
    {
      name: 'valor',
      label: 'Valor',
      type: 'number',
      min: 0.01,
      step: '0.01',
      formatFn: (value: string | string[]) => {
        return { valor: Math.abs(Number(value)) * -1 };
      },
      clearAfterInsert: true,
      required: true,
      placeholder: '',
      onBlur: (event) => {
        event.target.value = String(
          Math.abs(Number(event.target.value)).toFixed(2)
        );
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
