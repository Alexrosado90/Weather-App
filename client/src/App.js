import React, { Component } from 'react';
import  {
  Container,
  Navbar,
  NavbarBrand,
  Row,
  Col
} from 'reactstrap';


class App extends Component {
  render() {
    return (
      <Container fluid className='centered'>
       <Navbar dark color='dark'>
         <NavbarBrand href='/'>My Weather</NavbarBrand>
       </Navbar>
      <Row>
        <Col></Col>
        </Row>
      </Container>
    );
  }
}

export default App;
