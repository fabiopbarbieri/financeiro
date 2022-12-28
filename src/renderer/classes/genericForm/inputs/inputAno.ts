import Input from '../Input';

const inputAno: Input = {
  name: 'ano',
  label: 'Ano',
  type: 'number',
  width: '60px',
  value: new Date().getFullYear(),
  min: 1900,
  max: 3000,
  required: true,
};

export default inputAno;
