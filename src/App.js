import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const urlApi = "https://api.box3.work/api/Contato/6c39d089-d593-44b5-8b7b-acad269932a8"
    const [contacts, setContacts] = useState([{}]);
    const [showList, setShowList] = useState(false); // Estado para controlar a exibição da lista
    const [showAddForm, setShowAddForm] = useState(false); // Estado para controlar a exibição do formulário de adição
    const [showUpdateForm, setShowUpdateForm] = useState(false); // Estado para controlar a exibição do formulário de atualização
    const [showDeleteForm, setShowDeleteForm] = useState(false); // Estado para controlar a exibição do formulário de exclusão
    const [updateContactId, setUpdateContactId] = useState(''); // Estado para armazenar o ID do contato a ser atualizado
    const [deleteContactId, setDeleteContactId] = useState(''); // Estado para armazenar o ID do contato a ser excluído
    useEffect(() => {

        axios.get(urlApi)
            .then(response => {
                setContacts(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar contatos:', error);
            });
    }, []);
    const handleDelete = (id) => {
        // Faça uma solicitação DELETE para excluir o contato da API
        axios.delete(`${urlApi}/${id}`)
            .then(response => {
                console.log('Contato excluído com sucesso:', response.data);
                // Atualize a lista de contatos após a exclusão
                setContacts(contacts.filter(contact => contact.id !== id));
                setShowDeleteForm(false); // Ocultar o formulário de exclusão após a exclusão
            })
            .catch(error => {
                console.error('Erro ao excluir contato:', error);
            });
    };

        const handleToggleList = () => {
        setShowList(true);
        setShowAddForm(false);
        setShowUpdateForm(false);
        setShowDeleteForm(false);
        axios.get(urlApi)
            .then(response => {
                setContacts(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar contatos:', error);
            });
    };

        const handleToggleAddForm = () => {
        setShowList(false);
        setShowAddForm(true);
        setShowUpdateForm(false);
        setShowDeleteForm(false);
    };

        const handleToggleUpdateForm = () => {
        setShowList(false);
        setShowAddForm(false);
        setShowUpdateForm(true);
        setShowDeleteForm(false);
    };

        const handleToggleDeleteForm = () => {
        setShowList(false);
        setShowAddForm(false);
        setShowUpdateForm(false);
        setShowDeleteForm(true);
    };
    return (
        <div>
            <h2>Lista de Contatos Box³</h2>
            <button onClick={handleToggleList}>Listar Contatos</button>
            <button onClick={handleToggleAddForm}>Adicionar Contato</button>
            <button onClick={handleToggleUpdateForm}>Atualizar Contato</button>
            <button onClick={handleToggleDeleteForm}>Excluir Contato</button>

            {showList && (
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Ativo</th>
                            <th>dataNascimento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map(contact => (
                            <tr>
                                <th>{contact.id}</th>
                                <th>{contact.nome}</th>
                                <th>{contact.email}</th>
                                <th>{contact.telefone}</th>
                                <th>{contact.ativo ? "true" : "false"}</th>
                                <th>{contact.dataNascimento}</th>
                            </tr>
                        ))}
                    </tbody>
                </table>




            )}

            {showAddForm && (
                <div>
                    <h2>Adicionar Contato</h2>
                    <form>

                        <button>Adicionar</button>
                    </form>
                </div>
            )}

            {showUpdateForm && (
                <div>
                    <h2>Atualizar Contato</h2>
                    <form>

                        <input
                            type="text"
                            placeholder="ID do Contato a ser Atualizado"
                            value={updateContactId}
                            onChange={e => setUpdateContactId(e.target.value)}
                        />

                        <button>Atualizar</button>
                    </form>
                </div>
            )}

            {showDeleteForm && (
                <div>
                    <h2>Excluir Contato</h2>
                    <form>

                        <input
                            type="text"
                            placeholder="ID do Contato a ser Excluído"
                            value={deleteContactId}
                            onChange={e => setDeleteContactId(e.target.value)}
                        />
                        <button onClick={() => handleDelete(deleteContactId)}>Excluir</button>
                    </form>
                </div>
            )}
        </div>
    );
}





export default App;
