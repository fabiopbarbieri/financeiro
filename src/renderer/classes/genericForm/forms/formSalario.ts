import { insertValores } from '../../db/queries';
import Tipo from '../../Tipo';
import Form from '../Form';
import inputAno from '../inputs/inputAno';
import inputDescricao from '../inputs/inputDescricao';
import inputId from '../inputs/inputId';
import inputMes from '../inputs/inputMes';
import inputTag from '../inputs/inputTag';
import inputTipo from '../inputs/inputTipo';
import inputValor from '../inputs/inputValor';

const salario: Form = {
  insert: insertValores,
  inputs: [
    inputId,
    inputAno,
    inputMes,
    inputTag,
    inputDescricao,
    inputValor,
    inputTipo(Tipo.SALARIO),
  ],
};

export default salario;
