

function sendData()
{	
	var data = {};
    data["nome"] = document.getElementById("inputNome").value
	data["dataNascimento"] = document.getElementById("inputNascimento").value;
	data["celular"] = document.getElementById("inputCelular").value;
	data["email"] = document.getElementById("inputEmail").value;
	data["sexo"] = document.getElementById("inputSexo").value;
	data["cursoInteresse"] = document.getElementById("inputCurso").value;
	data["mensagem"] = document.getElementById("inputMensagem").value;
	
	$.ajax({
     url : "http://localhost:8080/cadastros",
     type : 'post',
     data : data,
	 success: function (result) {
             bootbox.alert("Mensagem enviada com sucesso.");
           },
     error: function(result) {
             bootbox.alert("Ocorreu um erro ao carregar os dados.");
           }
        });  
}


