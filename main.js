'use strict';

let necessidades = JSON.parse(localStorage.getItem("necessidades")) || [];

//Cadastro
function Cadastrar() {
  const camposObrigatorios = [
    "nomeIst", "tipoNec", "descricao", "cep", "cidade", "estado",
    "rua", "bairro", "numero", "email", "confirmaEmail", "celular"
  ];

  let formularioValido = true;

  //Campos Preenchidos
  camposObrigatorios.forEach(id => {
    const campo = document.getElementById(id);
    if (!campo || campo.value.trim() === "") {
      campo.style.border = "2px solid red";
      formularioValido = false;
    } else {
      campo.style.border = "1px solid #ccc";
    }
  });

  const selectAjuda = document.getElementById("tipoAj");
    if (!selectAjuda || selectAjuda.value === "") {
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

  const novaNecessidade = {
    nome: document.getElementById("nomeIst").value.trim(),
    tipoAjuda: selectAjuda.value.trim(),
    tipoNecessidade: document.getElementById("tipoNec").value.trim(),
    descricao: document.getElementById("descricao").value.trim(),
    cep: document.getElementById("cep").value.trim(),
    cidade: document.getElementById("cidade").value.trim(),
    estado: document.getElementById("estado").value.trim(),
    rua: document.getElementById("rua").value.trim(),
    bairro: document.getElementById("bairro").value.trim(),
    numero: document.getElementById("numero").value.trim(),
    email: email,
    celular: document.getElementById("celular").value.trim()
  };

  necessidades.push(novaNecessidade);
  localStorage.setItem("necessidades", JSON.stringify(necessidades));

  alert("Cadastro concluído!");
  document.querySelector("form").reset();

  atualizarLista(); // Atualiza a lista após novo cadastro
}

//CEP
const eNumero = numero => /^[0-9]+$/.test(numero);
const cepValido = cep => cep.length === 8 && eNumero(cep);

const pesquisarCep = async () => {
  const campoCep = document.getElementById("cep");
  if (!campoCep) return;

  limparFormulario();
  const url = `https://viacep.com.br/ws/${campoCep.value}/json/`;

  if (cepValido(campoCep.value)) {
    const dados = await fetch(url);
    const endereco = await dados.json();
    if (endereco.hasOwnProperty("erro")) {
      alert("CEP não encontrado.");
    } else {
      preencherFormulario(endereco);
    }
  } else {
    alert("CEP incorreto, tente novamente!");
  }
};

const preencherFormulario = endereco => {
  document.getElementById("rua").value = endereco.logradouro;
  document.getElementById("bairro").value = endereco.bairro;
  document.getElementById("cidade").value = endereco.localidade;
  document.getElementById("estado").value = endereco.uf;
};

const limparFormulario = () => {
  ["rua", "bairro", "cidade", "estado"].forEach(id => {
    const campo = document.getElementById(id);
    if (campo) campo.value = '';
  });
};

const campoCep = document.getElementById("cep");
if (campoCep) {
  campoCep.addEventListener("focusout", pesquisarCep);
}

//Excluir necessidade
function excluirNecessidade(index) {
  necessidades.splice(index, 1);
  localStorage.setItem("necessidades", JSON.stringify(necessidades));
  atualizarLista();
}

//atualiza lista de necessidades/cria cards/botão excluir
function atualizarLista() {
  const container = document.getElementById("listaNecessidades");
  if (!container) return;

  if (necessidades.length === 0) {
    container.innerHTML = "<p>Nenhuma necessidade cadastrada.</p>";
  } else {
    container.innerHTML = "";
    necessidades.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <b>Tipo de ajuda:</b>
        ${item.tipoAjuda}<br>
        <b>Nome:</b> ${item.nome}<br>
        <b>Tipo de necessidade:</b>
        ${item.tipoNecessidade}<br>
        <button class="btnSaibaMais" data-index="${index}">Saiba mais</button>
        <div class="detalhes" id="detalhes-${index}" style="display: none; margin-top: 10px;">
          <b>Descrição:</b> ${item.descricao}<br>
          <b>Endereço:</b> ${item.rua}, ${item.numero}, ${item.bairro}, ${item.cidade} - ${item.estado}<br>
          <b>CEP:</b> ${item.cep}<br>
          <b>E-mail:</b> ${item.email}<br>
          <b>Celular:</b> ${item.celular}<br>
          <button class="btnExcluir" data-index="${index}">Excluir</button>
        </div>
      `;      container.appendChild(div);
    });

    
    // Botões de "Saiba mais"
    const botoesSaibaMais = container.querySelectorAll(".btnSaibaMais");
    botoesSaibaMais.forEach(botao => {
      botao.addEventListener("click", (event) => {
        const idx = event.target.getAttribute("data-index");
        const detalhesDiv = document.getElementById(`detalhes-${idx}`);
        if (detalhesDiv.style.display === "none") {
          detalhesDiv.style.display = "block";
          botao.textContent = "Mostrar menos";
        } else {
          detalhesDiv.style.display = "none";
          botao.textContent = "Saiba mais";
        }
      });
    });

    // Botão excluir
    const botoesExcluir = container.querySelectorAll(".btnExcluir");
    botoesExcluir.forEach(botao => {
      botao.addEventListener("click", (event) => {
        const idx = event.target.getAttribute("data-index");
        excluirNecessidade(idx);
      });
    });
  }
}

if (document.getElementById("listaNecessidades")) {
  atualizarLista();
}

const searchInput = document.getElementById("searchInput");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const termo = searchInput.value.toLowerCase();

    const container = document.getElementById("listaNecessidades");
    container.innerHTML = "";

    const filtrados = necessidades.filter(n =>
      n.nome.toLowerCase().includes(termo) ||
      n.tipoNecessidade.toLowerCase().includes(termo) ||
      n.descricao.toLowerCase().includes(termo)
    );

    if (filtrados.length === 0) {
      container.innerHTML = "<p>Nenhuma necessidade encontrada.</p>";
    } else {
      filtrados.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `<b>Tipo de ajuda:</b> ${item.tipoAjuda}<br>
          <b>Nome:</b> ${item.nome}<br>
          <b>Tipo de necessidade:</b> ${item.tipoNecessidade}<br>
          <button class="btnSaibaMais" data-index="${index}">Saiba mais</button>
          <div class="detalhes" id="detalhes-${index}" style="display: none; margin-top: 10px;">
            <b>Descrição:</b> ${item.descricao}<br>
            <b>Endereço:</b> ${item.rua}, ${item.numero}, ${item.bairro}, ${item.cidade} - ${item.estado}<br>
            <b>CEP:</b> ${item.cep}<br>
            <b>E-mail:</b> ${item.email}<br>
            <b>Celular:</b> ${item.celular}<br>
            <button class="btnExcluir" data-index="${index}">Excluir</button>
          </div>
        `;        container.appendChild(div);
      });

      // Reaplicar os eventos nos botões filtrados
      const botoesSaibaMais = container.querySelectorAll(".btnSaibaMais");
      botoesSaibaMais.forEach(botao => {
        botao.addEventListener("click", (event) => {
          const idx = event.target.getAttribute("data-index");
          const detalhesDiv = document.getElementById(`detalhes-${idx}`);
          if (detalhesDiv.style.display === "none") {
            detalhesDiv.style.display = "block";
            botao.textContent = "Mostrar menos";
          } else {
            detalhesDiv.style.display = "none";
            botao.textContent = "Saiba mais";
          }
        });
      });

      const botoesExcluir = container.querySelectorAll(".btnExcluir");
      botoesExcluir.forEach(botao => {
        botao.addEventListener("click", (event) => {
          const idx = event.target.getAttribute("data-index");
          excluirNecessidade(idx);
        });
      });
    }
  });
}

const filtroAjuda = document.getElementById("filtroAjuda");

if (filtroAjuda) {
  filtroAjuda.addEventListener("change", aplicarFiltros);
}

if (searchInput) {
  searchInput.addEventListener("input", aplicarFiltros);
}

function aplicarFiltros() {
  const termo = searchInput.value.toLowerCase();
  const tipoAjudaSelecionado = filtroAjuda.value;

  const container = document.getElementById("listaNecessidades");
  container.innerHTML = "";

  const filtrados = necessidades.filter(n =>
    (n.nome.toLowerCase().includes(termo) ||
     n.tipoNecessidade.toLowerCase().includes(termo) ||
     n.descricao.toLowerCase().includes(termo)) &&
    (tipoAjudaSelecionado === "" || n.tipoAjuda === tipoAjudaSelecionado)
  );

  if (filtrados.length === 0) {
    container.innerHTML = "<p>Nenhuma necessidade encontrada.</p>";
  } else {
    filtrados.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <b>Tipo de ajuda:</b> ${item.tipoAjuda}<br>
        <b>Nome:</b> ${item.nome}<br>
        <b>Tipo de necessidade:</b> ${item.tipoNecessidade}<br>
        <button class="btnSaibaMais" data-index="${index}">Saiba mais</button>
        <div class="detalhes" id="detalhes-${index}" style="display: none; margin-top: 10px;">
          <b>Descrição:</b> ${item.descricao}<br>
          <b>Endereço:</b> ${item.rua}, ${item.numero}, ${item.bairro}, ${item.cidade} - ${item.estado}<br>
          <b>CEP:</b> ${item.cep}<br>
          <b>E-mail:</b> ${item.email}<br>
          <b>Celular:</b> ${item.celular}<br>
          <button class="btnExcluir" data-index="${index}">Excluir</button>
        </div>
      `;
      container.appendChild(div);
    });

    // Reaplica os eventos
    const botoesSaibaMais = container.querySelectorAll(".btnSaibaMais");
    botoesSaibaMais.forEach(botao => {
      botao.addEventListener("click", (event) => {
        const idx = event.target.getAttribute("data-index");
        const detalhesDiv = document.getElementById(`detalhes-${idx}`);
        if (detalhesDiv.style.display === "none") {
          detalhesDiv.style.display = "block";
          botao.textContent = "Mostrar menos";
        } else {
          detalhesDiv.style.display = "none";
          botao.textContent = "Saiba mais";
        }
      });
    });

    const botoesExcluir = container.querySelectorAll(".btnExcluir");
    botoesExcluir.forEach(botao => {
      botao.addEventListener("click", (event) => {
        const idx = event.target.getAttribute("data-index");
        excluirNecessidade(idx);
      });
    });
  }
}
