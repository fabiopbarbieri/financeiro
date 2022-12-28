import Input from '../Input';

const inputValorNegativo: Input = {
  name: 'valor',
  label: 'Valor',
  type: 'number',
  min: 0.01,
  step: '0.01',
  width: '100px',
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
};

export default inputValorNegativo;
