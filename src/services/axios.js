import axios from "axios"

const urlApi = "https://api.box3.work/api/Contato/6c39d089-d593-44b5-8b7b-acad269932a8"
async function getAllContatos() {
    await axios.get(urlApi)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log("Erro ao buscar contatos")
        });
}
async function getContatoById(id) {
    axios.get(urlApi + "/" + id)
    .then(response =>{
        return response.data
    })
    .catch(error => {
        console.log("Erro ao buscar contato por ID", error)
    })

}
async function postContato(contato){
    axios.post(urlApi, contato)
    .then(response =>{
        console.log("Cadastro realizado com sucesso")
    })
    .catch(error=>{
        console.log("Erro ao Cadastrar", error)
    })
}
async function putContatos(id){
    axios.put(urlApi+"/"+id)
    .then(response =>{
        console.log("Atualizado com sucesso")
    })
    .catch(error =>{
        console.log("Erro ao atualizar", error)
    })
}
async function deleteContato(id){
    axios.delete(urlApi+"/"+id)
    .then(response =>{
        console.log("Contato deletado com sucesso")
    })
    .catch(error =>{
        console.log("Erro ao deletar", error)
    })
}