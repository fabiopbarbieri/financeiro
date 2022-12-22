import Serializable from '../Serializable';

export default abstract class ItemFinanceiro extends Serializable {
  protected id: number | null = null;

  protected mes: number;

  protected ano: number;

  protected tag: string;

  protected descricao: string;

  protected valor_calculado: number;

  constructor(
    _mes: number,
    _ano: number,
    _valor = 0,
    _tag = '',
    _descricao = ''
  ) {
    super();
    this.mes = _mes;
    this.ano = _ano;
    this.valor_calculado = _valor;
    this.tag = _tag;
    this.descricao = _descricao;
  }
}
