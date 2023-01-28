import styled from "styled-components";

const LobbyWrapper = styled.div`
  .t-tab{
    height: calc(75vh - 62.5px);
    border-bottom: black;
  }

  .t-stick{
    position: sticky; top: 0;
    border-top: white;
    overflow: hidden;
  }
  .table{
    border-bottom: solid black 2px;
    overflow: hidden;
  }
  .box{
    border: solid black 2px;
  }
  th{
    background: #23354D;
  }
  .container{
    min-height: 1080px;
    max-width: 900px !important;
    background: white;
  }

`
export default LobbyWrapper