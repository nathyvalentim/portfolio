import BarraMenu from './BarraMenu';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function Contatos() {
    return (
        <div>
            <BarraMenu />

            <Container>
                <h4>Entre em contato pelo telefone: (31) 3333-3333 ou preencha o formulário abaixo.</h4>

                <Form>
                    <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" id="txtNome" placeholder="Digite seu nome" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control type="email" id="txtEmail" placeholder="name@example.com" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Mensagem</Form.Label>
                        <Form.Control type="textarea" id="txtMsg" rows={3} />
                    </Form.Group>

                    <br />

                    <Button onClick={enviarFormulario}>Enviar</Button>
                </Form>
            </Container>
        </div>
    );
}

function enviarFormulario() {
    var nome = document.getElementById("txtNome").value;
    var email = document.getElementById("txtEmail").value;
    var msg = document.getElementById("txtMsg").value;

    alert("Nome: " + nome +
        "\nEmail: " + email +
        "\nMensagem: " + msg);
}

export default Contatos;


