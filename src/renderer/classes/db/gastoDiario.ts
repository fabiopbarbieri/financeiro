import Serializable from '../Serializable';

/* eslint-disable no-underscore-dangle */
export default class GastoDiario extends Serializable {
  protected id: number | null = null;

  protected data: string;

  protected mes: number;

  protected ano: number;

  protected saida: number;

  protected valor: number;

  protected tag: string;

  protected descricao: string;

  protected valor_calculado: number;

  constructor(
    _data: Date,
    _valor: number,
    _tag: string,
    _descricao: string,
    _saida: boolean
  ) {
    super();
    // eslint-disable-next-line prefer-destructuring
    this.data = _data.toISOString().split('T')[0];
    this.mes = _data.getMonth() + 1;
    this.ano = _data.getFullYear();
    this.valor = _valor;
    this.valor_calculado = _valor * (_saida ? -1 : 1);
    this.saida = _saida ? 1 : 0;
    this.tag = _tag;
    this.descricao = _descricao;
  }
}
