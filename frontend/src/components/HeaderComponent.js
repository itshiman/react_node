import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  Jumbotron,
  Collapse,
  NavItem,
  NavbarToggler,
  Modal,
  ModalBody,
  Button,
  ModalHeader,
  FormGroup,
  Label,
  Form,
  Input,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      isNavOpen: false,
      isModalOpen: false,
    };
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleLogin(event) {
    this.toggleModal();
    this.props.loginUser({
      username: this.username.value,
      password: this.password.value,
    });
    event.preventDefault();
  }

  handleLogout() {
    this.props.logoutUser();
  }

  render() {
    return (
      <div>
        <Navbar dark expand='md'>
          <div className='container'>
            <NavbarToggler onClick={this.toggleNav} />
            <NavbarBrand className='mr-auto' href='/'>
              <img
                src='assets/images/logo.png'
                height='30'
                width='41'
                alt='Ristorante Con Fusion'
              />
            </NavbarBrand>
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink className='nav-link' to='/home'>
                    <span className='fa fa-home fa-lg'></span> Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className='nav-link' to='/aboutus'>
                    <span className='fa fa-info fa-lg'></span> About Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className='nav-link' to='/menu'>
                    <span className='fa fa-list fa-lg'></span> Menu
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className='nav-link' to='/favorites'>
                    <span className='fa fa-heart fa-lg'></span> My Favorites
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className='nav-link' to='/contactus'>
                    <span className='fa fa-address-card fa-lg'></span> Contact
                    Us
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className='ml-auto' navbar>
                <NavItem>
                  {!this.props.auth.isAuthenticated ? (
                    <Button outline onClick={this.toggleModal}>
                      <span className='fa fa-sign-in fa-lg'></span> Login
                      {this.props.auth.isFetching ? (
                        <span className='fa fa-spinner fa-pulse fa-fw'></span>
                      ) : null}
                    </Button>
                  ) : (
                    <div>
                      <div className='navbar-text mr-3'>
                        {this.props.auth.user.username}
                      </div>
                      <Button outline onClick={this.handleLogout}>
                        <span className='fa fa-sign-out fa-lg'></span> Logout
                        {this.props.auth.isFetching ? (
                          <span className='fa fa-spinner fa-pulse fa-fw'></span>
                        ) : null}
                      </Button>
                    </div>
                  )}
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
        <div
          className='jumbotron bg-cover text-white'
          style={{
            backgroundImage:
              'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.6) 100%), url(https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?cs=srgb&dl=pexels-kaboompics-com-6267.jpg&fm=jpg)',
            height: 300,
          }}>
          <div class='container'>
            <h1 class='display-4'>Ristorante Con Fusion</h1>
            <p class='lead'>
              We take inspiration from the World's best cuisines, and create a
              unique fusion experience. Our lipsmacking creations will tickle
              your culinary senses!
            </p>
          </div>
        </div>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlfor='username'>Username</Label>
                <Input
                  type='text'
                  id='username'
                  name='username'
                  innerRef={(input) => (this.username = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlfor='password'>Password</Label>
                <Input
                  type='password'
                  id='password'
                  name='password'
                  innerRef={(input) => (this.password = input)}
                />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type='checkbox'
                    name='remember'
                    innerRef={(input) => (this.remember = input)}
                  />
                  Remember me
                </Label>
              </FormGroup>
              <Button type='submit' value='submit' color='primary'>
                Log In
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Header;
