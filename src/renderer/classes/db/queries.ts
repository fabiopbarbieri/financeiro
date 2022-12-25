const queryTagSelect =
  "SELECT DISTINCT tag FROM valores WHERE COALESCE(tag,'') <> '' and TAG like ? ORDER BY tag";

const insertValores =
  'INSERT INTO valores (ano,mes,tipo,valor,tag,descricao) values (@ano,@mes,@tipo,@valor,@tag,@descricao)';

const insertGenericos =
  'INSERT INTO valores (ano,mes,tipo,valor,tag,descricao,dia) values (@ano,@mes,@tipo,@valor,@tag,@descricao,@dia)';

export { queryTagSelect, insertGenericos, insertValores };
