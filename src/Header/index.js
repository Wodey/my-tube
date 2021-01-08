import React,{useState} from 'react';
import styled from 'styled-components';
import Burger from "./Burger";
import MobileMenuContainer from "./MobileMenuContainer";
import Search from "./Search";
import HideFromMobile from "../utils/HideFromMobile";

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: ${props => props.theme.maincolor};
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  letter-spacing: 1.5px;
`;

const Header = () => {
  const [isMobileMenuOpen, openMobileMenu] = useState(false);
  return (
    <Wrapper>
      <Logo>LETUBE</Logo>
      <HideFromMobile border={760}>
        <Search />
      </HideFromMobile>
      <Burger cb={() => openMobileMenu(!isMobileMenuOpen)} />
      <MobileMenuContainer isOpen={isMobileMenuOpen}>
        <Search />
      </MobileMenuContainer>
    </Wrapper>
  )
}

export default Header;
