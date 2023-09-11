const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

// Carregue a configuração dos microserviços do arquivo JSON
const config = JSON.parse(fs.readFileSync('microservices-config.json', 'utf-8'));

// Diretório raiz do projeto
const rootDir = __dirname;

// Inicie cada microserviço
config.forEach(service => {
  const servicePath = path.join(rootDir, service.path);
  console.log(`Iniciando ${service.name} em ${servicePath}...`);
  const childProcess = exec('npm start', { cwd: servicePath });

  childProcess.stdout.on('data', data => {
    console.log(`[${service.name}] ${data}`);
  });

  childProcess.stderr.on('data', data => {
    console.error(`[${service.name}] ${data}`);
  });
});
