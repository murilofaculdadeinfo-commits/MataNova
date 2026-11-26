-- MataNova · seed.sql -- Dados de exemplo. Rode depois do schema.sql. 
  
SET NAMES utf8mb4; 
USE MataNova; 

-- Categorias  
INSERT INTO categoria (nome) VALUES 
  ('Mudas de Arvores'), 
  ('Sementes'), 
  ('Ferramentas'); 

-- Itens  
INSERT INTO item (id_categoria, nome, unidade) VALUES 
  (1, 'Pau brasil (Paubrasilia echinata)', 'bandeja'), 
  (1, 'Palmito jucara (Euterpe edulis)', 'bandeja'), 
  (1, 'Cambuci (Campomanesia phaea)', 'bandeja'), 
  (1, 'Aroeira pimenteira (Schinus terebinthifolia)', 'bandeja'), 
  (2, 'Ipe amarelo (Handroanthus chrysotrichus)', 'pacote'), 
  (2, 'Jequitiba rosa (Cariniana legalis)', 'pacote'), 
  (2, 'Quaresmeira (Pleroma granulosum)', 'pacote'),
  (3, 'Enxada', 'unidade'), 
  (3, 'Luvas de jardinagem', 'unidade'); 

-- Doadores  
INSERT INTO doador (nome, email, telefone) VALUES 
  ('Floricultura Girassol', 'FloriculturaGirassol@exemplo.com', '(14) 2210-9000'), 
  ('Tadeu', 'tadeu@exemplo.com', '(14) 98888-1001'), 
  ('Marcelo', NULL, '(14) 97777-1002'), 
  ('Mario', 'mario@exemplo.com', NULL); 

-- Doações  
INSERT INTO doacao (id_doador, data_doacao, observacao) VALUES 
  (1, '2026-10-05', 'Retirada feita no local'), 
  (2, '2026-10-12', NULL), 
  (4, '2026-10-18', 'Entrega feita pela loja'); 

-- Itens das doações  
INSERT INTO doacao_item (id_doacao, id_item, quantidade) VALUES 
  (1, 1, 10), 
  (1, 2, 15), 
  (1, 3, 8), 
  (2, 5, 12), 
  (2, 6, 12), 
  (3, 8, 20), 
  (3, 9, 6);