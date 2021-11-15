import styled from "styled-components";

export const WindowArea = styled.div`
  display: flex;
  flex-direction: column;
  height: 70px;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const WindowContent = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  img {
    height: 50px;
    width: 50px;
    object-fit: cover;
    border-radius: 5px;
    margin-right: 20px;
  }
  .copy--button.small {
    margin-left: 15px;
    padding: 3px 8px;
  }
`;
