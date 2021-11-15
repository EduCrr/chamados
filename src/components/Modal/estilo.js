import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(3px);
`;

export const ModalBody = styled.div`
  margin: auto;
  background: radial-gradient(
    at left center,
    rgb(40, 40, 50) 40%,
    rgb(28, 27, 33) 85%
  );
  display: flex;

  align-items: center;
  justify-content: space-around;
  border-radius: 20px;
  box-shadow: 0px, 0px 50px black;
  height: 80vh;
  width: 80vw;
  overflow: auto;
  color: white;

  .close {
    position: absolute;
    top: 30px;
    right: 170px;
    font-size: 5rem;
    color: white;
    cursor: pointer;
    border: none;
    background: none;
  }
  span.texto {
    white-space: pre-wrap;
  }
`;

export const ModalLeftSide = styled.div`
  background-color: #f6f6f6;
  color: #211413;
  border-radius: 20px;
  max-width: 500px;
  padding: 30px;
  .dados {
    margin-bottom: 20px;
    h5 {
      font-weight: bold;
    }
  }
  span {
    font-size: 16px;
  }
`;

export const ModalLeftRight = styled.img`
  height: auto;
  width: 380px;
  background-repeat: no-repeat;
  background-position: center;
`;
