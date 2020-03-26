import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import "./styles.css";

import logoImg from "../../assets/logo.svg";
import heroesImg from "../../assets/heroes.png";

import api from "../../services/api";

function Logon() {
  const [id, setId] = useState("");

  const history = useHistory();

  async function handleLogon(e) {
    e.preventDefault();

    try {
      const data = { id };
      const response = await api.post("session", data);
      
      localStorage.setItem('ongId',id);
      localStorage.setItem('ongName',response.data.name);

      history.push("/profile");
    } catch (err) {
      alert("Falha no login");
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Bo The Hero" />
        <form onSubmit={handleLogon}>
          <h1>Faça seu login</h1>

          <input
            value={id}
            onChange={e => setId(e.target.value)}
            placeholder="sua ID"
          />
          <button className="button" type="submmit">
            Entrar
          </button>

          <Link to="/register" className="back-link">
            <FiLogIn size="16" color="#E02041" /> Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}

export default Logon;
