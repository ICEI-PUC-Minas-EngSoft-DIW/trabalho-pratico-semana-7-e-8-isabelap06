// app.js — dados + cards dinâmicos + detalhes via ?id=... (com imagens corrigidas)

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

/* 2) Helpers */
function el(tag, attrs = {}, children = []) {
  const $el = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === "class") $el.className = v;
    else if (k === "html") $el.innerHTML = v;
    else $el.setAttribute(k, v);
  });
  (Array.isArray(children) ? children : [children]).forEach(c =>
    c != null && $el.appendChild(typeof c === "string" ? document.createTextNode(c) : c)
  );
  return $el;
}

// retorna um array com todos os itens "reais" (romance + suspense)
function allItems() {
  return [...db.romance, ...db.suspense];
}

// encontra um item por id; se for id de destaque, resolve para o targetId
function findItemById(id) {
  // tenta direto nas coleções reais
  let item = allItems().find(x => x.id === id);
  if (item) return item;

  // se for um destaque, procura o target real
  const dest = db.destaques.find(d => d.id === id);
  if (dest && dest.targetId) {
    item = allItems().find(x => x.id === dest.targetId);
  }
  return item || null;
}

/* 3) Cards da home (com link dinâmico para detalhes) */
function BookCard({ id, titulo, autor, imagem, alt, descricao, nota }) {
  const url = `detalhes.html?id=${encodeURIComponent(id)}`;
  return el("div", { class: "col" }, el("article", { class: "card h-100 shadow-sm text-center", "data-id": id }, [
    el("img", { src: imagem, alt: alt || titulo, class: "card-img-top" }),
    el("div", { class: "card-body" }, [
      el("h3", { class: "h5", style: "color:#8e44ad;" }, titulo),
      autor ? el("p", { class: "m-0 text-muted" }, `por ${autor}`) : null,
      descricao ? el("p", {}, descricao) : null,
      typeof nota === "number" ? el("span", { class: "badge bg-warning text-dark" }, `★ ${nota.toFixed(1)}`) : null,
      el("a", { href: url, class: "btn btn-outline-primary mt-2" }, "Ver detalhes")
    ].filter(Boolean))
  ]));
}

function HighlightCard({ id, targetId, titulo, subtitulo, descricao, imagem, alt }) {
  const goTo = targetId || id; // se houver targetId, usa o id do item real
  const url = `detalhes.html?id=${encodeURIComponent(goTo)}`;
  return el("div", { class: "col" }, el("article", { class: "card h-100 shadow-sm text-center", "data-id": id }, [
    el("img", { src: imagem, alt: alt || subtitulo || titulo, class: "card-img-top" }),
    el("div", { class: "card-body" }, [
      el("h3", { class: "h5", style: "color:#8e44ad;" }, titulo),
      el("p", { class: "m-0 fw-semibold" }, subtitulo || ""),
      el("p", {}, descricao || ""),
      el("a", { href: url, class: "btn btn-outline-primary mt-2" }, "Ver detalhes")
    ])
  ]));
}

function renderGrid(items, mountId, Card) {
  const $mount = document.getElementById(mountId);
  if (!$mount) return;
  $mount.replaceChildren();
  items.forEach(item => $mount.appendChild(Card(item)));
}

/* 4) Página de detalhes: lê ?id=... e monta a view organizada */
function renderDetalhes() {
  const $root = document.getElementById("detalheRoot");
  if (!$root) return; // não está na página de detalhes

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    $root.innerHTML = `<div class="alert alert-warning">Nenhum item informado.</div>`;
    return;
  }

  const item = findItemById(id);
  if (!item) {
    $root.innerHTML = `<div class="alert alert-danger">Item não encontrado.</div>`;
    return;
  }

  const conteudo = el("div", { class: "row g-4 align-items-start" }, [
    el("div", { class: "col-12 col-md-5" }, el("img", {
      src: item.imagem, alt: item.alt || item.titulo, class: "img-fluid rounded shadow-sm"
    })),
    el("div", { class: "col-12 col-md-7" }, [
      el("h1", { class: "h3 mb-2" }, item.titulo),
      item.autor ? el("p", { class: "text-muted" }, `por ${item.autor}`) : null,
      el("p", {}, item.descricao || ""),
      typeof item.nota === "number" ? el("p", {}, `Avaliação: ★ ${item.nota.toFixed(1)}`) : null,
      el("a", { href: "index.html", class: "btn btn-secondary mt-2" }, "← Voltar")
    ].filter(Boolean))
  ]);
  $root.replaceChildren(conteudo);
}

/* 5) Inicialização */
document.addEventListener("DOMContentLoaded", () => {
  // Home
  renderGrid(db.destaques, "destaquesGrid", HighlightCard);
  renderGrid(db.romance, "romanceGrid", BookCard);
  renderGrid(db.suspense, "suspenseGrid", BookCard);
  // Detalhes
  renderDetalhes();
});

