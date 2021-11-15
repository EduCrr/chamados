import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import "./estilo.css";
import WindowArea from "../../components/WindowArea";
import firebase from "../../firebaseConnection";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";

export default () => {
  const [assunto, setAssunto] = useState("suporte");
  const [loadNomes, setLoadNomes] = useState(true);
  const [listaNomes, setListaNomes] = useState([]);
  const [nomeSelect, setNomeSelect] = useState(0);
  const [status, setStatus] = useState("aberto");
  const [texto, setTexto] = useState("");
  const [idCliente, setIdCliente] = useState(false);

  const { id } = useParams();
  const history = useHistory();

  const { user } = useContext(AuthContext);

  //carregando lista de clientes
  useEffect(() => {
    async function loadClientes() {
      await firebase
        .firestore()
        .collection("cutomers")
        .get()
        .then((snapshot) => {
          let lista = [];
          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              nomeFt: doc.data().nomeFt,
            });
          });
          if (lista.length === 0) {
            console.log("Nenhum cliente encontrado!");
            setNomeSelect([{ id: "1", nomeFt: "" }]);
            setLoadNomes(false);
            return;
          } else {
            setListaNomes(lista);
            setLoadNomes(false);
          }
          if (id) {
            loadId(lista);
          }
        })
        .catch((error) => {
          console.log("Error ao procurar os clientes: " + error);
          setLoadNomes(false);
          setNomeSelect([{ id: "1", nomeFt: "" }]);
        });
    }
    loadClientes();
  }, [id]);

  //assunto
  function handleSelect(e) {
    setAssunto(e.target.value);
  }
  //status
  function handleRadio(e) {
    setStatus(e.target.value);
  }
  //nome
  function handleSelectLista(e) {
    setNomeSelect(e.target.value);
  }
  //rever aula 104

  async function handleRegister(e) {
    //editando
    if (idCliente) {
      await firebase
        .firestore()
        .collection("registros")
        .doc(id)
        .update({
          clienteId: listaNomes[nomeSelect].id,
          cliente: listaNomes[nomeSelect].nomeFt,
          assunto: assunto,
          status: status,
          texto: texto,
          userId: user.uid,
        })
        .then(() => {
          toast.success("Chamado editado com sucesso!");
          setTexto("");
          setNomeSelect(0);
          history.push("/dashboard");
        })
        .catch((error) => {
          toast.error("Houve algum erro, tente atualizar mais tarde!");
          console.log(error);
        });
      return;
    }
    e.preventDefault();

    //registra novo chamado
    await firebase
      .firestore()
      .collection("registros")
      .add({
        created: new Date(),
        //lista de nomes com id selecionado
        clienteId: listaNomes[nomeSelect].id,
        cliente: listaNomes[nomeSelect].nomeFt,
        assunto: assunto,
        status: status,
        texto: texto,
        userId: user.uid,
      })
      .then(() => {
        toast.success("Chamado registrado com sucesso!");
        setTexto("");
        setNomeSelect(0);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Erro ao registrar chamado!");
      });
  }

  //funcao que carrega quando eu clico em editar chamado
  async function loadId(lista) {
    await firebase
      .firestore()
      .collection("registros")
      .doc(id)
      .get()
      .then((snapshot) => {
        setAssunto(snapshot.data().assunto);
        setStatus(snapshot.data().status);
        setTexto(snapshot.data().texto);

        let index = lista.findIndex(
          (item) => item.id === snapshot.data().clienteId
        );
        setNomeSelect(index);
        setIdCliente(true);
      })
      .catch((error) => {
        console.log("Erro no Id passado" + error);
        setIdCliente(false);
      });
  }

  return (
    <div className="window">
      <WindowArea>
        <div className="container">
          <h1 className="mb-5">
            {idCliente ? "Atualizando chamado" : "Novo chamado"}
          </h1>
          <div className="contact">
            <div className="row">
              <div className="col-md-12 mt-3 ">
                {listaNomes.length === 0 && (
                  <p>Você precisa adicionar novos clientes</p>
                )}
                {listaNomes.length !== 0 && (
                  <form onSubmit={handleRegister}>
                    <div className="formulario areaFrom ">
                      <label>Cliente</label>
                      {loadNomes ? (
                        <input
                          type="text"
                          disabled={true}
                          placeholder="Carregando..."
                        />
                      ) : (
                        <select
                          value={nomeSelect}
                          onChange={handleSelectLista}
                          className="areaFrom"
                        >
                          {listaNomes.map((item, k) => (
                            <option value={k} key={item.id}>
                              {item.nomeFt}
                            </option>
                          ))}
                        </select>
                      )}
                      <label>Assunto</label>
                      <select
                        value={assunto}
                        onChange={handleSelect}
                        className="areaFrom"
                      >
                        <option value="suporte">Suporte</option>
                        <option value="financeiro">Financeiro</option>
                        <option value="comercial">Comercial</option>
                      </select>
                      <label>Status</label>
                      <div className="radios">
                        <div className="radio">
                          <input
                            type="radio"
                            onChange={handleRadio}
                            name="radio"
                            value="aberto"
                            checked={status === "aberto"}
                          />
                          <span>Em aberto</span>
                        </div>
                        <div className="radio">
                          <input
                            type="radio"
                            onChange={handleRadio}
                            name="radio"
                            value="progresso"
                            checked={status === "progresso"}
                          />
                          <span>Em Progresso</span>
                        </div>
                        <div className="radio">
                          <input
                            type="radio"
                            onChange={handleRadio}
                            name="radio"
                            value="atendido"
                            checked={status === "atendido"}
                          />
                          <span>Atendido</span>
                        </div>
                      </div>
                      <label>Complemento</label>
                      <textarea
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                        placeholder="Descreva seu problema (opcional)"
                      ></textarea>

                      <button type="submit" className="copy--button">
                        {idCliente ? "Atualizar" : "Cadastrar"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </WindowArea>
    </div>
  );
};
