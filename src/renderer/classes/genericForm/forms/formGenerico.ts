import { insertGenericos } from '../../db/queries';
import Tipo from '../../Tipo';
import Form from '../Form';
import inputDescricao from '../inputs/inputDescricao';
import inputId from '../inputs/inputId';
import inputTag from '../inputs/inputTag';
import inputTipo from '../inputs/inputTipo';
import inputValorNegativo from '../inputs/inputValorNegativo';

const generico: Form = {
  insert: insertGenericos,
  inputs: [
    inputId,
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
    inputTag,
    inputDescricao,
    inputValorNegativo,
    inputTipo(Tipo.GENERICO),
  ],
};

export default generico;
