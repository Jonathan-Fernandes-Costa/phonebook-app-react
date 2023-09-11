import React from "react";
function Header (){
    return(
        <div className="mb-8">
            <header className="bg-purple-800 flex text-center justify-between font-bold p-2 text-white">
                <h1 className="font-lobster p-3 border border-white rounded-full"> Lista de Contatos</h1>
                <h2 className="grid items-center">Estágio BOX³</h2>
            </header>
        </div>
    )
}

export default Header;