import React, { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { WindowArea, WindowContent } from "./estilo";
export default () => {
  const { user, signOut } = useContext(AuthContext);
  return (
    <div className="container px-md-0">
      <WindowArea>
        <WindowContent>
          <img
            alt=""
            src={
              user.avatarUrl === null ? "/assets/avatar.png" : user.avatarUrl
            }
          />
          <strong>{user.name}</strong>

          <button className="copy--button small" onClick={() => signOut()}>
            Sair
          </button>
        </WindowContent>
      </WindowArea>
    </div>
  );
};
