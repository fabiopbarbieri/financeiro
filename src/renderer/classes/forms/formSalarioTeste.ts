import { insertValores, queryTagSelect } from '../db/queries';
import Tipo from '../Tipo';
import Form from './Form';
import arrayMeses from '../../helpers/arrayMeses';

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
      name: 'ano',
      label: 'Ano',
      type: 'number',
      width: '60px',
      value: new Date().getFullYear(),
    },
    {
      name: 'mes',
      label: 'Mês',
      type: 'select',
      width: '200px',
      // value: `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
      formatFn: (values: string | string[]) => {
        if (!Array.isArray(values)) return { mes: Number(values) };
        return {
          mes: values.map((value) => Number(value)),
        };
      },
      select: {
        type: 'sync',
        options: arrayMeses,
        // defaultValue: true,
        multi: true,
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
      width: '100px',
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
      formatFn: (value: string | string[]) => {
        return { tipo: Number(value) };
      },
    },
  ],
};

export default salario;
