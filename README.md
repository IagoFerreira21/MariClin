# MariClin — Site do Centro Clínico Veterinário

Site institucional de página única (one-page) da MariClin, clínica veterinária em Ituiutaba/MG, com seções de serviços, farmácia/pet shop, especialista, cuidados e contato.

## Estrutura de arquivos

```
mariclin/
├── index.html          # Estrutura e conteúdo do site
├── styles.css          # Estilos (cores, layout, responsividade)
├── script.js           # Interações (menu mobile, botão flutuante do WhatsApp etc.)
└── imagens/            # Fotos dos produtos da farmácia
    ├── banni.jpg
    ├── credeligatos.jpg
    ├── credili.jpg
    ├── doxiclina.jpg
    ├── duptril.jpg
    ├── felinel.jpg
    ├── frontline_.jpg
    ├── metivet.jpg
    ├── mibemax.jpg
    ├── simparic.jpg
    ├── Stomorgy.jpg
    ├── vetnidazol.jpg
    └── zenrelia.jpg
```

Os três arquivos (`index.html`, `styles.css`, `script.js`) e a pasta `imagens/` precisam ficar **na mesma pasta**, com esses nomes exatos, para o site funcionar corretamente.

## Como visualizar

Não precisa de instalação nem servidor: basta dar duplo clique no `index.html` para abrir no navegador.

Para publicar na internet, envie a pasta inteira (os 3 arquivos + a pasta `imagens`) para um serviço de hospedagem como Netlify, Vercel, GitHub Pages ou o servidor do domínio da clínica.

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

## Como atualizar os produtos da Farmácia

Cada produto é um bloco `<div class="farmacia-card">` dentro da seção `<section class="farmacia" id="farmacia">` no `index.html`. Para trocar ou adicionar um produto:

1. Coloque a nova foto (formato `.jpg` ou `.png`) dentro da pasta `imagens/`
2. Copie um bloco `farmacia-card` existente e ajuste:
   - `src` e `href` da imagem, apontando para o novo arquivo em `imagens/`
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
