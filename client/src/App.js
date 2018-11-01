import React, { Component } from 'react';
import Weather from './Weather';
import  {
  Container,
  Navbar,
  NavbarBrand,
  Row,
  Col,
  Jumbotron,
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
  FormGroup
} from 'reactstrap';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weather: null,
      cityList: [],
      newCityName: ''
    }
  }

  getCityList = () => {
    fetch('/api/cities')
    .then(res => res.json())
    .then(res => {
      let cityList = res.map(r => r.city_name);
      this.setState({ cityList });
    });
  };

  handleInputChange = (e) => {
    this.setState({ newCityName: e.target.value})

  };

  handleAddCity = () => {
    fetch('/api/cities', {
    method: 'post',
    headers: {'content-type': 'application/json' },
    body: JSON.stringify({ city: this.state.newCityName })
  })
  .then(res => res.json())
  .then(res => {
    this.getCityList();
    this.setState({ newCityName: ''});
  });
};

getWeather = (city) => {
  fetch(`/api/weather/${city}`)
  .then(res => res.json())
  .then(weather => {
    this.setState({ weather });
  });
}

handleChangeCity = (e) => {
  this.getWeather(e.target.value)
}

  componentDidMount () {
    this.getCityList();
  }


  render() {
    return (
      <Container fluid className='centered'>
       <Navbar dark color='dark'>
         <NavbarBrand href='/'>My Weather</NavbarBrand>
       </Navbar>
      <Row>
        <Col>
        <Jumbotron>
          <h1 className='display-3'>My Weather</h1>
          <p className='lead'>The current weather for your favorite cities!</p>

          <InputGroup>
         <Input
           placeholder='New city Name...'
           value={this.state.newCityName}
           onChange={this.handleInputChange}
           />
          <InputGroupAddon addonType='append'>
           <Button color='primary' onClick={this.handleAddCity} />
           </InputGroupAddon>
          </InputGroup>
        </Jumbotron>
           
        </Col>
        </Row>
        <Row>
        <Col>
          <h1 className='display-5'>Current Weather</h1>
          <FormGroup>
            <Input type='select' onChange={this.handleChangeCity}>
              { this.state.cityList.length === 0 && <option>No cities added yet.</option> }
              { this.state.cityList.length > 0 && <option>Select a city</option> }
              { this.state.cityList.map((city, i) => <option key={i}>{city}</option>) }
            </Input>
          </FormGroup>
        </Col>
        </Row>
        <Weather data={this.state.weather} />
      </Container>
    );
  }
}

export default App;
