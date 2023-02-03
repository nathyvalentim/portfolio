function enviarFormulario(){
	
	var nome = document.getElementById("inputNome").value;
	var celular = document.getElementById("inputCelular").value;
	var email = document.getElementById("inputEmail").value;
	
	if(nome.length == 0)
	{
		exibeMensagem("Nome");
		return;
	}	
		
	if(celular.length == 0)
	{
		exibeMensagem("Celular");
		return;
	}
	
	if(email.length == 0 || !email.includes("@"))
	{
		exibeMensagem("Email");
		return;
	}
	
	bootbox.alert("Cadastro enviado, você está concorrendo ao sorteio!");
}


function exibeMensagem(campo){
	 bootbox.alert("Preencha o campo " + campo);
}

function mascara(){
	var valor = document.getElementById( "inputCelular" ).value;
	document.getElementById( "inputCelular" ).value = executaMascara(valor);    
}

function executaMascara(v){
    v=v.replace(/\D/g,"");                  //Remove tudo o que não é dígito numérico
    v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses do DDD
    v=v.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen -
    return v;
}






