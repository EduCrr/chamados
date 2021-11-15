import React from "react";
import { Container } from "./estilo";

export default ({ children, close }) => {
  return (
    <>
      <Container menu={close} style={{ width: close ? "0px" : "60px" }}>
        <img
          alt=""
          style={{ display: close ? "none" : "block" }}
          className="logo"
          src="/assets/logo.png"
        />
        {children}
      </Container>
    </>
  );
};
