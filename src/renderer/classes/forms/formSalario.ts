import meses from './arrayMeses';
import Form from './Form';
import { Option } from './Option';

const salario: Form = {
  inputs: [
    {
      name: 'id',
      label: 'ID',
      type: 'number',
      readOnly: true,
      disabled: true,
      width: '50px',
    },
    /* {
      name: 'ano',
      label: 'Ano',
      type: 'number',
      width: '55px',
      min: 1900,
      max: 3000,
      value: new Date().getFullYear(),
    },
    {
      name: 'mes',
      label: 'Mês',
      type: 'select',
      select: {
        type: 'sync',
        defaultValue: true,
        options: meses,
      },
      width: '130px',
    },*/
    {
      name: 'data',
      label: 'Mês / Ano',
      type: 'month',
      width: '200px',
      value: `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
      formatFn: (value: string) => {
        return {
          ano: Number(value.substring(0, 4)),
          mes: Number(value.substring(5)),
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
            .dbGet(
              'SELECT DISTINCT tag FROM valores where tag like ? order by tag',
              `%${value}%`
            )
            .then((data: Record<string, unknown>[]) => {
              return data.map((item) => {
                return { label: item.tag, value: item.tag };
              });
            }),
      },
      width: '250px',
    },
  ],
};

export default salario;
