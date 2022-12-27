import { RankingInfo } from '@tanstack/match-sorter-utils';
import translateMonth from 'renderer/helpers/translateMonth';
import Serializable from '../Serializable';
import TableProperties from '../TableProperties';
import Tipo from '../Tipo';

declare module '@tanstack/table-core' {
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

class Valor extends Serializable {
  protected id: number | undefined;

  protected _table: TableProperties<Valor>[] = [
    { id: 'id', hidden: true, order: -1, type: 'number' },
    {
      id: 'ano',
      order: 10,
      filter: true,
      type: 'number',
      acessorFn: (value) => String(value.ano),
    },
    {
      id: 'mes',
      order: 20,
      filter: true,
      acessorFn: (value) => translateMonth(value.mes - 1),
      sortingFn: (rowA, rowB) => rowA.original.mes - rowB.original.mes,
      type: 'number',
    },
    { id: 'tag', order: 30, filter: true, type: 'string' },
    {
      id: 'descricao',
      order: 40,
      type: 'string',
    },
    {
      id: 'valor',
      order: 50,
      property: 'valor',
      format: (value) =>
        `${Number(value).toFixed(2)}`
          .replace(',', '«')
          .replace('.', ',')
          .replace('«', '.'),
      type: 'money',
    },
  ];

  constructor(
    protected ano: number,
    protected mes: number,
    protected tipo: Tipo = Tipo.SEM_TIPO,
    protected tag: string | null | undefined,
    protected descricao: string | null | undefined,
    protected valor: number
  ) {
    super();
  }

  public getTable(): TableProperties<Valor>[] {
    // eslint-disable-next-line no-underscore-dangle
    return this._table;
  }

  public static new(): Valor {
    return new Valor(0, 0, Tipo.SEM_TIPO, undefined, undefined, 0);
  }

  public static map(data: Record<string, unknown>): Valor {
    return Object.assign(this.new(), data);
  }

  public getProperty(id: string): TableProperties<Valor> | undefined {
    // eslint-disable-next-line no-underscore-dangle
    return this._table.find(
      (property) => id === property.property ?? property.id
    );
  }
}

export default Valor;
