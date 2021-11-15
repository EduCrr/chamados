import styled from "styled-components";

export const Container = styled.div`
  background-color: #2c2c2c;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: all ease 0.5s;

  img.logo {
    height: 40px;
    width: 45px;
    margin-bottom: 30px;
  }
  @media (max-width: 375px) {
    width: ${(props) => (props.menu ? "50px" : "0px")};
  }
`;
