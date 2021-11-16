import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import "./estilo.css";
import { format } from "date-fns";
import firebase from "../../firebaseConnection";
import WindowArea from "../../components/WindowArea";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import SearchIcon from "@material-ui/icons/Search";
import CreateIcon from "@material-ui/icons/Create";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";
import DeleteIcon from "@material-ui/icons/Delete";
import { toast } from "react-toastify";
export default () => {
  const { user } = useContext(AuthContext);
  const [value, onChange] = useState(new Date());
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [lastDocs, setLastDocs] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [showSearch, setShowSearch] = useState(true);
  console.log(user);
  let helpTextFirebase = firebase
    .firestore()
    .collection("registros")
    .where("userId", "==", user.uid);

  async function updateState(snapshot) {
    //entao é vazio true
    let isCollentionEmpty = snapshot.size === 0;
    if (!isCollentionEmpty) {
      let lista = [];
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          assunto: doc.data().assunto,
          cliente: doc.data().cliente,
          clienteId: doc.data().clienteId,
          created: doc.data().created,
          createdFormat: format(doc.data().created.toDate(), "dd/MM/yyyy"),
          status: doc.data().status,
          texto: doc.data().texto,
          userId: doc.data().userId,
        });
      });
      let lastRegistro = snapshot.docs[snapshot.docs.length - 1]; //pegando ultimo documento
      setLastDocs(lastRegistro);
      setChamados((chamados) => [...chamados, ...lista]);
    } else {
      setIsEmpty(true);
    }
    setLoadingMore(false);
  }

  useEffect(() => {
    async function loadingChamados() {
      await helpTextFirebase
        .limit(5)
        .get()
        .then((snapshot) => {
          updateState(snapshot);
        })
        .catch((error) => {
          console.log("Não foi possivel carragar os chamados" + error);
          setLoadingMore(false);
        });
      setLoading(false);
    }
    loadingChamados();
  }, []);

  //carregando mais chamados
  async function handleSearch(e) {
    e.preventDefault();
    setLoadingMore(true);
    await helpTextFirebase

      .startAfter(lastDocs)
      .limit(5)
      .get()
      .then((snapshot) => {
        updateState(snapshot);
      })
      .catch((error) => {
        console.log("Não foi possivel carragar os chamados " + error);
      });
  }

  function handleToggleModal(item) {
    setShowModal(!showModal);
    setDataModal(item);
  }

  function handleSearchCat(e) {
    e.preventDefault();
    let cat = e.target.innerHTML;
    console.log(cat);
    handleSearchEach(cat.toLowerCase());
    setShowSearch(false);
  }
  async function handleSearchEach(busca) {
    await firebase
      .firestore()
      .collection("registros")
      .where("status", "==", busca)
      .where("userId", "==", user.uid)
      .get()
      .then((snapshot) => {
        setChamados([]);
        updateState(snapshot);
      })
      .catch((error) => {
        console.log("Não foi possivel carragar os chamados" + error);
        setLoadingMore(false);
      });
    setLoading(false);
  }
  async function handleDeleteChamado(id) {
    await firebase
      .firestore()
      .collection("registros")
      .doc(id)
      .delete()
      .then(() => {
        toast.success("Chamado removido com sucesso!");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
  }
  return (
    <div className="window">
      <WindowArea>
        <div className="container ">
          <h1 className="mb-5">Dashboard</h1>
          <div className="row ">
            <div className="col-xl-8  px-xl-3">
              <div className="welcome mb-5">
                <div className="area">
                  <div className="leftSide">
                    <h3>Olá {user.name} </h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco.
                    </p>
                  </div>
                  <div className="rightSide">
                    <img src="/assets/intro.png" />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="mb-5">Meus Chamados</h3>
                <div className="mb-5 btns">
                  <button className="copy--button" onClick={handleSearchCat}>
                    Aberto
                  </button>
                  <button
                    className="copy--button left"
                    onClick={handleSearchCat}
                  >
                    Progresso
                  </button>
                  <button
                    className="copy--button left"
                    onClick={handleSearchCat}
                  >
                    Atendido
                  </button>
                </div>
                {loading ? (
                  <p>Buscando chamados...</p>
                ) : chamados.length === 0 ? (
                  <p>
                    Você não possui nenhum chamado!
                    <CheckCircleIcon style={{ color: "#2081db" }} />
                    <div className="mt-5">
                      <Link to="/new" className="copy--button">
                        Adicionar novo chamado
                      </Link>
                    </div>
                  </p>
                ) : (
                  <>
                    {chamados.map((item, k) => (
                      <div className="areaChamado" key={k}>
                        <div className="areaIcon">
                          <div className="box boxId">{k + 1}</div>
                        </div>
                        <div className="areaName">{item.cliente}</div>
                        <div
                          className="areaStatus"
                          style={{
                            backgroundColor:
                              item.status === "aberto" ? "#5cb85c" : "#2c2c2c",
                          }}
                        >
                          {item.status}
                        </div>
                        <div className="date">{item.createdFormat}</div>
                        <div className="btns">
                          <div className="box">
                            <SearchIcon
                              style={{ color: "white" }}
                              onClick={() => handleToggleModal(item)}
                            />
                          </div>
                          <div className="box">
                            <Link to={`/new/${item.id}`}>
                              <CreateIcon style={{ color: "white" }} />
                            </Link>
                          </div>
                          <div className="box delete">
                            <DeleteIcon
                              onClick={() => handleDeleteChamado(item.id)}
                              style={{ color: "white" }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="mt-5 mb-5 btnSearch">
                      {loadingMore && <p>Buscando novos chamados...</p>}
                      {showSearch
                        ? !loadingMore &&
                          !isEmpty && (
                            <a
                              onClick={handleSearch}
                              className="copy--button"
                              style={{ marginRight: "15px" }}
                            >
                              Buscar mais
                            </a>
                          )
                        : ""}
                      <Link to="/new" className="copy--button">
                        Adicionar novo chamado
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="col-xl-4 px-xl-4">
              <Calendar onChange={onChange} value={value} />
              <div className="profileUser">
                <div className="profileInfo">
                  <img
                    alt=""
                    className="profileInfoImg"
                    src={
                      user.avatarUrl === null
                        ? "/assets/avatar.png"
                        : user.avatarUrl
                    }
                  />
                  <h5>{user.name}</h5>
                  <p>Sr Menager</p>
                  <p>
                    Meus Chamados: <strong>{chamados.length}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showModal && <Modal data={dataModal} close={setShowModal} />}
      </WindowArea>
    </div>
  );
};
