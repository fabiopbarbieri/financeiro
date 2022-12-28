import Input from '../Input';
import arrayMeses from '../../../helpers/arrayMeses';

const inputMes: Input = {
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
};

export default inputMes;
