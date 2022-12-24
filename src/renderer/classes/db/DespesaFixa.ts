import Tipo from '../Tipo';
import Valor from './Valor';

class DespesaFixa extends Valor {
  constructor(
    ano: number,
    mes: number,
    tag: string | null | undefined,
    descricao: string | null | undefined,
    valor: number
  ) {
    super(ano, mes, Tipo.DESPESA_FIXA, tag, descricao, valor);
  }

  public static new(): DespesaFixa {
    return new DespesaFixa(0, 0, undefined, undefined, 0);
  }

  public static map(data: Record<string, unknown>): DespesaFixa {
    return Object.assign(this.new(), data);
  }
}

export default DespesaFixa;
