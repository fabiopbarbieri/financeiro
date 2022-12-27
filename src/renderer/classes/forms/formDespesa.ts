import { insertValores, queryTagSelect } from '../db/queries';
import Tipo from '../Tipo';
import Form from './Form';
import arrayMeses from '../../helpers/arrayMeses';

const despesaFixa: Form = {
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
      min: 1900,
      max: 3000,
      required: true,
    },
    {
      name: 'mes',
      label: 'Mês',
      type: 'select',
      width: '200px',
      formatFn: (values: string | string[]) => {
        if (!Array.isArray(values)) return { mes: Number(values) };
        return {
          mes: values.map((value) => Number(value)),
        };
      },
      select: {
        type: 'sync',
        options: arrayMeses,
        multi: true,
      },
      required: true,
      placeholder: 'Selecione os meses',
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
      width: '800px',
      clearAfterInsert: true,
      required: true,
    },
    {
      name: 'valor',
      label: 'Valor',
      type: 'number',
      min: 0.01,
      step: '0.01',
      clearAfterInsert: true,
      required: true,
    },
    {
      name: 'tipo',
      label: 'Tipo',
      type: 'text',
      value: Tipo.DESPESA_FIXA,
      hidden: true,
      readOnly: true,
      disabled: true,
    },
  ],
};

export default despesaFixa;
