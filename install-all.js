const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Carregue a configuração dos microserviços do arquivo JSON
const config = JSON.parse(fs.readFileSync('microservices-config.json', 'utf-8'));

// Diretório raiz do projeto
const rootDir = __dirname;

// Instale as dependências de cada microserviço
config.forEach(service => {
  const servicePath = path.join(rootDir, service.path);
  console.log(`Instalando dependências para ${service.name} em ${servicePath}...`);
  execSync('npm install', { cwd: servicePath, stdio: 'inherit' });
});

console.log('Instalação concluída em todos os microserviços.');
