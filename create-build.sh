#!/bin/bash

DIR=../../builds/erp-sas

echo "Criando build for ERP-SAS"
rm -rf .next
npm run build

echo "Removendo build for ERP-SAS"
rm -rf $DIR/.next
rm -rf $DIR/public
rm $DIR/package-lock.json
rm $DIR/package.json

echo "Criando build for ERP-SAS"
cp -rf .next $DIR
cp -rf public $DIR
cp package-lock.json $DIR
cp package.json  $DIR