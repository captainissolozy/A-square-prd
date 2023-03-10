import styled from "styled-components";

const CustomerWrapper = styled.div`
  .container{
    height: 100vh;
    max-width: 900px !important;
    background: white;
  }
  .t-height{
    max-height: 190px;
  }
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
    overflow: scroll;
  }
  .box{
    border: solid black 2px;
  }
  th{
    background: #23354D;
  }

`
export default CustomerWrapper