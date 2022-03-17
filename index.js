let pessoas = [];
//let conta = Number(prompt("coloque o valor da conta a pagar ?"));
//let nota = Number(prompt("coloque o valor da nota recebido pelo cliente  ?"));*$(window).on("load", () => {
$("html").on("change", "#inputConta", (e) => {});

$("html").on("keypress", (e) => {
  if (e.key == "Enter") {
    let conta = Number($("#inputConta").val());
    let nota = Number($("#inputNota").val());
    if (validacaoFormulario(conta, nota)) {
      trocoNotas(conta, nota);
      var target_offset = $("#moedas").offset().top;
      $("html, body").animate({ scrollTop: target_offset }, 50);
      console.log("key " + e.key);
    }
  }
});
function enviarDados() {
  let conta = Number($("#inputConta").val());
  let nota = Number($("#inputNota").val());

  let verificacao;

  verificacao = validacaoFormulario(conta, nota);

  setTimeout(() => {
    if (verificacao) {
      trocoNotas(conta, nota);

      var target_offset = $("#moedas").offset().top;
      $("html, body").animate({ scrollTop: target_offset }, 50);
    }
  }, 500);
}
function validacaoFormulario(conta, nota) {
  if (conta != 0 && nota != 0) {
    if (
      $("#inputConta").val().substring(2, 3).includes(".") &&
      !isNaN($("#inputConta").val()) &&
      $("#inputConta").val().length == 5 &&
      $("#inputNota").val().substring(2, 3).includes(".") &&
      !isNaN($("#inputNota").val()) &&
      $("#inputNota").val().length == 5
    ) {
      if (
        $("#inputConta").val().substring(4, 5) >= 0 &&
        $("#inputConta").val().substring(4, 5) < 5
      ) {
        console.log("1º if");
        $("#inputConta").val($("#inputConta").val().substring(0, 4) + "0");
      } else {
        console.log("1º else");
        $("#inputConta").val($("#inputConta").val().substring(0, 4) + "5");
      }
      if (
        $("#inputNota").val().substring(4, 5) >= 0 &&
        $("#inputNota").val().substring(4, 5) < 5
      ) {
        console.log("2º if");
        $("#inputNota").val($("#inputNota").val().substring(0, 4) + "0");
      } else {
        console.log("2º else");
        $("#inputNota").val($("#inputNota").val().substring(0, 4) + "5");
      }
    } else {
      console.log("hjj");

      if (
        !isNaN($("#inputConta").val()) &&
        $("#inputConta").val().length == 3 &&
        $("#inputConta").val().substring(2, 3).includes(".")
      ) {
        $("#inputConta").val($("#inputConta").val() + "00");
      } else {
        if ($("#inputConta").val().length == 2) {
          $("#inputConta").val($("#inputConta").val() + ".00");
        }
      }
      if (
        !isNaN($("#inputNota").val()) &&
        $("#inputNota").val().length == 3 &&
        $("#inputNota").val().substring(2, 3).includes(".")
      ) {
        $("#inputNota").val($("#inputNota").val() + "00");
      } else {
        if ($("#inputNota").val().length == 2) {
          $("#inputNota").val($("#inputNota").val() + ".00");
        }
      }
    }
    return true;
  } else {
    alert(
      `campo ${
        conta == 0 && nota == 0 ? "conta e nota" : conta == 0 ? "conta" : "nota"
      } vazio`
    );
    return false;
  }
}

function desaparecer() {
  $("#titulo").text("2 notas de ");
  // $("#nota-10-reais").toggle("slow");
  //$("#nota-10-reais").css("background-color", "red");
  //img-cedulas/cedula-10-reais.jpg
}

function trocoNotas(conta, nota) {
  let cedulasImg = [
    "cedula-200-reais.jpg",
    "cedula-100-reais.jpg",
    "cedula-50-reais.jpg",
    "cedula-20-reais.jpg",
    "cedula-10-reais.jpg",
    "cedula-5-reais.jpg",
    "cedula-2-reais.jpg",
  ];
  let notas = [200, 100, 50, 20, 10, 5, 2];
  let troco = nota - conta;
  $("#troco").text("Troco " + "R$ " + troco);
  console.log("troco que tenho que dar", troco.toFixed(2));
  let i = 0;
  let result = "";

  while (troco != 0) {
    let qtdeNotas = parseInt(troco / notas[i]);
    if (qtdeNotas != 0) {
      for (let repetirNota = 0; repetirNota < qtdeNotas; repetirNota++) {
        result += `
<div id="nota${notas[i]}"  class ="col-sm-4 col-lg-2"   >
  <p id="titulo${i}" class="text-white" style=" font-size: large">${qtdeNotas}  notas de ${notas[i]}</p>
  <img
    class="card-img-top w-100"
    src="img-cedulas/${cedulasImg[i]}"
    alt="Imagem de capa do card"
    id="notas${i}"
  
  />
</div>
`;
      }

      console.log("passou por aqui", i);
      $("#notas")[0].innerHTML = result;

      console.log(qtdeNotas + " nota de " + " R$ " + notas[i]);
      troco = (troco - qtdeNotas * notas[i]).toFixed(2);
      //console.log("possivel erro de logica", troco.toString().split(".")[0]);
      if (troco.toString().split(".")[0] <= 1) {
        console.log("contando moedas");
        trocoMoedas(troco);
        break;
      }
    } else {
      if (i == notas.length - 1) {
        trocoMoedas(troco);
        $("#notas")[0].innerHTML = result;
        break;
      }
    }
    i++;
  }
}

function trocoMoedas(troco) {
  let moedas = [1, 0.5, 0.25, 0.1, 0.05];
  let moedasImg = [
    "moeda-1-real.png",
    "moeda-50-centavos.png",
    "moeda-25-centavos.jpg",
    "moeda-10-centavos.png",
    "moeda-5-centavos.png",
  ];
  let i = 0;
  let result = "";
  if (troco == 0) {
    $("#moedas")[0].innerHTML = result;
  }

  while (troco != 0) {
    let qtdeMoedas = parseInt(troco / moedas[i]);
    if (qtdeMoedas != 0) {
      for (let repetirMoeda = 0; repetirMoeda < qtdeMoedas; repetirMoeda++) {
        result += `
<div id="moeda${moedas[i]}"  class ="col-2 "  style="width:180px" >
  <p id="titulo${i}" class="text-white" style=" font-size: large">${qtdeMoedas} moedas de ${moedas[i]}</p>
  <img
    class="card-img-top w-75"
    src="img-moedas/${moedasImg[i]}"
    alt="Imagem de capa do card"
    id="notas${i}"
  
  />
</div>
`;
      }
      $("#moedas")[0].innerHTML = result;
      console.log(qtdeMoedas + " moedas de " + " R$ " + moedas[i]);
      console.log(moedas[i]);
      troco = (troco - qtdeMoedas * moedas[i]).toFixed(2);
    }
    i++;
  }
  return;
}

/*
codigo validacao universal
   $("#inputConta")
      .val()
      .substring(
        $("#inputConta").val().length - 1,
        $("#inputConta").val().length
      ) >= 0 &&
      $("#inputConta")
        .val()
        .substring(
          $("#inputConta").val().length - 1,
          $("#inputConta").val().length
        ) < 5 &&
      $("#inputConta").val().includes(".")



*/

/*

(function iniciarObjeto() {
  for (let i = 0; i < 10; i++) {
    let pessoa = { id: i, nome: "joao", sobrenome: "carlao" };
    // document.getElementById("conteudo").innerHTML += `${pessoa.id} <br/>`;
    $(window).on("load", function () {
      $("#conteudo")[0].innerHTML += `${pessoas[i].id} <br/>`;
    });
    pessoas.push(pessoa);
  }
})();
function ver() {
  $("#conteudo")[0].innerHTML = "";
  for (let i = 0; i < pessoas.length; i++) {
    $("#conteudo")[0].innerHTML += `${pessoas[i].id} <br/>`;
  }
  console.log(pessoas);
}
function apagar() {
  let idUsr = Number(prompt("coloque o id para apagar"));
  for (let i = 0; i < pessoas.length; i++) {
    if (pessoas[i].id == idUsr) {
      pessoas.splice(i, 1);
      ver();
    }
  }
}
*/
