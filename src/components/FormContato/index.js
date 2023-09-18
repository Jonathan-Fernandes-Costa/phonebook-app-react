import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { postContato, putContatos } from '../../services/chamadasAPI';

function FormContato(props) {

    const urlApi = "https://api.box3.work/api/Contato/6c39d089-d593-44b5-8b7b-acad269932a8"
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [ativo, setAtivo] = useState(false);
    const [data, setData] = useState('');
    useEffect(() => {
        if (props.modo === "put") {
            const dataFormatada = props.contato.dataNascimento.substring(0, 10);
            setData(dataFormatada);
            setNome(props.contato.nome);
            setEmail(props.contato.email);
            setTelefone(props.contato.telefone);
            setAtivo(props.contato.ativo);
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
    const handleCadastro = async (e) => {
        const novoCadastro = {
            nome: nome,
            email: email,
            telefone: telefone,
            ativo: ativo,
            dataNascimento: data,
        };
        await postContato(novoCadastro);
        setNome('');
        setEmail('');
        setTelefone('');
        setAtivo(false);
        setData('');
        props.update()

    };

    const handleAtualizar = async (e) => {

        const dadosAtualizados = {
            nome: nome,
            email: email,
            telefone: telefone,
            ativo: ativo,
            dataNascimento: data,
        };
        await putContatos(props.contato.id, dadosAtualizados)
        setNome('');
        setEmail('');
        setTelefone('');
        setAtivo(false);
        setData('');
        props.update()
    };

    return (
        <div>
            <fieldset className="mb-[15px] flex items-center gap-5">
                <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="name">
                    Nome:
                </label>
                <input
                    type="text"
                    value={nome}
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
                    <InputMask
                        mask="(99) 99999-9999"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
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
                        value={data}
                        type="date"
                        onChange={(e) => setData(e.target.value)}
                        required
                        className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                        id="data"
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
