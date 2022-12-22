import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import GastoDiario from 'renderer/classes/db/gastoDiario';
import icon from '../../../assets/icon.svg';
import '../styles/App.css';

const Hello = () => {
  const insertGastosDiarios =
    'INSERT INTO gastosDiarios (data,mes,ano,valor,tag,descricao,saida,valor_calculado) values (@data,@mes,@ano,@valor,@tag,@descricao,@saida,@valor_calculado)';

  const testeGet = () => {
    window.electron.ipcRenderer
      .dbGet('SELECT * FROM gastosDiarios')
      .then((data: any[]) => {
        data.forEach((item: Record<string, unknown>) => {
          console.log(GastoDiario.from(item));
        });

        return data;
      })
      .catch((err) => console.error(err));
  };

  const testeInsert = () => {
    const gasto1 = new GastoDiario(
      new Date(),
      100,
      'teste',
      'teste gasto 100',
      true
    );
    const gasto2 = new GastoDiario(
      new Date(),
      50,
      'teste',
      'teste achei 50',
      false
    );

    window.electron.ipcRenderer
      .dbInsert(insertGastosDiarios, gasto1, gasto2)
      .then((data) => {
        console.log('result from insert', data);
        return data;
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div className="Hello">
        <img width="200px" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <button type="button" onClick={testeGet}>
          <span role="img" aria-label="books">
            📚
          </span>
          Read our docs
        </button>

        <button type="button" onClick={testeInsert}>
          <span role="img" aria-label="books">
            🙏
          </span>
          Donate
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
