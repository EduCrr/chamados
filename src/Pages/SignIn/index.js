import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { Link } from "react-router-dom";
import "./estilo.css";
export default () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { login, loadingAuth } = useContext(AuthContext);
  function handleSubmit(e) {
    e.preventDefault();
    if (email !== "" && senha !== "") {
      login(email, senha);
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
        <div class="line"></div>
        <img alt="" className="logoSignin" src="/assets/logo.png" />
        <div className="areaLogo">
          <h1>Faça seu Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="areaFrom">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <button className="copy--button log">
              {loadingAuth ? "Carregando...." : "Fazer login"}
            </button>
          </div>
        </form>
        <div class="line"></div>
        <Link to="/register">Criar uma conta</Link>
      </div>
    </div>
  );
};
