import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import "./estilo.css";

import WindowArea from "../../components/WindowArea";
import firebase from "../../firebaseConnection";

export default () => {
  const { user, setUser, storageUser } = useContext(AuthContext);

  const [name, setName] = useState(user && user.name);
  const [avatar, setAvatar] = useState(user && user.avatarUrl);
  const [imgAvatar, setImgAvatar] = useState(null);
  const [email, setEmail] = useState(user && user.email);

  //rever aula 96
  async function handleSubmit(e) {
    e.preventDefault();

    if (imgAvatar === null && name !== "") {
      await firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .update({
          name: name,
        })
        .then(() => {
          let data = {
            ...user,
            name: name,
          };
          setUser(data);
          storageUser(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (name !== "" && imgAvatar !== null) {
      handleUpload();
    }
  }

  function handleFile(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      if (image.type === "image/jpeg" || image.type === "image/png") {
        setImgAvatar(image);
        setAvatar(URL.createObjectURL(e.target.files[0]));
      } else {
        alert("Essa imagem não pode ser enviada!");
        setImgAvatar(null);
        return null; //para de executar
      }
    }
  }

  async function handleUpload() {
    const currentUid = user.uid;
    const upload = await firebase
      .storage()
      .ref(`images/${currentUid}/${imgAvatar.name}`)
      .put(imgAvatar)
      .then(async () => {
        console.log("imagem enviada");
        await firebase
          .storage()
          .ref(`images/${currentUid}`)
          .child(imgAvatar.name)
          .getDownloadURL()
          .then(async (url) => {
            let img = url;
            await firebase
              .firestore()
              .collection("users")
              .doc(user.uid)
              .update({
                avatarUrl: img,
                name: name,
              })
              .then(() => {
                let data = {
                  ...user,
                  name: name,
                  avatarUrl: img,
                };
                setUser(data);
                storageUser(data);
              });
          })
          .catch((error) => {
            console.log("erro na imagem " + error);
          });
      });
  }

  return (
    <div className="window">
      <WindowArea>
        <div className="container">
          <h1 className="mb-5"> Perfil</h1>
          <div className="contact">
            <div className="row">
              <div className="col-md-12 mt-3 ">
                <form onSubmit={handleSubmit}>
                  <div className="formulario areaFrom ">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      type="text"
                      value={email}
                      disabled={true}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <img
                      alt=""
                      className="profile mt-3 mb-3"
                      src={avatar === null ? "/assets/avatar.png" : avatar}
                    />
                    <label for="arquivo">Enviar arquivo</label>
                    <input
                      type="file"
                      id="arquivo"
                      accept="image/*"
                      onChange={handleFile}
                    />
                    <button type="submit" className="copy--button">
                      Atualizar
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
