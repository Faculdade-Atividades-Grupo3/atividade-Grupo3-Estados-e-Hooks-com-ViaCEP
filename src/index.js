// Importa o React e o ReactDOM para renderizar os componentes na tela
import React from 'react';
import ReactDOM from 'react-dom/client';

// Importa o CSS global
import './index.css';

// Importa o componente principal da aplicação (App.js)
import App from './App';

// Importa o módulo de métricas de performance (opcional, vem por padrão no CRA)
import reportWebVitals from './reportWebVitals';

// Cria a raiz da aplicação, pegando a <div id="root"> no index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza o App dentro da raiz, embrulhado em React.StrictMode
// StrictMode ajuda a identificar potenciais problemas durante o desenvolvimento
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Executa a função de métricas de performance (não afeta o funcionamento do app)
// Você pode passar console.log para ver no navegador ou enviar para um servidor de analytics
reportWebVitals();

