create database energizou;
use energizou;
CREATE TABLE `empresas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome_cliente` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `razao_social` varchar(255) NOT NULL,
  `cnpj` varchar(18) NOT NULL,
  `cep` varchar(9) NOT NULL,
  `endereco` varchar(255) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `telefone` varchar(25) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO empresas (nome_cliente, senha, razao_social, cnpj, cep, endereco, numero, telefone, email)
VALUES ('Caio Gazzara', 'caio123', 'energizou', '12345678000192', '11663450', 'Av Sabia das Laranjeiras', '194', '5511123456789', 'email@example.com');