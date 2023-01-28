import styled from "styled-components";

const NavWrapper = styled.div` 
  .navbar{
    background: #23354D;
  }
  .lmh{
    max-width: 1400px;
  }
.btn-res{
  @media screen and (max-width: 769px){
    display: none!important;
  }
}
  .collapsible .content {
    padding: 6px;
    background-color: #eeeeee;
    @media screen and (min-width: 769px){
      display: none;
    }
  }
  .btn-no{
    cursor: pointer;
    @media screen and (min-width: 769px){
      display: none;
    }
  }
  .hidden{
    display: none;
    @media screen and (max-width: 769px){
      display: block;
    }
  }
`
export default NavWrapper