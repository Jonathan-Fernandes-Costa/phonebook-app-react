import React, { useState } from 'react';
import axios from 'axios';

function FormAtualizar(props) {
    const urlApi = "https://api.box3.work/api/Contato/6c39d089-d593-44b5-8b7b-acad269932a8"
    const [id, setId] = useState(''); 
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [ativo, setAtivo] = useState(true);
    const [data, setData] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const dadosAtualizados = {
            nome: nome,
            email: email,
            telefone: telefone,
            ativo: ativo,
            data: data,
        };

        axios.put(`${urlApi}/${id}`, dadosAtualizados)
            .then(response => {
                console.log('Cadastro atualizado com sucesso:', response.data);
                setId(''); 
                setNome('');
                setEmail('');
                setTelefone('');
                setAtivo(true);
                setData('');
            })
            .catch(error => {
                console.error('Erro ao atualizar cadastro:', error);
            });
    };

    return (
        <div>
            <h2>Formulário de Atualização de Contato</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID:</label>
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Telefone:</label>
                    <input
                        type="tel"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                    />
                </div>
                <div>
                    <label>Ativo:</label>
                    <select value={ativo} onChange={(e) => setAtivo(e.target.value)}>
                        <option value={true}>Sim</option>
                        <option value={false}>Não</option>
                    </select>
                </div>
                <div>
                    <label>Data:</label>
                    <input
                        type="date"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Atualizar</button>
            </form>
        </div>
    );
}

export default FormAtualizar;