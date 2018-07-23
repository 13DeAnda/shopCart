import React from 'react';
import { Nav, NavItem, Navbar} from 'react-bootstrap';
import '../../shared/shared.css';
import './Header.css';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Shop Cart</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} href="https://www.linkedin.com/in/13deanda/">
              GitHub
            </NavItem>
            <NavItem eventKey={2} href="#">
              LinkedIn
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}