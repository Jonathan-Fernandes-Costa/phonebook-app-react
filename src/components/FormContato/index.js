import axios from 'axios';
import React, { useEffect, useState } from 'react';

function FormContato(props) {

    const urlApi = "https://api.box3.work/api/Contato/6c39d089-d593-44b5-8b7b-acad269932a8"
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [ativo, setAtivo] = useState(false);
    const [data, setData] = useState('');
    useEffect(() => {
        if (props.modo === "put") {
            setNome(props.contato.nome);
            setEmail(props.contato.email);
            setTelefone(props.contato.telefone);
            setAtivo(props.contato.ativo);
            setData(props.contato.dataNascimento);
        }
    }, [props.modo, props.contato]);
    function BotaoConfirmar() {

        if (props.modo === "post") {
            handleCadastro()
        } else {
            handleAtualizar()
        }
        props.onSubmit();
    }
    const handleCadastro = (e) => {
        const novoCadastro = {
            nome: nome,
            email: email,
            telefone: telefone,
            ativo: ativo,
            dataNascimento: data,
        };
        axios.post(urlApi, novoCadastro)
            .then(response => {
                console.log('Cadastro realizado com sucesso:', response.data);
                setNome('');
                setEmail('');
                setTelefone('');
                setAtivo(true);
                setData('');
                props.update()
            })
            .catch(error => {
                console.error('Erro ao cadastrar:', error);
            });



        setNome('');
        setEmail('');
        setTelefone('');
        setAtivo(true);
        setData('');
    };

    const handleAtualizar = (e) => {

        const dadosAtualizados = {
            nome: nome,
            email: email,
            telefone: telefone,
            ativo: ativo,
            dataNascimento: data,
        };
        axios.put(`${urlApi}/${props.contato.id}`, dadosAtualizados)
            .then(response => {
                console.log('Cadastro atualizado com sucesso:', response.data);
                setNome('');
                setEmail('');
                setTelefone('');
                setAtivo(true);
                setData('');
                props.update()
            })
            .catch(error => {
                console.error('Erro ao atualizar cadastro:', error);
            });
    };

    return (
        <div>
            <fieldset className="mb-[15px] flex items-center gap-5">
                <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="name">
                    Nome:
                </label>
                <input
                    type="text"
                    value={props.id}
                    onChange={(e) => setNome(e.target.value)}
                    required
                    className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                    id="name"

                />

            </fieldset>

            <div>
                <fieldset className="mb-[15px] flex items-center gap-5">
                    <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="useremail">
                        Email:
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                        id="email"

                    />
                </fieldset>
                <fieldset className="mb-[15px] flex items-center gap-5">
                    <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="fone">
                        Telefone:
                    </label>
                    <input
                        required
                        type="fone"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                        id="username"
                    />
                </fieldset>
                <fieldset className="mb-[15px] flex items-center gap-5">
                    <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="username">
                        Ativo:
                    </label>
                    <input
                        checked={ativo} onChange={(e) => setAtivo(e.target.checked)}
                        type="checkbox"
                        className="h-[35px] w-full flex-1 items-start justify-start rounded-[4px] "
                        id="username"
                    />

                </fieldset>
                <fieldset className="mb-[15px] flex items-center gap-5">
                    <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="date3">
                        Data
                    </label>
                    <input
                        type="date"
                        onChange={(e) => setData(e.target.value)}
                        required
                        className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                        id="username"
                    />
                </fieldset>

            </div>

            <div className="mt-[25px] flex justify-end">
                <button onClick={BotaoConfirmar} className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                    Confirmar
                </button>
            </div>



        </div>
    )

}

export default FormContato
