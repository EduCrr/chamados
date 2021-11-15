import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Container, IconMenu, Icon } from "./estilo";
export default ({ link, nome, icon, close }) => {
  let history = useHistory();
  let location = useLocation();
  let isActive = location.pathname === link;
  function handleClick(e) {
    e.preventDefault();
    history.push(link);
  }
  return (
    <Container style={{ display: close ? "none" : "flex" }}>
      <Icon href={link} active={isActive} onClick={handleClick}>
        <IconMenu src={icon} />
      </Icon>
    </Container>
  );
};

/*
function handleClick(e) {
  e.preventDefault();
  history.push(link);
}
*/
