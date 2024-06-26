/**
 * Assincronismo
 * Fetch (Promise simplificada)
 * @author Eduardo Carrilho
 */

const read = require ('readline-sync')
let cep = document.getElementById('inputCEP').value;
let logradouro2 = document.getElementById('inputlogradouro').value;
let bairro2 = document.getElementById('inputbairro').value;
let cidade2 = document.getElementById('inputcidade').value;
let uf2 = document.getElementById('uf').value;
let urlAPI = `https://viacep.com.br/ws/${cep}/json/`
// apoio ao entendimento da lógica
//console.log(urlAPI)
// uso de promise para recuperar os dados do WEB SERVICE (API)
function cep() {
    fetch(urlAPI)
    .then((response) => { // obeter os dados
        return response.json()
    })
    .then((dados) => { // manipular os dados obtidos
        document.getElementById(logradouro2).innerText = `${dados.lograodouro}`;
        document.getElementById(bairro2).innerText = `${dados.bairro}`;
        document.getElementById(cidade2).innerText = `${dados.localidade}`;
        document.getElementById(uf2).innerText = `${dados.uf}`;
        console.log(dados.logradouro);
        console.log(dados.bairro);
        console.log(dados.localidade);
        console.log(dados.uf);
    })
    .catch((error) => {
        console.log(`Erro ao obter o endereço: ${error}`);
    })
}