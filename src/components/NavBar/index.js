import React from 'react';
import styled from 'styled-components';

import { LogoutButton } from '@nostack/no-stack';
import logo from '../../assets/logo.png'; 

// change styling here
const Wrapper = styled.div`
  left: 0;
  top: 0;
  padding: 1em 3em;
  font-size: 1rem;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavBar = () => (
  <Wrapper>
    <div><img src={logo} alt="" /></div>
    <div>
      LOGOUT
    </div>
  </Wrapper>
);

export default NavBar;
