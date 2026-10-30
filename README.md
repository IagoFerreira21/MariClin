# MariClin — Site do Centro Clínico Veterinário

Site institucional de página única (one-page) da MariClin, clínica veterinária em Ituiutaba/MG, com seções de serviços, farmácia/pet shop, especialista, cuidados e contato.

## Estrutura de arquivos

```
mariclin/
├── index.html             # Estrutura e conteúdo do site
├── styles.css             # Estilos (cores, layout, responsividade)
├── script.js              # Interações (menu, busca da farmácia, WhatsApp, instalar app)
├── manifest.webmanifest   # PWA: nome, cores e ícones do aplicativo
├── sw.js                  # PWA: service worker (cache / funcionamento offline)
├── icons/                 # PWA: ícones do app (192, 512, maskable, iPhone, favicon)
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── icon-maskable-512.png
│   ├── apple-touch-icon.png
│   └── favicon-32.png
└── *.jpg                  # Fotos dos produtos da farmácia (simparic.jpg, banni.jpg, ...)
```

Todos esses arquivos precisam ficar **na raiz do projeto** (mesma pasta do `index.html`), com esses nomes exatos. O `sw.js` e o `manifest.webmanifest` **não podem** ir para dentro de subpastas.

## Seções do site

- **Início** — banner de abertura com chamada para agendar consulta
- **Sobre** — apresentação da clínica
- **Serviços** — consultas, banho e tosa, vacinas, exames etc.
- **Farmácia** — produtos veterinários disponíveis (antipulgas, vermífugos, anti-inflamatórios, antibióticos), cada um com foto real e link para ver a imagem ampliada
- **Especialista** — destaque para atendimento felino
- **Cuidados** — dicas para tutores
- **Contato** — telefone, WhatsApp, Instagram e endereço

## Contatos configurados no site

- WhatsApp agendamentos: (34) 99966-0026
- WhatsApp pet shop / banho e tosa: (34) 98869-0515
- Instagram: @mariclin.vet
- Endereço: Av. 33A, nº 370, Setor Sul, Ituiutaba/MG

## App instalável (PWA) — Android e iPhone

O site também funciona como **aplicativo**: o cliente instala direto do site, de graça, sem passar pela Play Store ou App Store. O ícone da MariClin fica na tela inicial e o app abre em tela cheia.

### Como o cliente instala

**Android (Google Chrome)**
1. Abrir **mari-clin.vercel.app** no Chrome.
2. Tocar no botão **Instalar app** (canto inferior esquerdo) e depois em **Instalar agora**. Se o botão não aparecer: tocar nos **três pontinhos ⋮** → **Instalar app** (ou **Adicionar à tela inicial**).
3. Confirmar em **Instalar**.

**iPhone / iPad (Safari)**
1. Abrir **mari-clin.vercel.app** no **Safari** (no iPhone a instalação é feita por ele).
2. Tocar no botão **Compartilhar** (quadrado com seta para cima), na barra de baixo.
3. Tocar em **Adicionar à Tela de Início**.
4. Tocar em **Adicionar**, no canto superior direito.

Essas mesmas instruções aparecem dentro do próprio site: botão flutuante **Instalar app** (no iPhone aparece após alguns segundos) e link **Instalar o app** no rodapé.

### Como publicar (GitHub + Vercel)

1. Suba **todos** os arquivos da estrutura acima para o repositório do GitHub (inclusive `manifest.webmanifest`, `sw.js` e a pasta `icons/`).
2. A Vercel publica sozinha. O PWA só funciona em **https** — a Vercel já entrega isso.
3. Abra o site no celular e teste a instalação.

### Como publicar uma atualização do site

O app guarda uma cópia do site no celular do cliente. Sempre que mudar `index.html`, `styles.css`, `script.js` ou as fotos, abra o `sw.js` e **aumente o número da versão** na primeira linha de código:

```js
const VERSION = 'mariclin-v1';   // troque para 'mariclin-v2', depois 'mariclin-v3'...
```

Assim o aparelho do cliente descarta a cópia antiga e baixa a nova.

### Se alguma coisa não aparecer

- O botão **Instalar app** só surge no Android/Chrome quando o navegador considera o site instalável e o app ainda **não** está instalado. Se não aparecer, use o menu ⋮ do Chrome ou o link do rodapé.
- Se o cliente fechar o convite no **X**, ele só volta a aparecer depois de 7 dias (o link do rodapé continua disponível).
- No iPhone, abrir por dentro do Instagram/WhatsApp (navegador interno) não permite instalar: é preciso tocar em "Abrir no Safari".

## Como atualizar os produtos da Farmácia

Cada produto é um bloco `<div class="farmacia-card">` dentro da seção `<section class="farmacia" id="farmacia">` no `index.html`. Para trocar ou adicionar um produto:

1. Coloque a nova foto (formato `.jpg` ou `.png`) na mesma pasta do `index.html`
2. Copie um bloco `farmacia-card` existente e ajuste:
   - `src` e `href` da imagem, apontando para o novo arquivo
   - `alt`, o título (`<h3>`) e a descrição (`<p>`)

## Como trocar o link do WhatsApp

Os botões de WhatsApp usam o formato:
```
https://wa.me/55DDDNUMERO
```
Exemplo: `https://wa.me/553499660026` = Brasil (55) + DDD (34) + número (99966-0026).

## Desenvolvedor

Desenvolvido por **Iago Ferreira**
- WhatsApp: (79) 98157-7750
- E-mail: iagoferreira92015@gmail.com
- https://mari-clin.vercel.app/
