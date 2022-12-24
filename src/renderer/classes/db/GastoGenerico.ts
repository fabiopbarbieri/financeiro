import Tipo from '../Tipo';
import Valor from './Valor';

class GastoGenerico extends Valor {
  protected dia: number | null | undefined;

  constructor(
    date: Date | null | undefined,
    tag: string | null | undefined,
    descricao: string | null | undefined,
    valor: number
  ) {
    super(
      date?.getFullYear() ?? 0,
      (date?.getMonth() ?? -1) + 1,
      Tipo.GENERICO,
      tag,
      descricao,
      valor
    );
    this.dia = date?.getDate();
    // eslint-disable-next-line no-underscore-dangle
    this._table.push({ id: 'dia', order: 1000, filter: true, type: 'number' });
  }

  public static new(): GastoGenerico {
    return new GastoGenerico(undefined, undefined, undefined, 0);
  }

  public static map(data: Record<string, unknown>): GastoGenerico {
    return Object.assign(this.new(), data);
  }
}

export default GastoGenerico;
