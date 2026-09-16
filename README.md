Este é um projeto [Next.js](https://nextjs.org) inicializado com [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Primeiros Passos

Primeiro, execute o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

Você pode começar a editar a página modificando `app/page.tsx`. A página é atualizada automaticamente conforme você edita o arquivo.

Este projeto utiliza [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) para otimizar e carregar automaticamente a [Geist](https://vercel.com/font), uma nova família de fontes da Vercel.

## Saiba Mais
Para saber mais sobre o Next.js, confira os seguintes recursos:

- [Documentação do Next.js](https://nextjs.org/docs) - aprenda sobre os recursos e a API do Next.js.
- [Learn Next.js](https://nextjs.org/learn) - um tutorial interativo do Next.js.

Você pode conferir o [repositório do Next.js no GitHub](https://github.com/vercel/next.js) — seu feedback e suas contribuições são bem-vindos!

## Deploy na Vercel
A maneira mais fácil de fazer o deploy da sua aplicação Next.js é utilizar a [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), criada pelos desenvolvedores do Next.js.

## Deploy oficial do projeto com docker
- Instale o git e docker em seu Sistema Operacional
- Solicite a build do ERP-SAS-BUILD E API-ERP-BUILD que contem toda automação para uso em produção.
- A build pode ser solicitada entrando em contato com o email do desenvolvedor: 📧 centroserra@gmail.com.
- Dentro deste projeto execute o script de criação\atualização da build `./create-build.sh`
- Agora entre na build ERP-SAS-BUILD e execute o script `up-docker-api.sh` que será criado os container
para o devido funcionamento em Produção.
- Acessando http://localhost:3000 vc tera acesso ao Sistema em produção.

Consulte nos por email [centroserra@gmail.com] para mais detalhes.