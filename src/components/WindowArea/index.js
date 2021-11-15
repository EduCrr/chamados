import React, { useState } from "react";
import { WindowContainer, WindowArea, Dehaze } from "./estilo";
import WindowHeader from "../WindowHeader";
import Menu from "../../components/Menu";
import MenuItem from "../../components/MenuItem";
import DehazeIcon from "@material-ui/icons/Dehaze";

export default ({ children }) => {
  const [menu, setMenu] = useState(true);
  function handleMenu() {
    setMenu(!menu);
  }
  return (
    <>
      <Dehaze>
        <DehazeIcon
          style={{ color: menu ? "#2c2c2c" : "white" }}
          onClick={handleMenu}
          className="dehaze"
        />
      </Dehaze>
      <Menu close={menu}>
        <MenuItem
          close={menu}
          link="/dashboard"
          nome="Home"
          alt=""
          icon="/assets/home.png"
        />
        <MenuItem
          close={menu}
          link="/customers"
          nome="Usuario"
          alt=""
          icon="/assets/user.png"
        />
        <MenuItem
          close={menu}
          link="/profile"
          nome="Configuração"
          alt=""
          icon="/assets/conf.png"
        />
      </Menu>
      <WindowContainer>
        <WindowHeader />
        <WindowArea>{children}</WindowArea>
      </WindowContainer>
    </>
  );
};
