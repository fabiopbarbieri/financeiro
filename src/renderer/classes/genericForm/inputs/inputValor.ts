import Input from '../Input';

const inputValor: Input = {
  name: 'valor',
  label: 'Valor',
  type: 'number',
  min: 0.01,
  step: '0.01',
  width: '100px',
  clearAfterInsert: true,
  required: true,
  placeholder: '',
  onBlur: (event) => {
    event.target.value = String(
      Math.abs(Number(event.target.value)).toFixed(2)
    );
  },
};

export default inputValor;
