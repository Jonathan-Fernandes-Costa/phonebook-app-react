import axios from "axios"
const urlApi = "https://api.box3.work/api/Contato/6c39d089-d593-44b5-8b7b-acad269932a8"
async function getAllContatos() {
    try {
        const response = await axios.get(urlApi);
        return response.data;
    } catch (error) {
        console.log("Erro ao buscar contatos", error)
    }
}
async function getContatoById(id) {
    try {
        const response = await axios.get(urlApi + "/" + id);
        return response.data;

    } catch (error) {
        console.log("Erro ao buscar contato por ID", error)
    }

}
async function postContato(contato) {
    try{
        const response = await axios.post(urlApi, contato)
        console.log("Cadastro realizado com sucesso")
        return response.data
    }catch(error){
        console.log("Erro ao cadastrar contato", error)
    }
}
async function putContatos(id) {
    try{
        const response = await axios.put(urlApi+"/"+id)
        console.log("Contato atualizado com sucesso")
        return response.data
    }catch(error){
        console.log("Erro ao atualizar contato", error)
    }

}
async function deleteContato(id) {
    try{
        await axios.delete(urlApi+"/"+id)
        console.log("Contato deletado com sucesso")
    }catch(error){
        console.log("Erro ao Deletar contato", error)
    }
}

export { deleteContato, putContatos, getAllContatos, getContatoById, postContato }