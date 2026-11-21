#!/bin/bash

DIR=../../builds/erp-sas

# echo "Criando build for ERP-SAS"
# rm -rf .next
# npm run build

echo "Removendo build for ERP-SAS"
sudo rm -rf $DIR/.next
sudo rm -rf $DIR/public
sudo rm $DIR/package-lock.json
sudo rm $DIR/package.json

echo "Criando build com docker"
docker run --rm -v "$(pwd)":/app -w /app node:22-alpine sh -c "npm ci && npm run build"

echo "copiando build for ERP-SAS"
sudo cp -rf .next $DIR
sudo cp -rf public $DIR
sudo cp package-lock.json $DIR
sudo cp package.json  $DIR