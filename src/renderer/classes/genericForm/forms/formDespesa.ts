import { insertValores } from '../../db/queries';
import Tipo from '../../Tipo';
import Form from '../Form';
import inputAno from '../inputs/inputAno';
import inputDescricao from '../inputs/inputDescricao';
import inputId from '../inputs/inputId';
import inputMes from '../inputs/inputMes';
import inputTag from '../inputs/inputTag';
import inputTipo from '../inputs/inputTipo';
import inputValorNegativo from '../inputs/inputValorNegativo';

const despesaFixa: Form = {
  insert: insertValores,
  inputs: [
    inputId,
    inputAno,
    inputMes,
    inputTag,
    inputDescricao,
    inputValorNegativo,
    inputTipo(Tipo.DESPESA_FIXA),
  ],
};

export default despesaFixa;
