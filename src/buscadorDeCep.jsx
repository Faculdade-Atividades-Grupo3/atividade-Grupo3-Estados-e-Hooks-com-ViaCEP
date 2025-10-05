// src/BuscadorDeCEP.jsx
import React, { useState } from "react";
import "./BuscadorDeCEP.css"; 



function BuscadorDeCEP() {
  // Estados para guardar o CEP digitado, os dados da API, e mensagens de erro/carregamento
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  // Função para buscar dados na API ViaCEP
  const buscarCEP = async () => {
    // Validação: CEP deve ter 8 dígitos numéricos
    if (!/^\d{8}$/.test(cep)) {
      setErro("Digite um CEP válido com 8 números.");
      setEndereco(null);
      return;
    }

    try {
      setLoading(true);
      setErro(null);
      setEndereco(null);

      // Requisição para API do ViaCEP
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setErro("CEP não encontrado.");
      } else {
        setEndereco(data);
      }
    } catch (error) {
      setErro("Erro ao buscar o CEP. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Função para limpar os dados
  const limpar = () => {
    setCep("");
    setEndereco(null);
    setErro(null);
  };

  return (
    <div className="container">
      <h2>Buscador de CEP</h2>
      
      {/* Input controlado */}
      <input
        type="text"
        placeholder="Digite o CEP (apenas números)"
        value={cep}
        onChange={(e) => {
          // Permite apenas números
          const valor = e.target.value.replace(/\D/g, "");
          setCep(valor);
        }}
        maxLength={8}
      />

      {/* Botões */}
      <div className="buttons">
        <button onClick={buscarCEP}>Buscar</button>
        <button onClick={limpar} className="btn-clear">Limpar</button>
      </div>

      {/* Mensagens de estado */}
      {loading && <p>Carregando...</p>}
      {erro && <p className="erro">{erro}</p>}

      {/* Exibir endereço se encontrado */}
      {endereco && (
        <div className="endereco">
          <p><strong>Logradouro:</strong> {endereco.logradouro}</p>
          <p><strong>Bairro:</strong> {endereco.bairro}</p>
          <p><strong>Cidade:</strong> {endereco.localidade}</p>
          <p><strong>Estado:</strong> {endereco.uf}</p>
        </div>
      )}
    </div>
  );
}

export default BuscadorDeCEP;
