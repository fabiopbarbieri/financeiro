import { useState } from 'react';
import Valor from 'renderer/classes/db/Valor';
import salario from 'renderer/classes/forms/formSalario';
import '../styles/Hello.css';

import { faker } from '@faker-js/faker';
import Tipo from 'renderer/classes/Tipo';
import DespesaFixa from 'renderer/classes/db/DespesaFixa';
import GastoGenerico from 'renderer/classes/db/GastoGenerico';
import Salario from 'renderer/classes/db/Salario';
import GenericTable from './GenericTable';
import Form from './Form';

const Hello = () => {
  const [valores, setValores] = useState<Valor[]>();

  const insertValores =
    'INSERT INTO valores (ano,mes,tipo,valor,tag,descricao) values (@ano,@mes,@tipo,@valor,@tag,@descricao)';
  const insertGastoDiario =
    'INSERT INTO valores (ano,mes,tipo,valor,tag,descricao,dia) values (@ano,@mes,@tipo,@valor,@tag,@descricao,@dia)';

  const testeGet = () => {
    window.electron.ipcRenderer
      .dbGet('SELECT * FROM valores')
      .then((data: Record<string, unknown>[]) => {
        const diarios = data.map((item) => Valor.map(item));
        setValores(diarios);
        return null;
      })
      .catch((err) => console.error(err));
  };

  const geraGenerico = (): Valor | Salario | DespesaFixa | GastoGenerico => {
    const data = faker.date.between(
      new Date(2020, 0, 1),
      new Date(2022, 11, 31)
    );
    const ano = data.getFullYear();
    const mes = data.getMonth() + 1;
    const tipo: Tipo = faker.datatype.number({ min: 1, max: 4 });
    const tag = faker.helpers.shuffle([
      'comida',
      'ifood',
      'twitch',
      'jogos',
      'beleza',
    ])[0];
    const descricao = faker.helpers.shuffle([
      'queijo',
      'pizza',
      'hidratante',
      'shampoo',
      'sub no streamer AZUL',
      'sub no streamer VERMELHO',
      'sub no streamer VERDE',
      'sub no streamer ROXO',
      'ovo',
    ])[0];
    const valor = faker.datatype.number({ min: 1, max: 4999, precision: 0.01 });

    switch (tipo) {
      case Tipo.DESPESA_FIXA:
        return new DespesaFixa(ano, mes, tag, descricao, valor * -1);
      case Tipo.GENERICO:
        return new GastoGenerico(data, tag, descricao, valor * -1);
      case Tipo.SALARIO:
        return new Salario(ano, mes, tag, descricao, valor);
      default:
        return new Valor(ano, mes, tipo, tag, descricao, valor);
    }
  };

  function clean(original: object): object {
    const obj = Object.assign(original);
    const keys = Object.keys(original).filter((key) => !key.startsWith('_'));
    return JSON.parse(JSON.stringify(obj, keys));
  }

  const testeInsert = () => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 1; i++) {
      const gasto = geraGenerico();
      const query =
        gasto instanceof GastoGenerico ? insertGastoDiario : insertValores;

      window.electron.ipcRenderer
        .dbInsertOne(query, clean(gasto))
        .catch((err) => console.error(err));
    }
  };

  return (
    <div>
      <h1>Financeiro</h1>

      <Form data={salario} />
      <br />
      <br />
      <br />
      <div className="Hello">
        <button type="button" onClick={testeGet}>
          Obter todos
        </button>

        <button type="button" onClick={testeInsert}>
          Inserir 1
        </button>
      </div>

      <GenericTable<Valor> data={valores ?? []} />
    </div>
  );
};

export default Hello;
