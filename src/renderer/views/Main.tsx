import { useEffect, useState } from 'react';
import DespesaFixa from 'renderer/classes/db/DespesaFixa';
import GastoGenerico from 'renderer/classes/db/GastoGenerico';
import Salario from 'renderer/classes/db/Salario';
import ClasseForm from 'renderer/classes/genericForm/Form';
import formDespesa from 'renderer/classes/genericForm/forms/formDespesa';
import formGenerico from 'renderer/classes/genericForm/forms/formGenerico';
import formSalario from 'renderer/classes/genericForm/forms/formSalario';
import { IOption } from 'renderer/classes/RadioButtonGroup';
import Tipo from 'renderer/classes/Tipo';
import RadioButtonGroup from 'renderer/components/RadioButtonGroup';
import Form from '../components/Form';
import GenericTable from '../components/GenericTable';

import '../styles/Main.css';

const Main = () => {
  const [salarios, setSalarios] = useState<Salario[]>();
  const [despesas, setDespesas] = useState<DespesaFixa[]>();
  const [genericos, setGenericos] = useState<GastoGenerico[]>();

  // const insertValores =
  //   'INSERT INTO valores (ano,mes,tipo,valor,tag,descricao) values (@ano,@mes,@tipo,@valor,@tag,@descricao)';
  // const insertGenericos =
  //   'INSERT INTO valores (ano,mes,tipo,valor,tag,descricao,dia) values (@ano,@mes,@tipo,@valor,@tag,@descricao,@dia)';

  function getValores(
    tipo: Tipo,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    classe: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    set: (value: React.SetStateAction<any[] | undefined>) => void
  ) {
    window.electron.ipcRenderer
      .dbGet('SELECT * FROM valores where tipo = ?', tipo)
      .then((data: Record<string, unknown>[]) => {
        set(data.map((item) => classe.map(item)));
        return null;
      })
      .catch((err) => console.error(err));
  }

  function getSalarios() {
    getValores(Tipo.SALARIO, Salario, setSalarios);
  }

  function getDespesas() {
    getValores(Tipo.DESPESA_FIXA, DespesaFixa, setDespesas);
  }

  function getGenericos() {
    getValores(Tipo.GENERICO, GastoGenerico, setGenericos);
  }

  // const geraGenerico = (): Salario | DespesaFixa | GastoGenerico => {
  //   const data = faker.date.between(
  //     new Date(2020, 0, 1),
  //     new Date(2022, 11, 31)
  //   );
  //   const ano = data.getFullYear();
  //   const mes = data.getMonth() + 1;
  //   const tipo: Tipo = faker.datatype.number({ min: 1, max: 4 });
  //   const tag = faker.helpers.shuffle([
  //     'comida',
  //     'ifood',
  //     'twitch',
  //     'jogos',
  //     'beleza',
  //   ])[0];
  //   const descricao = faker.helpers.shuffle([
  //     'queijo',
  //     'pizza',
  //     'hidratante',
  //     'shampoo',
  //     'sub no streamer AZUL',
  //     'sub no streamer VERMELHO',
  //     'sub no streamer VERDE',
  //     'sub no streamer ROXO',
  //     'ovo',
  //   ])[0];
  //   const valor = faker.datatype.number({ min: 1, max: 4999, precision: 0.01 });

  //   switch (tipo) {
  //     case Tipo.DESPESA_FIXA:
  //       return new DespesaFixa(ano, mes, tag, descricao, valor * -1);
  //     case Tipo.GENERICO:
  //       return new GastoGenerico(data, tag, descricao, valor * -1);
  //     case Tipo.SALARIO:
  //       return new Salario(ano, mes, tag, descricao, valor);
  //     default:
  //       return new GastoGenerico(data, tag, descricao, valor * -1);
  //   }
  // };

  // function clean(original: object): object {
  //   const obj = Object.assign(original);
  //   const keys = Object.keys(original).filter((key) => !key.startsWith('_'));
  //   return JSON.parse(JSON.stringify(obj, keys));
  // }

  // const testeInsert = () => {
  //   // eslint-disable-next-line no-plusplus
  //   for (let i = 0; i < 10; i++) {
  //     const gasto = geraGenerico();
  //     const query =
  //       gasto instanceof GastoGenerico ? insertGenericos : insertValores;

  //     window.electron.ipcRenderer
  //       .dbInsertOne(query, clean(gasto))
  //       .catch((err) => console.error(err));
  //   }
  // };

  const tipos: IOption[] = [
    { id: 'generico', label: 'Gasto qualquer', name: 'tipo' },
    { id: 'salario', label: 'Salário', name: 'tipo' },
    { id: 'despesa', label: 'Despesa Fixa', name: 'tipo' },
  ];

  const [tipo, setTipo] = useState<Tipo>(Tipo.GENERICO);
  const [formSchema, setFormSchema] = useState<ClasseForm>(formGenerico);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (tipo === Tipo.DESPESA_FIXA) {
      getDespesas();
      setFormSchema(formDespesa);
    }
    if (tipo === Tipo.SALARIO) {
      getSalarios();
      setFormSchema(formSalario);
    }
    if (tipo === Tipo.GENERICO) {
      getGenericos();
      setFormSchema(formGenerico);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipo]);

  const refresh = () => {
    if (tipo === Tipo.DESPESA_FIXA) getDespesas();
    if (tipo === Tipo.GENERICO) getGenericos();
    if (tipo === Tipo.SALARIO) getSalarios();
  };

  const onClickTableRowDespesaFixa =
    (data: DespesaFixa) => (e: React.MouseEvent<HTMLTableRowElement>) => {
      console.log('click na linha', data);
    };
  const onClickTableRowSalario =
    (data: Salario) => (e: React.MouseEvent<HTMLTableRowElement>) => {
      console.log('click na linha', data);
    };
  const onClickTableRowGastoGenerico =
    (data: GastoGenerico) => (e: React.MouseEvent<HTMLTableRowElement>) => {
      console.log('click na linha', data);
    };

  return (
    <div>
      <h1>Financeiro</h1>

      <RadioButtonGroup
        label="Escolha o que inserir"
        key="tipo"
        onClick={(event) => {
          const label = event.currentTarget.getAttribute('value');
          if (label === 'generico') setTipo(Tipo.GENERICO);
          if (label === 'salario') setTipo(Tipo.SALARIO);
          if (label === 'despesa') setTipo(Tipo.DESPESA_FIXA);
        }}
        options={tipos}
      />

      <Form schema={formSchema} refreshFN={refresh} data={formData} />
      <br />
      <br />
      <br />
      <div className="Hello">
        <button type="button" onClick={refresh}>
          Obter todos
        </button>

        {/* <button type="button" onClick={testeInsert}>
          Inserir 10
        </button> */}
      </div>

      {tipo === Tipo.DESPESA_FIXA ? (
        <GenericTable<DespesaFixa>
          data={despesas ?? []}
          onClick={onClickTableRowDespesaFixa}
        />
      ) : null}
      {tipo === Tipo.GENERICO ? (
        <GenericTable<GastoGenerico>
          data={genericos ?? []}
          onClick={onClickTableRowGastoGenerico}
        />
      ) : null}
      {tipo === Tipo.SALARIO ? (
        <GenericTable<Salario>
          data={salarios ?? []}
          onClick={onClickTableRowSalario}
        />
      ) : null}
    </div>
  );
};

export default Main;
