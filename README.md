# POC Menu Screens

Projeto para criar telas e fluxos de protótipo de front-end de forma rápida. O objetivo é experimentar layouts, navegação e jornadas do usuário sem construir um sistema funcional completo — sem integração com backend, autenticação ou persistência real.

## O que é este projeto

- **Protótipos de tela**: cada fluxo vive de forma independente, com suas próprias telas, caminhos e interações.
- **Iteração rápida**: validar ideias de UI/UX, ajustar fluxos e testar estados visuais antes de implementar no produto.
- **Índice na página inicial**: a rota `/` lista os protótipos cadastrados para facilitar o acesso durante o desenvolvimento. Não faz parte do fluxo do usuário final — é apenas um atalho para quem está criando e revisando as telas.

Cada protótipo deve ser pensado como um mini-app isolado. Quem abre um protótipo navega apenas dentro daquele fluxo, sem voltar para o índice pela interface da tela.

## Stack

- React + Vite
- React Router
- Tailwind CSS

## Como rodar

```bash
npm install
npm run dev
```

## Como adicionar um protótipo

1. Crie uma pasta em `src/prototypes/` com o componente do fluxo.
2. Registre o protótipo em `src/prototypes/index.js` (id, título, descrição, tags e componente).
3. O novo card aparecerá automaticamente na página inicial.

## Scripts

| Comando        | Descrição              |
|----------------|------------------------|
| `npm run dev`  | Servidor de desenvolvimento |
| `npm run build`| Build de produção      |
| `npm run preview` | Preview do build    |
| `npm run lint` | Verificação ESLint     |
