# Trabalho Prático 05 - Semanas 7 e 8

**Páginas de detalhes dinâmicas**

Nessa etapa, vamos evoluir o trabalho anterior, acrescentando a página de detalhes, conforme o  projeto escolhido. Imagine que a página principal (home-page) mostre um visão dos vários itens que existem no seu site. Ao clicar em um item, você é direcionado pra a página de detalhes. A página de detalhe vai mostrar todas as informações sobre o item do seu projeto. seja esse item uma notícia, filme, receita, lugar turístico ou evento.

Leia o enunciado completo no Canvas. 

**IMPORTANTE:** Assim como informado anteriormente, capriche na etapa pois você vai precisar dessa parte para as próximas semanas. 

**IMPORTANTE:** Você deve trabalhar e alterar apenas arquivos dentro da pasta **`public`,** mantendo os arquivos **`index.html`**, **`styles.css`** e **`app.js`** com estes nomes, conforme enunciado. Deixe todos os demais arquivos e pastas desse repositório inalterados. **PRESTE MUITA ATENÇÃO NISSO.**

## Informações Gerais

- Nome:Isabela Pinheiro de Oliveira
- Matricula:898602
- Proposta de projeto escolhida:Temas e Conteúdos Associados
- Breve descrição sobre seu projeto:Recomendações de livros

## Print da Home-Page

![alt text](<Captura de tela 2025-10-05 232439.png>)
![alt text](<Captura de tela 2025-10-05 232501.png>)
![alt text](<Captura de tela 2025-10-05 232530.png>)

## Print da página de detalhes do item
![alt text](<Captura de tela 2025-10-05 232604-1.png>)
![alt text](<Captura de tela 2025-10-05 232628.png>)
![alt text](<Captura de tela 2025-10-05 232642.png>)
## Cole aqui abaixo a estrutura JSON utilizada no app.js

```javascript
/* 1) Base de dados (JSON) */
const db = {
  // Destaques: agora cada destaque aponta para o item real via targetId
  destaques: [
    {
      id: "dest-1",
      targetId: "rom-1",
      titulo: "Romance que emociona",
      subtitulo: "É Assim que Acaba",
      descricao: "Histórias de amor intensas para sentir junto com os personagens.",
      imagem: "livroromance1.png", // <<< capa correta
      alt: "Capa do livro É Assim que Acaba",
      genero: "Romance"
    },
    {
      id: "dest-2",
      targetId: "sus-1",
      titulo: "Suspense que prende",
      subtitulo: "Verity",
      descricao: "Reviravoltas para ler de uma vez só e comentar com os amigos.",
      imagem: "livrosuspense1.png",
      alt: "Capa do livro Verity",
      genero: "Suspense"
    },
    {
      id: "dest-3",
      targetId: "sus-2",
      titulo: "Listas e tendências",
      subtitulo: "Os Mentirosos",
      descricao: "Top 10 do mês, novidades e o que está bombando entre leitores.",
      imagem: "livrosuspense2.png",
      alt: "Capa do livro Os Mentirosos",
      genero: "Geral"
    }
  ],

  romance: [
    {
      id: "rom-1",
      titulo: "É Assim que Acaba",
      autor: "Colleen Hoover",
      imagem: "livroromance1.png", // <<< capa correta
      alt: "Capa do livro É Assim que Acaba",
      descricao: "Um romance contemporâneo sobre ciclos, coragem e recomeços.",
      nota: 4.8
    },
    {
      id: "rom-2",
      titulo: "Novembro, 9",
      autor: "Colleen Hoover",
      imagem: "livroromance2.png",
      alt: "Capa do livro Novembro, 9",
      descricao: "Um encontro anual e um amor marcado por páginas e promessas.",
      nota: 4.6
    }
  ],

  suspense: [
    {
      id: "sus-1",
      titulo: "Verity",
      autor: "Colleen Hoover",
      imagem: "livrosuspense1.png",
      alt: "Capa do livro Verity",
      descricao: "Uma escritora descobre segredos perturbadores ao terminar um manuscrito.",
      nota: 4.7
    },
    {
      id: "sus-2",
      titulo: "Os Mentirosos",
      autor: "E. Lockhart",
      imagem: "livrosuspense2.png",
      alt: "Capa do livro Os Mentirosos",
      descricao: "Uma família rica, um verão inesquecível e um mistério devastador.",
      nota: 4.5
    }
  ]
};
