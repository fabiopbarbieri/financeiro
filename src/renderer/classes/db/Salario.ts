import Tipo from '../Tipo';
import Valor from './Valor';

class Salario extends Valor {
  constructor(
    ano: number,
    mes: number,
    tag: string | null | undefined,
    descricao: string | null | undefined,
    valor: number
  ) {
    super(ano, mes, Tipo.SALARIO, tag, descricao, valor);
  }

  public static new(): Salario {
    return new Salario(0, 0, undefined, undefined, 0);
  }

  public static map(data: Record<string, unknown>): Salario {
    return Object.assign(this.new(), data);
  }
}

export default Salario;
