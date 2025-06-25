# Projeto_Voluntariado

### Ajude seu Vizinho

### "Ajude seu Vizinho" é uma plataforma de conexão voluntária local dedicada a suprir necessidades da comunidade, auxiliando na conexão de voluntários e as demandas necessárias. ONGs podem divulgar pedidos de ajuda e receber apoio com alimentos, remédios, serviços ou outras necessidades básicas. Nosso objetivo é promover a solidariedade e o cuidado na comunidade.

# 🚀 Tecnologias Utilizadas

### Este projeto foi desenvolvido utilizando as seguintes tecnologias:

* HTML5: Para a estruturação do conteúdo da página.
* CSS: Para estilização e responsividade do layout, garantindo uma boa experiência em diferentes dispositivos.
* JavaScript: Para a lógica de cadastro, manipulação de dados (utilizando localStorage), busca por CEP (via ViaCEP API), filtragem e exclusão de necessidades.
* Bootstrap 5.3.6: Utilizado para componentes de formulário e responsividade, embora o CSS personalizado domine o design.



# ✨ Funcionalidades

### Página Inicial (index.html)

### Apresentação do Projeto: Informações sobre a iniciativa "Ajude seu Vizinho", seu propósito e como ela funciona.
### Responsividade: O layout se adapta a diferentes tamanhos de tela (desktop, tablet, mobile).
### Navegação: Links para as páginas de Cadastro de Necessidade e Visualização de Necessidade.
### Logo Integrado: A imagem de uma casa, projetada para se alinhar com o título "Ajude seu Vizinho".

### Página de Cadastro de Necessidade (cadastro.html)
* Formulário Abrangente: Campos para cadastro de:
* Nome da Instituição/Pessoa
* Tipo de Ajuda (seleção com opções como Educação, Saúde, Doação de Alimentos, etc.)
* Tipo de Necessidade (descrição breve)
* Descrição Detalhada da Necessidade
* Endereço (CEP, Cidade, Estado, Rua, Bairro, Número)
* Contato (E-mail e Celular)
* Validação de Formulário:
* Verificação de campos obrigatórios.
* Validação de formato de e-mail e confirmação de e-mail.
* Validação e formatação de número de celular.
* Busca automática de endereço por CEP (integração com ViaCEP API).
* Armazenamento Local: As necessidades cadastradas são salvas no localStorage do navegador.

### Página de Visualização de Necessidades (visualicacao.html)

### Exibição de Cards: Necessidades cadastradas são exibidas em formato de cards.
### Detalhes Expansíveis: Botão "Saiba mais" para exibir/ocultar detalhes completos da necessidade (descrição, endereço e contatos).

### Filtros:
### Pesquisa: Campo de busca por descrição e título da necessidade.
### Filtro por Tipo de Ajuda: Dropdown para filtrar necessidades por categorias.
### Exclusão de Necessidades: Botão "Excluir" em cada card para remover uma necessidade.

# 📂 Estrutura do Projeto

### ├── index.html                  // Página inicial do site
### ├── cadastro.html               // Página para cadastrar novas necessidades
### ├── visualicacao.html           // Página para visualizar e gerenciar necessidades
### ├── main.css                    // Folha de estilos principal do site (inclui responsividade)
### ├── main.js                     // Lógica JavaScript (cadastro, exclusão, filtros, CEP)
### ├── casa (2).png                // Imagem da casa (logo)
### └── vizinho.jpg                 // Imagem de apoio na página inicial

# Esse projeto foi realizado utilizando o Github, para melhor visualização das páginas
https://arieledepaula.github.io/Projeto_Voluntariado/


