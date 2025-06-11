function Cadastrar() {
  const camposObrigatorios = [
    "nomeIst", "tipoNec", "descricao", "cep", "cidade", "estado",
    "rua", "bairro", "numero", "email", "celular"
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

  if (!formularioValido) {
    alert("Por favor, preencha todos os campos marcados com * ");
    return;
  }

  alert("Formulário validado com sucesso!");
}
