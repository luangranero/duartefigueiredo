# Duarte Figueiredo — Advocacia Previdenciária

Site institucional estático (HTML + CSS + JS puro, sem build). Basta abrir `index.html`
ou publicar a pasta inteira em qualquer hospedagem (Netlify, Vercel, GitHub Pages, hospedagem comum).

## Estrutura

```
index.html          página única com todas as seções
css/style.css       design system (cores, tipografia, componentes, responsivo)
js/main.js          animações, menu, parallax, formulário → WhatsApp
assets/img/         imagens usadas no site
assets/img/_extras/ imagens baixadas mas não usadas (reserva)
assets/src/         os .pptx originais que serviram de conteúdo
```

## Conteúdo

Todo o texto veio das duas apresentações em `assets/src/`. Dados de contato usados:

- WhatsApp: +55 (11) 9.4159-4174 → `wa.me/5511941594174`
- E-mail: adv.juridicobr@gmail.com
- Instagram: @duartefigueiredo.previdencia
- Endereço: Rua Tabatinguera, nº 140, sala 610 – 6º andar, Sé – São Paulo/SP
- OAB/SP nº 361.083

O rodapé traz o aviso de caráter informativo exigido pelo Código de Ética da OAB
e pelo Provimento nº 205/2021 — não remova.

## Animações

- **Hero**: Ken Burns lento na foto de fundo, partículas douradas em `<canvas>` que reagem
  ao cursor, balança da justiça em SVG que é "desenhada" e depois oscila em loop, e as linhas
  do título entrando em cascata.
- **Ao longo do site**: reveal por `IntersectionObserver`, parallax suave nas figuras
  marcadas com `.parallax`, tarja rolante de áreas de atuação, hover nos cards.
- Tudo respeita `prefers-reduced-motion`.

## O que trocar antes de publicar

1. **Foto da Jéssica** — `assets/img/advogada.jpg` é uma foto de banco de imagens usada
   como placeholder. Substitua pelo retrato profissional real (o `<img>` está marcado com
   um comentário `TODO` em `index.html`). Enquanto for placeholder, não publique o site.
2. **Demais fotos** — as imagens de apoio (`hero-justice`, `maos-idoso`, `consulta`,
   `tribunal`, `livros`, `calculo`, `handshake`, `exterior`) são do Unsplash (uso livre).
   Podem ser trocadas por fotos do escritório mantendo os mesmos nomes de arquivo.
3. **Logo** — `assets/img/logo.jpg` foi extraído do PPT. Se existir uma versão em PNG com
   fundo transparente ou em SVG, use-a e remova o `background:#fff` do `.brand img` no CSS.
4. **Formulário** — hoje ele monta a mensagem e abre o WhatsApp; nenhum dado é armazenado.
   Se quiser recebimento por e-mail, plugue um serviço como Formspree no `submit` de
   `js/main.js`.
