import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 15px;
`;

export const IconMenu = styled.img`
  height: 20px !important;
  width: 20px !important;
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  background-color: ${(props) => (props.active ? "#2081db" : "transparent")};
  height: 40px;
  width: 40px;
  cursor: pointer;
  border-radius: 20%;
`;
