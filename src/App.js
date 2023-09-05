import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormCadastro from './components/FormCadastro';
import FormAtualizar from './components/FormAtualizar';

function App() {
    const urlApi = "https://api.box3.work/api/Contato/6c39d089-d593-44b5-8b7b-acad269932a8"
    const [contacts, setContacts] = useState([{}]);
    const[searchContact, setSearchContact] = useState({});
    const[showSearchContact, setShowSearchContact] = useState(false);
    const [showList, setShowList] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [showSearchForm, setShowSearchForm] = useState(false);
    const [deleteContactId, setDeleteContactId] = useState('');
    const [searchContactId, setSearchContactId] = useState('');
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
        axios.delete(`${urlApi}/${id}`)
            .then(response => {
                console.log('Contato excluído com sucesso:', response.data);
                setContacts(contacts.filter(contact => contact.id !== id));
                setShowDeleteForm(false);
            })
            .catch(error => {
                console.error('Erro ao excluir contato:', error);
            });
    };


     const handleSearch = (id) => {
         axios.get(urlApi + "/" + id)
            .then(response => {
                console.log('Contato encontrado com sucesso:', response.data);
                setSearchContact(response.data)
                setShowSearchForm(false)
                setShowSearchContact(true)
            })
            .catch(error => {
                console.error('Erro ao buscar contato:', error);
            });
    };



    const handleToggleList = () => {
        setShowList(true);
        setShowAddForm(false);
        setShowUpdateForm(false);
        setShowDeleteForm(false);
        setShowSearchForm(false);
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
        setShowSearchForm(false);
    };

    const handleToggleUpdateForm = () => {
        setShowList(false);
        setShowAddForm(false);
        setShowUpdateForm(true);
        setShowDeleteForm(false);
        setShowSearchForm(false);
    };

    const handleToggleDeleteForm = () => {
        setShowList(false);
        setShowAddForm(false);
        setShowUpdateForm(false);
        setShowSearchForm(false);
        setShowDeleteForm(true);
    };
    const handleToggleSearchForm = () => {
        setShowList(false);
        setShowAddForm(false);
        setShowUpdateForm(false);
        setShowDeleteForm(false);
        setShowSearchForm(true);
    };
    return (
        <div>
            <h2>Lista de Contatos Box³</h2>
            <button onClick={handleToggleList}>Listar Contatos</button>
            <button onClick={handleToggleSearchForm}>Buscar Contato</button>
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
            {showSearchContact && (
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
                        {
                            <tr>
                                <th>{searchContact.id}</th>
                                <th>{searchContact.nome}</th>
                                <th>{searchContact.email}</th>
                                <th>{searchContact.telefone}</th>
                                <th>{searchContact.ativo ? "true" : "false"}</th>
                                <th>{searchContact.dataNascimento}</th>
                            </tr>
                        }
                    </tbody>
                </table>
                
                
            )}
            {showAddForm && (
                <FormCadastro></FormCadastro>
            )}

            {showUpdateForm && (
                <FormAtualizar></FormAtualizar>
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
            {showSearchForm && (
                <div>
                    <h2>Pesquisar Contato</h2>
                    
                        <input
                            type="text"
                            placeholder="Digite o ID do Contato"
                            value={searchContactId}
                            onChange={e => setSearchContactId(e.target.value)}
                        />
                        <button onClick={() => handleSearch(searchContactId)}>Buscar</button>
                        
                    
                </div>
            )}
        </div>
    );
}





export default App;
