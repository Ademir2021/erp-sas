#!/bin/bash

echo "Criando build for ERP-SAS"
rm -rf .next
npm run build

echo "Removendo build for ERP-SAS"
rm -rf ../../builds/erp-sas/.next
rm -rf ../../builds/erp-sas/public
rm ../../builds/erp-sas/package-lock.json
rm ../../builds/erp-sas/package.json

echo "Criando build for ERP-SAS"
cp -rf .next ../../builds/erp-sas
cp -rf public ../../builds/erp-sas
cp package-lock.json ../../builds/erp-sas
cp package.json  ../../builds/erp-sas