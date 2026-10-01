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

## ItemsSold

itemsSale
↓
ItemsInTheCard
↓
paymentMethod
├── pix
│ ↓
│ completeSale
│
└── card
↓
completeSale
↓
┌────┴────┐
↓ ↓
sucesso erro
↓ ↓
complete saleNotCompleted

## Debug

```
<pre className="bg-gray-600 p-4 rounded-lg text-xs overflow-auto max-h-96">
{JSON.stringify(<object>, null, 2)}
</pre>
```

# Copiar para fora do docker
docker cp <container>:/caminho/dentro/container ./pasta-no-host

exemplo:
docker cp springboot_api:/app/imgs/items ./imgs

Se quiser gravar em uma pasta especifica:
docker cp springboot_api:/app/imgs/items C:Users/Cliente/Documents/imgs/items