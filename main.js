function Cadastrar() {
  const camposObrigatorios = [
    "nomeIst", "tipoNec", "descricao", "cep", "cidade", "estado",
    "rua", "bairro", "numero", "email", "confirmaEmail", "celular"
  ];

  let formularioValido = true;

  camposObrigatorios.forEach(id => {
    const campo = document.getElementById(id);
    if (!campo || campo.value.trim() === "") {
      campo.style.border = "2px solid red";
      formularioValido = false;
    } else {
      campo.style.border = "1px solid #ccc";
    }
  });

  const selectAjuda = document.querySelector("select");
  if (!selectAjuda || selectAjuda.selectedIndex === 0) {
    selectAjuda.style.border = "2px solid red";
    formularioValido = false;
  } else {
    selectAjuda.style.border = "1px solid #ccc";
  }

  const email = document.getElementById("email").value.trim();
  const confirmaEmail = document.getElementById("confirmaEmail").value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    alert("E-mail inválido.");
    formularioValido = false;
  }

  if (email !== confirmaEmail) {
    alert("Os e-mails digitados não são iguais.");
    formularioValido = false;
  }

  if (!formularioValido) {
    alert("Por favor, preencha os campos com *.");
    return;
  }

  alert("Formulário validado com sucesso!");
}


'use strict'; 
const eNumero = (numero) => /^[0-9]+$/.test(numero);
const cepValido = (cep) => cep.length == 8 && eNumero(cep);
const pesquisarCep = async() =>{
    limparFormulario();
    const url = ` https://viacep.com.br/ws/${cep.value}/json/`; 
    if(cepValido(cep.value)){
           const dados = await fetch(url);
           const addres = await dados.json();
           if(addres.hasOwnProperty('erro')){
              alert('CEP não encontrado');
           }
           else{
            preencherFormulario(addres);
           }
    } else {
        alert("CEP incorreto, tente novamente!");
    }
}
const preencherFormulario = (endereco)  => {
    document.getElementById('rua').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.estado;

}
const limparFormulario = () =>{
    document.getElementById('rua').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}
document.getElementById('cep').addEventListener('focusout',pesquisarCep);
