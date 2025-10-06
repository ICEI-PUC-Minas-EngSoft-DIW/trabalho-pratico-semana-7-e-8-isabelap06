// app.js — dados + montagem dinâmica + página de detalhes

/* ============= 1) Base de dados (JSON) ============= */
const db = {
  destaques: [
    {
      id: "dest-1",
      titulo: "Romance que emociona",
      subtitulo: "É Assim que Acaba",
      descricao: "Histórias de amor intensas para sentir junto com os personagens.",
      imagem: "image1600.png",
      alt: "Banner com livros de romance",
      genero: "Romance"
    },
    {
      id: "dest-2",
      titulo: "Suspense que prende",
      subtitulo: "Verity",
      descricao: "Reviravoltas para ler de uma vez só e comentar com os amigos.",
      imagem: "livrosuspense1.png",
      alt: "Capa do livro Verity",
      genero: "Suspense"
    },
    {
      id: "dest-3",
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
      imagem: "livroromance1.png",
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

/* ============= 2) Helpers ============= */
function el(tag, attrs = {}, children = []) {
  const $el = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === "class") $el.className = v;
    else if (k.startsWith("data-")) $el.setAttribute(k, v);
    else if (k === "html") $el.innerHTML = v;
    else $el.setAttribute(k, v);
  });
  (Array.isArray(children) ? children : [children]).forEach(child => {
    if (typeof child === "string") $el.appendChild(document.createTextNode(child));
    else if (child) $el.appendChild(child);
  });
  return $el;
}

function allItems() {
  return [
    ...db.destaques.map(d => ({ ...d, autor: d.autor || d.subtitulo, titulo: d.subtitulo || d.titulo })),
    ...db.romance,
    ...db.suspense
  ];
}

/* ============= 3) Criação dos Cards ============= */
function BookCard({ id, titulo, autor, imagem, alt, descricao, nota }) {
  const url = `detalhes.html?id=${encodeURIComponent(id)}`;
  const $img = el("img", { src: imagem, alt: alt || titulo, class: "card-img-top" });
  const $title = el("h3", { class: "h5", style: "color:#8e44ad;" }, titulo);
  const $author = autor ? el("p", { class: "m-0 text-muted" }, `por ${autor}`) : null;
  const $desc = descricao ? el("p", {}, descricao) : null;
  const $rating = typeof nota === "number" ? el("span", { class: "badge bg-warning text-dark" }, `★ ${nota.toFixed(1)}`) : null;
  const $btn = el("a", { href: url, class: "btn btn-outline-primary mt-2" }, "Ver detalhes");

  const $body = el("div", { class: "card-body" }, [$title, $author, $desc, $rating, $btn]);
  const $article = el("article", { class: "card h-100 shadow-sm text-center", "data-id": id }, [$img, $body]);
  return el("div", { class: "col" }, $article);
}

function HighlightCard({ id, titulo, subtitulo, descricao, imagem, alt }) {
  const url = `detalhes.html?id=${encodeURIComponent(id)}`;
  const $img = el("img", { src: imagem, alt: alt || subtitulo, class: "card-img-top" });
  const $h3 = el("h3", { class: "h5", style: "color:#8e44ad;" }, titulo);
  const $p1 = el("p", { class: "m-0 fw-semibold" }, subtitulo || "");
  const $p2 = el("p", {}, descricao || "");
  const $btn = el("a", { href: url, class: "btn btn-outline-primary mt-2" }, "Ver detalhes");

  const $body = el("div", { class: "card-body" }, [$h3, $p1, $p2, $btn]);
  const $article = el("article", { class: "card h-100 shadow-sm text-center", "data-id": id }, [$img, $body]);
  return el("div", { class: "col" }, $article);
}

function renderGrid(items, mountId, cardComponent) {
  const $mount = document.getElementById(mountId);
  if (!$mount) return;
  $mount.replaceChildren();
  items.forEach(item => $mount.appendChild(cardComponent(item)));
}

/* ============= 4) Página de detalhes ============= */
function renderDetalhes() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const $root = document.getElementById("detalheRoot");
  if (!$root) return;

  if (!id) {
    $root.innerHTML = `<div class="alert alert-warning">Nenhum item informado.</div>`;
    return;
  }

  const item = allItems().find(x => x.id === id);
  if (!item) {
    $root.innerHTML = `<div class="alert alert-danger">Item não encontrado.</div>`;
    return;
  }

  const $title = el("h1", { class: "h3 mb-3" }, item.titulo);
  const $img = el("img", { src: item.imagem, alt: item.alt || item.titulo, class: "img-fluid rounded shadow-sm" });
  const $meta = el("p", { class: "text-muted" }, item.autor ? `por ${item.autor}` : "");
  const $desc = el("p", {}, item.descricao || "");
  const $back = el("a", { href: "index.html", class: "btn btn-secondary" }, "← Voltar");
  const $wrap = el("div", { class: "row g-4 align-items-start" }, [
    el("div", { class: "col-12 col-md-5" }, $img),
    el("div", { class: "col-12 col-md-7" }, [$title, $meta, $desc, $back])
  ]);
  $root.replaceChildren($wrap);
}

/* ============= 5) Inicialização ============= */
document.addEventListener("DOMContentLoaded", () => {
  renderGrid(db.destaques, "destaquesGrid", HighlightCard);
  renderGrid(db.romance, "romanceGrid", BookCard);
  renderGrid(db.suspense, "suspenseGrid", BookCard);
  renderDetalhes();
});
