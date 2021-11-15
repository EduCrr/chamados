import React, { useState } from "react";
//import { AuthContext } from "../../contexts/auth";
import "./estilo.css";
import WindowArea from "../../components/WindowArea";
import firebase from "../../firebaseConnection";
import { toast } from "react-toastify";

export default () => {
  const [nomeFt, setNomeFt] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");

  //const { user, setUser, storageUser } = useContext(AuthContext);

  async function handleSend(e) {
    e.preventDefault();
    if (nomeFt !== "" && cnpj !== "" && endereco !== "") {
      await firebase
        .firestore()
        .collection("cutomers")
        .add({
          nomeFt: nomeFt,
          cnpj: cnpj,
          endereco: endereco,
        })
        .then(() => {
          console.log("Cliente cadastrado");
          setNomeFt("");
          setCnpj("");
          setEndereco("");
          toast.success("Cliente Cadastrado!");
        })
        .catch((error) => {
          console.log("Error ao cadastar " + error);
          toast.error("Erro ao cadastrar cliente!");
        });
    } else {
      toast.error("Preencha todos os campos!");
    }
  }

  return (
    <div className="window">
      <WindowArea>
        <div className="container">
          <h1 className="mb-5">Adicionar clientes</h1>
          <div className="contact">
            <div className="row">
              <div className="col-md-12 mt-3 ">
                <form onSubmit={handleSend}>
                  <div className="formulario areaFrom ">
                    <input
                      type="text"
                      required
                      value={nomeFt}
                      placeholder="Nome"
                      onChange={(e) => setNomeFt(e.target.value)}
                    />
                    <input
                      type="text"
                      required
                      value={cnpj}
                      placeholder="CNPJ"
                      onChange={(e) => setCnpj(e.target.value)}
                    />
                    <input
                      type="text"
                      required
                      value={endereco}
                      placeholder="Endereço"
                      onChange={(e) => setEndereco(e.target.value)}
                    />
                    <button type="submit" className="copy--button">
                      Cadastrar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </WindowArea>
    </div>
  );
};
