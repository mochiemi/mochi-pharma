# Configuração do Supabase

## Tabela: medicaments

No painel do Supabase, execute o seguinte SQL no Editor SQL:

```sql
-- Criar tabela de medicamentos
CREATE TABLE medicaments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  class TEXT NOT NULL,
  route TEXT NOT NULL,
  indications TEXT,
  dosage TEXT,
  notes TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE medicaments ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir todas as operações (apenas para desenvolvimento)
-- Em produção, ajuste conforme necessário
CREATE POLICY "Allow all operations" ON medicaments
  FOR ALL USING (true) WITH CHECK (true);

-- Índices para melhor performance
CREATE INDEX idx_medicaments_name ON medicaments(name);
CREATE INDEX idx_medicaments_class ON medicaments(class);
```

## Permissões RLS (Row Level Security)

Para um ambiente de produção, substitua a política acima por:

```sql
-- Permitir SELECT para todos
CREATE POLICY "Allow select" ON medicaments
  FOR SELECT USING (true);

-- Permitir INSERT apenas para usuários autenticados
CREATE POLICY "Allow insert" ON medicaments
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Permitir UPDATE apenas para usuários autenticados
CREATE POLICY "Allow update" ON medicaments
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Permitir DELETE apenas para usuários autenticados
CREATE POLICY "Allow delete" ON medicaments
  FOR DELETE USING (auth.role() = 'authenticated');
```

## Estrutura da Tabela

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| id | UUID | Sim | ID único gerado automaticamente |
| name | TEXT | Sim | Nome do medicamento |
| class | TEXT | Sim | Classe (antibiotic, analgesic, etc) |
| route | TEXT | Sim | Via de administração (oral, iv, etc) |
| indications | TEXT | Não | Indicações médicas |
| dosage | TEXT | Não | Dosagem recomendada |
| notes | TEXT | Não | Anotações pessoais |
| tags | TEXT[] | Não | Array de tags |
| created_at | TIMESTAMPTZ | Sim | Data de criação |

## Valores para class
- `antibiotic` - Antibiótico
- `analgesic` - Analgésico
- `antihypertensive` - Antihipertensivo
- `antidepressant` - Antidepressivo
- `statin` - Estatina
- `antidiabetic` - Antidiabético
- `bronchodilator` - Broncodilatador
- `anticoagulant` - Anticoagulante
- `other` - Outro

## Valores para route
- `oral` - Oral
- `iv` - Intravenosa
- `im` - Intramuscular
- `sc` - Subcutânea
- `topical` - Tópica
- `inhalation` - Inalação
- `rectal` - Retal
- `sublingual` - Sublingual
