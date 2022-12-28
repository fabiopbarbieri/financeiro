import Tipo from 'renderer/classes/Tipo';
import Input from '../Input';

const inputTipo = (tipo: Tipo): Input => {
  return {
    name: 'tipo',
    label: 'Tipo',
    type: 'text',
    value: tipo,
    hidden: true,
    readOnly: true,
    disabled: true,
    formatFn: (value: string | string[]) => {
      return { tipo: Number(value) };
    },
  };
};

export default inputTipo;
