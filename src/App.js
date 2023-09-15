import React, { useState, useEffect } from 'react';
import { deleteContato, getAllContatos, getChamadaemAndamento } from './services/axios'
import BotaoOption from './components/BotaoOption';
import BotaoPesquisa from './components/BotaoPesquisa';
import Header from './components/Header';
import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import BotaoDeletar from './components/BotaoDeletar';
import NotificacaoChamada from './components/NotificaChamada';
import BotaoChamar from './components/BotaoChamar';

//Ativo: icon X
//Data: brasileira X
//Mascara no telefone X
//Carregou a pagina chama a lista X

//Criar um formulário Generico de cadastro/atualizar atraves de props(X)
//Separar a pagina na pasta "pages"(X)
//Criar a pagina de serviços e consumir a api com axios nela (X)
//TRYcATCH apennas nos codigos do axios(X)
//Radix UI e tailwindcss(X)
//Usar o Radix para criar os modal(X)

function App() {
    const [contacts, setContacts] = useState([{}]);
    const [searchContact, setSearchContact] = useState();
    const [showSearchContact, setShowSearchContact] = useState(false);
    const [showList, setShowList] = useState(true);
    const [chamadaEmAndamento, setChamadaEmAndamento] = useState(false);
    const [chamada, setChamada] = useState({});
    const [segundos, setSegundos] = useState(0);
    async function FetchContatos() {
        const response = await getAllContatos();
        setContacts(response)
    }

    async function FetchChamada() {
        try {
            const response = await getChamadaemAndamento();
            
            if (response.status === 200) {
                setChamada(response)
                setChamadaEmAndamento(true)
                const dataInicio = new Date(chamada.data.inicioAtendimento);
                const agora = new Date();
                const diferencaEmSegundos = (agora - dataInicio) / 1000;
                setSegundos(diferencaEmSegundos);
            } else {
                setChamadaEmAndamento(false)
            }
        } catch (error) {
            console.log("Sem chamada em andamento")
        }

    }

    function verificaContatoEmLigação(idcontato){
        if(chamada.data !== undefined){
            if(chamadaEmAndamento && chamada.data.contatoId === idcontato){
                return true
            }else{
                return false
            }

        }
    }
    useEffect(() => {

        FetchContatos();
        FetchChamada();
        let timer;
        if (chamadaEmAndamento) {
            timer = setInterval(() => {
                setSegundos((segundosAnteriores) => segundosAnteriores + 1);
            }, 1000);
        }

        return () => {
            clearInterval(timer);
        }
    }, [chamadaEmAndamento]);

    const handleDelete = async (id) => {
        await deleteContato(id);
        FetchContatos()
    };
    const handleEncerrarLigação = () => {
        setChamadaEmAndamento(false)
        setSegundos(0)
        setChamada({})
    }
    const handleIniciarLigação = () => {
        FetchChamada()
        FetchContatos()
        console.log("Teste")
        setChamadaEmAndamento(true)

        ///Colocar tudo aqui, colocar para quando iniciar a ligação ele dar um fetchem
    }

    const handleSearch = (nome) => {
        const contatosFiltrados = contacts.filter(contato =>
            contato.nome.includes(nome)
        );
        setSearchContact(contatosFiltrados)
        setShowList(false);
        setShowSearchContact(true)
    };

    const handleToggleList = () => {
        FetchContatos()
        setShowList(true);
        setShowSearchContact(false)


    };

    const formatarDataBrasileira = (data) => {
        const dataObj = new Date(data);
        return dataObj.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).slice(0, -10);
    };

    return (

        <div>

            <Header></Header>

            <button onClick={handleToggleList} className="text-violet11 shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
                Listar Contatos
            </button>
            <BotaoOption update={FetchContatos} modo="post" name="Adicionar Contato" text="Preencha os dados do novo contato"></BotaoOption>
            <BotaoPesquisa handle={handleSearch}></BotaoPesquisa>

            {showList && (
                <div>
                    <div className="flex flex-col">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-left text-sm font-light">
                                        <thead
                                            className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                                            <tr>
                                                <th scope="col" className="px-6 py-4">ID</th>
                                                <th scope="col" className="px-6 py-4">Nome</th>
                                                <th scope="col" className="px-6 py-4">Email</th>
                                                <th scope="col" className="px-6 py-4">Telefone</th>
                                                <th scope="col" className="px-6 py-4">Ativo</th>
                                                <th scope="col" className="px-6 py-4">dataNascimento</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {contacts.map(contact => (

                                                <tr key={contact.id} className="border-b bg-white-100 hover:bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                                    <td className="whitespace-nowrap px-6 py-4">{contact.id}</td>
                                                    <td className="whitespace-nowrap px-6 py-4">{contact.nome}</td>
                                                    <td className="whitespace-nowrap px-6 py-4">{contact.email}</td>
                                                    <td className="whitespace-nowrap px-6 py-4">{contact.telefone}</td>
                                                    <td className="whitespace-nowrap px-6 py-4">{contact.ativo ? <CheckCircledIcon className='text-green-600'></CheckCircledIcon> : <CrossCircledIcon className='text-red-600'></CrossCircledIcon>}</td>
                                                    <td className="whitespace-nowrap px-6 py-4">{formatarDataBrasileira(contact.dataNascimento)}</td>
                                                    <td className="whitespace-nowrap px-6 py-4 inline-flex">
                                                        <BotaoOption modo="put" name="Atualizar" text="Digite os dados para atualizar o contato" contato={contact} update={FetchContatos}></BotaoOption>
                                                        <BotaoDeletar handle={handleDelete} contatoid={contact.id}></BotaoDeletar>
                                                        <BotaoChamar handleLigar={handleIniciarLigação} handleDesligar={handleEncerrarLigação} verificaLigação={verificaContatoEmLigação} chamada={chamadaEmAndamento} setChamada={setChamadaEmAndamento} dadosChamada={chamada} contact={contact}></BotaoChamar>
                                                    </td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            )}
            {showSearchContact && (
                <div>
                    <div className="flex flex-col">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-left text-sm font-light">
                                        <thead
                                            className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                                            <tr>
                                                <th scope="col" className="px-6 py-4">ID</th>
                                                <th scope="col" className="px-6 py-4">Nome</th>
                                                <th scope="col" className="px-6 py-4">Email</th>
                                                <th scope="col" className="px-6 py-4">Telefone</th>
                                                <th scope="col" className="px-6 py-4">Ativo</th>
                                                <th scope="col" className="px-6 py-4">dataNascimento</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {searchContact.map(contact => (
                                                <tr key={contact.id} className="border-b bg-white-100 hover:bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                                    <td className="whitespace-nowrap px-6 py-4">{contact.id}</td>
                                                    <td className="whitespace-nowrap px-6 py-4">{contact.nome}</td>
                                                    <td className="whitespace-nowrap px-6 py-4">{contact.email}</td>
                                                    <td className="whitespace-nowrap px-6 py-4">{contact.telefone}</td>
                                                    <td className="whitespace-nowrap px-6 py-4">{contact.ativo ? <CheckCircledIcon className='text-green-600'></CheckCircledIcon> : <CrossCircledIcon className='text-red-600'></CrossCircledIcon>}</td>
                                                    <td className="whitespace-nowrap px-6 py-4">{contact.dataNascimento.slice(0, -9)}</td>
                                                    <td>
                                                        <BotaoOption modo="put" name="Atualizar" text="Digite os dados para atualizar o contato" contato={contact} update={FetchContatos}></BotaoOption>
                                                        <BotaoDeletar handle={handleDelete} contatoid={contact.id}></BotaoDeletar>
                                                        <BotaoChamar handleLigar={handleIniciarLigação} handleDesligar={handleEncerrarLigação} verificaLigação={verificaContatoEmLigação} chamada={chamadaEmAndamento} setChamada={setChamadaEmAndamento} dadosChamada={chamada} contact={contact}></BotaoChamar>
                                                    </td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )}
            <NotificacaoChamada chamada={chamadaEmAndamento} setChamada={setChamadaEmAndamento} dadosChamada={chamada} tempo={segundos} setSegundos={setSegundos}></NotificacaoChamada>
        </div>

    );

}




export default App;
