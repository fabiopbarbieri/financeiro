const gastosDiarios = `CREATE TABLE IF NOT EXISTS gastosDiarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  data DATE,
  mes INT,
  ano INT,
  valor FLOAT,
  tag VARCHAR(30),
  descricao VARCHAR(200),
  saida bit,
  valor_calculado FLOAT
)
`;
export default gastosDiarios;
