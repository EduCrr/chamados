import styled from "styled-components";

export const WindowContainer = styled.div`
  flex: 1;
  overflow-y: scroll;
  height: 100vh;
`;

export const WindowArea = styled.div`
  margin: auto;
  height: auto;
  width: 95%;
  padding: 20px;
  border-radius: 10px;
`;
export const Dehaze = styled.div`
  .dehaze {
    margin-left: 16px;
    cursor: pointer;
    z-index: 99;
    top: 55px;
    position: absolute;
    display: flex;
    justify-content: center;
  }
`;
