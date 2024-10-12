import { FunctionComponent } from 'react';

import logoImg from "../../assets/logo.jpg"

const Header: FunctionComponent = () => {

  return (
      <>
      <header id="main-header">
          <div id="title">
          <img src={logoImg} alt=""/>
          <h1></h1>
          </div>
        <nav>
          <button>Cart (0)</button>
        </nav>
      </header>
      </>
  );
};

export default Header;
