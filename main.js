'use strict';

let necessidades = [];//array 

function Cadastrar() {
  const camposObrigatorios = [
    "nomeIst", "tipoNec", "descricao", "cep", "cidade", "estado",
    "rua", "bairro", "numero", "email", "confirmaEmail", "celular"
  ];

  let formularioValido = true;

  //Campos preenchidos
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

  //Email
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

  //Celular
  const celular = document.getElementById("celular").value.trim().replace(/\D/g, "");
  const celularRegex = /^(\d{2})(9\d{8})$/;

  if (!celularRegex.test(celular)) {
    alert("Número de celular inválido");
    document.getElementById("celular").style.border = "2px solid red";
    formularioValido = false;
  } else {
    document.getElementById("celular").style.border = "1px solid #ccc";
  }

  if (!formularioValido) {
    alert("Por favor, preencha os campos com * (corretamente).");
    return;
  }

  // Se estiver válido
  const novaNecessidade = {
    nomeInstituicao: document.getElementById("nomeIst").value.trim(),
    tipoAjuda: document.querySelector("select").value,
    tipoNecessidade: document.getElementById("tipoNec").value.trim(),
    descricao: document.getElementById("descricao").value.trim(),
    cep: document.getElementById("cep").value.trim(),
    cidade: document.getElementById("cidade").value.trim(),
    estado: document.getElementById("estado").value.trim(),
    rua: document.getElementById("rua").value.trim(),
    bairro: document.getElementById("bairro").value.trim(),
    numero: document.getElementById("numero").value.trim(),
    email: document.getElementById("email").value.trim(),
    celular: document.getElementById("celular").value.trim()
  };

  necessidades.push(novaNecessidade);
  console.log("Necessidades cadastradas:", necessidades);
  alert("Cadastro concluído!");

  // Limpa os campos do formulário
  document.querySelector("form").reset();
}

//CEP
const eNumero = (numero) => /^[0-9]+$/.test(numero);
const cepValido = (cep) => cep.length == 8 && eNumero(cep);
const pesquisarCep = async () => {
  limparFormulario();
  const url = `https://viacep.com.br/ws/${cep.value}/json/`;
  if (cepValido(cep.value)) {
    const dados = await fetch(url);
    const endereco = await dados.json();
    if (endereco.hasOwnProperty('erro')) {
      alert('CEP não encontrado.');
    } else {
      preencherFormulario(endereco);
    }
  } else {
    alert("CEP incorreto, tente novamente!");
  }
};

const preencherFormulario = (endereco) => {
  document.getElementById('rua').value = endereco.logradouro;
  document.getElementById('bairro').value = endereco.bairro;
  document.getElementById('cidade').value = endereco.localidade;
  document.getElementById('estado').value = endereco.uf;
};

const limparFormulario = () => {
  document.getElementById('rua').value = '';
  document.getElementById('bairro').value = '';
  document.getElementById('cidade').value = '';
  document.getElementById('estado').value = '';
};

document.getElementById('cep').addEventListener('focusout', pesquisarCep);




