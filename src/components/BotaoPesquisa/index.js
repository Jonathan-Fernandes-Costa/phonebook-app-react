import React, { useState } from 'react';

const BotaoPesquisa = (props) => {
  const [nome, setNome] = useState('');
  const [mostrarBotao, setMostrarBotao] = useState(false);

  const handleInputChange = (e) => {
    const nome = e.target.value;
    setNome(nome);

    if (nome) {
      setMostrarBotao(true);
    } else {
      setMostrarBotao(false);
    }
  };

  const confirmarPesquisa = () => {
    props.handle(nome)
    setNome('')
    setMostrarBotao(false)
  };

  return (
    <div className='inline-flex ml-2 h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium'>
      <input
        type="text"
        value={nome}
        onChange={handleInputChange}
        placeholder="Buscar contato..."
        
        ></input>
      {mostrarBotao && (
        <button onClick={confirmarPesquisa} className="text-violet11 shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"> Pesquisar
        </button>
        
      )}
    </div>
  );
};

export default BotaoPesquisa;
