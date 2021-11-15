import { useState, useEffect, createContext } from "react";
import firebase from "../firebaseConnection";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  //logar
  async function login(email, password) {
    setLoadingAuth(true);
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (value) => {
        let uid = value.user.uid;
        const userProfile = await firebase
          .firestore()
          .collection("users")
          .doc(uid)
          .get();

        let data = {
          uid: uid,
          name: userProfile.data().name,
          avatarUrl: userProfile.data().avatarUrl,
          email: value.user.email,
        };
        setUser(data);
        storageUser(data);
        setLoadingAuth(false);
        toast.success("Bem vindo de volta!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Erro!");
        setLoadingAuth(false);
      });
  }

  //registrar
  async function signUp(email, password, name) {
    setLoadingAuth(true);
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      //banco auth
      .then(async (value) => {
        let uid = value.user.uid;
        //banco user
        await firebase
          .firestore()
          .collection("users")
          .doc(uid)
          .set({
            name: name,
            avatarUrl: null,
          })
          .then(() => {
            let data = {
              uid: uid,
              name: name,
              email: value.user.email,
              avatarUrl: null,
            };
            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success("Bem vindo!");
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Erro!");

        setLoadingAuth(false);
      });
  }

  //setando localStorage
  function storageUser(data) {
    localStorage.setItem("ChamadoUser", JSON.stringify(data));
  }
  //localStorageDados chamando
  useEffect(() => {
    function loadStorage() {
      let storageUser = localStorage.getItem("ChamadoUser");
      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
      setLoading(false);
    }
    loadStorage();
  }, []);

  async function signOut() {
    await firebase.auth().signOut();
    localStorage.removeItem("ChamadoUser");
    toast.success("Até outra hora!");
    setUser(null);
  }

  return (
    //retorn um boolean/true caso n seja null
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signUp,
        signOut,
        login,
        loadingAuth,
        setUser,
        storageUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
