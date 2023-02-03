import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';


class App extends Component {
  
  handleClick() {
    var usuario = document.getElementById("txtUsuario").value;
    var senha = document.getElementById("txtSenha").value;


    if (usuario == "admin" && senha == "123456") {
      this.props.history.push('/contatos');
    }
    else {
      alert("Credenciais incorretas");
    }
  }

  render() {
    return (
      <Container>
        <Form>
          <Form.Group>
            <Form.Label>Login</Form.Label>
            <Form.Control type="text" id="txtUsuario" placeholder="Digite o usuario" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Senha</Form.Label>
            <Form.Control type="password" id="txtSenha" placeholder="Digite a senha" />
          </Form.Group>

          <br />

          <Button onClick={() => this.handleClick()}>Login</Button>
        </Form>
      </Container>
    );
  }
};


export default App;

