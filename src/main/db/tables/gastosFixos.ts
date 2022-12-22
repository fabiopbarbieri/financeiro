const gastosFixos = `CREATE TABLE IF NOT EXISTS gastosFixos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  mes INT,
  ano INT,
  valor FLOAT,
  tag VARCHAR(30),
  descricao VARCHAR(200),
  valor_calculado FLOAT
)
`;
export default gastosFixos;
