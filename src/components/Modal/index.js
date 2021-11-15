import React from "react";
import { Container, ModalBody, ModalLeftSide, ModalLeftRight } from "./estilo";
import CloseIcon from "@material-ui/icons/Close";
export default ({ data, close }) => {
  function handleClose(e) {
    //e.target onde/quem foi clicado
    if (e.target.classList.contains("modalBg")) {
      close(false);
    }
  }

  return (
    <Container className="modalBg" onClick={handleClose}>
      <ModalBody>
        <ModalLeftSide>
          <div className="dados">
            <h5>
              Nome: <span>{data.cliente}</span>
            </h5>
          </div>

          <div className="dados">
            <h5>
              Assunto: <span>{data.assunto}</span>
            </h5>
          </div>
          <div className="dados">
            <h5>
              Status: <span>{data.status}</span>
            </h5>
          </div>
          <div className="dados">
            <h5>
              Data: <span>{data.createdFormat}</span>
            </h5>
          </div>
          <div className="dados">
            {data.texto === "" && "Sem Complemento"}
            {data.texto !== "" && (
              <h5>
                Complemento: <span className="texto">{data.texto}</span>
              </h5>
            )}
          </div>
          <div className="close">
            <CloseIcon onClick={() => close(false)} />
          </div>
        </ModalLeftSide>
        <ModalLeftRight src="/assets/intro.png" />
      </ModalBody>
    </Container>
  );
};

/*
{data.cliente}
{data.assunto}
{data.status}
{data.createdFormat}
{data.clienteId}
{data.texto}
*/
