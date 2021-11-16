import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
export default () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { signUp, loadingAuth } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (nome.trim() !== "" && email.trim() !== "" && senha.trim() !== "") {
      signUp(email, senha, nome);
    }
  }
  return (
    <div
      className="window"
      style={{
        backgroundImage: `url("/assets/cover.jpg")`,
      }}
    >
      <div className="areaWindow">
        <img alt="" className="logoSignin" src="/assets/logo.png" />
        <div className="areaLogo">
          <h1>Faça seu Cadastro</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="areaFrom">
            <input
              required
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              required
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              required
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <button className="copy--button log">
              {loadingAuth ? "Carregando..." : "Cadastrar"}
            </button>
          </div>
        </form>
        <Link to="/">Já possui uma conta? Entre aqui.</Link>
      </div>
    </div>
  );
};
