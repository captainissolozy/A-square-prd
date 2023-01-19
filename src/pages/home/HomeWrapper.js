import styled from "styled-components";

const HomeWrapper = styled.div`
  html{
    overflow: hidden;
  }
  .regis-b {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .box {
    height: calc(100vh - 62.5px);
    z-index: -10;
  }
  .c-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 350px !important;
  }
  .font {
    font-size: 1.2em;
    position: absolute;
    top: 5px;
    left: -26px;
    font-size: 18px;
  }
  .vertical-center {
    margin: 0;
    position: absolute;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  .home-btn {
    width: 100%;
  }
`;
export default HomeWrapper
