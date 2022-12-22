import ItemFinanceiro from './ItemFinanceiro';

/* eslint-disable no-underscore-dangle */
export default class GastoDiario extends ItemFinanceiro {
  protected data: string;

  protected saida: number;

  protected valor: number;

  constructor(
    _data: Date = new Date(),
    _valor = 0,
    _tag = '',
    _descricao = '',
    _saida = true
  ) {
    super(
      _data.getMonth() + 1,
      _data.getFullYear(),
      _valor * (_saida ? -1 : 1),
      _tag,
      _descricao
    );
    // eslint-disable-next-line prefer-destructuring
    this.data = _data.toISOString().split('T')[0];
    this.valor = _valor;
    this.saida = _saida ? 1 : 0;
  }

  static map(data: Record<string, unknown>): GastoDiario {
    return Object.assign(new GastoDiario(), data);
  }
}
