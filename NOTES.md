## Exemplo de deploy para Nextjs
# copie estas pastas
.next/
public/
package.json
package-lock.json (ou yarn.lock)
node_modules (ou rodar npm install lá)

## Variaveis de ambiente
 - não se esqueça de criar as duas variaveis de ambiente:
`.env e .env.production`

## Boas práticas:
- No servidor rode:
`npm install --production`
`npm run build` no projeto
`npm start` na build