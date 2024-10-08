const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'http://localhost:8080/',
    secure: false,
    logLevel: 'debug' // Correção no valor de logLevel
  }
];

module.exports = PROXY_CONFIG;
