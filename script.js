const fs = require('fs');

function registrarLog(nome) {
  const id = Math.floor(Math.random() * 1000000);
  const dataHora = new Date().toISOString();
  const mensagem = `${id} - ${dataHora} - ${nome}\n`;

  fs.appendFileSync('logs.txt', mensagem); 
  console.log('Registrado');
}

registrarLog('Rafael');
