const valores = `CREATE TABLE IF NOT EXISTS "valores" (
	"id"	  INTEGER PRIMARY KEY AUTOINCREMENT,
	"ano"	INTEGER NOT NULL,
	"mes"	INTEGER NOT NULL,
	"tipo"	INTEGER NOT NULL,
	"valor"	REAL NOT NULL,
	"tag"	TEXT,
	"descricao"	TEXT,
	"dia"	INTEGER
)`;

const index1 = `CREATE INDEX IF NOT EXISTS "IX_001" ON "valores" (
	"ano"	DESC,
	"mes"	DESC,
	"tipo"	ASC
)`;

const index2 = `CREATE INDEX IF NOT EXISTS "IX_002" ON "valores" (
	"tipo"	ASC,
	"ano"	DESC,
	"mes"	DESC
)`;

const index3 = `CREATE INDEX IF NOT EXISTS "IX_003" ON "valores" (
	"tag"	ASC
)`;

export { valores, index1, index2, index3 };
