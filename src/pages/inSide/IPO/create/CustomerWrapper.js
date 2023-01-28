import styled from "styled-components";

const CustomerWrapper = styled.div`
  .container{
    min-height: 1080px;
    max-width: 900px !important;
    background: white;
  }
  .pos-top{
    top: 50px;
    box-shadow: 0 2px 4px -4px black;
    background: white;
    z-index: 2;
  }
  .pos-r{
    top: 200px;
    position: relative;
    z-index: 1;
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

`
export default CustomerWrapper