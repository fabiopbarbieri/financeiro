const salarios = `CREATE TABLE IF NOT EXISTS salarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  mes INT,
  ano INT,
  valor FLOAT,
  tag VARCHAR(30),
  descricao VARCHAR(200)
)
`;
export default salarios;
