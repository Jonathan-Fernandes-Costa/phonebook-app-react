import React, { useState, useEffect } from 'react';
import { deleteContato, getAllContatos, getChamadaemAndamento } from './services/chamadasAPI'
import BotaoOption from './components/BotaoOption';
import BotaoPesquisa from './components/BotaoPesquisa';
import Header from './components/Header';
import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import AlertDeletar from './components/AlertDeletar';
import NotificacaoChamada from './components/NotificaChamada';
import ModalAssunto from './components/ModalAssunto';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/home';

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

    function verificaContatoEmLigação(idcontato) {
        if (chamada.data !== undefined) {
            if (chamadaEmAndamento && chamada.data.contatoId === idcontato) {
                return true
            } else {
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
        <Home></Home>
    );

}




export default App;
