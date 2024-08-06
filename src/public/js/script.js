/**
 * Assincronismo
 * @author Eduardo Carrilho
 */

// apoio ao entendimento da lógica
//console.log(urlAPI)
// uso de promise para recuperar os dados do WEB SERVICE (API)
function cep() {
    const inputcep = document.getElementById('inputCEP').value;
    const urlAPI = `https://viacep.com.br/ws/${inputcep}/json/`
    fetch(urlAPI)
    .then((response) => { // obeter os dados
        return response.json();
    })
    .then((dados) => { // manipular os dados obtidos
        document.getElementById('inputlogradouro').value =  dados.logradouro || '';
        document.getElementById('inputbairro').value = dados.bairro || '';
        document.getElementById('inputcidade').value = dados.localidade || '';
        frmFornecedor2.inputuf.value = `${dados.uf}`;
        
    })
    .catch((error) => {
        console.log(`Erro ao obter o endereço: ${error}`);
    })
}