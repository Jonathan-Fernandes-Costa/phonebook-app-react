import axios from "axios"
const urlApiContato = "https://api.box3.work/api/Contato/6c39d089-d593-44b5-8b7b-acad269932a8"
const urlApiTelefone = "https://api.box3.work/api/Telefone/6c39d089-d593-44b5-8b7b-acad269932a8"
async function getAllContatos() {
    try {
        const response = await axios.get(urlApiContato);
        return response.data;
    } catch (error) {
        console.log("Erro ao buscar contatos", error)
    }
}
async function getContatoById(id) {
    try {
        const response = await axios.get(urlApiContato + "/" + id);
        return response.data;

    } catch (error) {
        console.log("Erro ao buscar contato por ID", error)
    }

}
async function postContato(contato) {
    try{
        const response = await axios.post(urlApiContato, contato)
        console.log("Cadastro realizado com sucesso")
        return response.data
    }catch(error){
        console.log("Erro ao cadastrar contato", error)
    }
}
async function putContatos(id) {
    try{
        const response = await axios.put(urlApiContato+"/"+id)
        console.log("Contato atualizado com sucesso")
        return response.data
    }catch(error){
        console.log("Erro ao atualizar contato", error)
    }

}
async function deleteContato(id) {
    try{
        await axios.delete(urlApiContato+"/"+id)
        console.log("Contato deletado com sucesso")
    }catch(error){
        console.log("Erro ao Deletar contato", error)
    }
}

//Funções Referentes ao Telefone

async function iniciarChamada(idContato){
    const chamada = {
        idContato: idContato,
    }
    try{
        await axios.post(urlApiTelefone, chamada)
        console.log("Chamada iniciada cocm sucesso")
    }catch(error){
        console.log("Erro ao iniciar chamada ", error)
    }
}
async function encerrarChamada(id, assunto){
    try {
        await axios.put(`${urlApiTelefone}/${id}`, assunto)
        console.log("Chamda encerrada com sucesso")
    } catch (error) {
        console.log("Erro ao finalizar chamada: ", error)
    }
}
async function getChamadasContato(idContato){
    try {
        const response = await axios.get(`${urlApiTelefone}/contato/${idContato}`)
        console.log("Lista retornada com sucesso!")
        return response.data
    } catch (error) {
        console.log("Erro ao listas chamadas do contato informado: ", error)
    }
}
async function getDadosChamada(id){
    try {
        const response = await axios.get(`${urlApiTelefone}/${id}`)
        console.log("Dados da chamada retornado com sucesso!")
        return response.data
    } catch (error) {
        console.log("Erro ao listar dados da chamada: ", error)
    }
}
async function getChamadaemAndamento(){
    try {
        const response = await axios.get(`${urlApiTelefone}/chamada-em-andamento`)
        console.log("Dados retornados com sucesso!")
        return response
    } catch (error) {
        if(error.response.status === 404){
            console.log("Sem chamada")
        }else{
            console.log("Erro ao pegar dados da chamada: ", error)
        }
        
    }
}

export { deleteContato, putContatos, getAllContatos, getContatoById, postContato, iniciarChamada, encerrarChamada, getChamadaemAndamento, getDadosChamada, getChamadasContato }