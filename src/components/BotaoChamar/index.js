import React, { useEffect, useState } from 'react';
import { encerrarChamada, iniciarChamada } from '../../services/axios';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import {BiSolidPhoneCall} from "react-icons/bi"
import {HiPhoneMissedCall} from "react-icons/hi"
const BotaoChamada = (props) => {
    const [assunto, setAssunto] = useState('');


    const Chamar = async (id) => {
        try {
            await iniciarChamada(id);
            props.handleLigar()
            
        } catch (erro) {
            console.error("Erro ao iniciar a chamada:", erro);
        }
    };
    
    const finalizarChamada = async () => {
        
        try {
            const assuntoFormatado = {
                assunto: assunto
            }
            await encerrarChamada(props.dadosChamada.data.id, assuntoFormatado);
            setAssunto('')
            props.handleDesligar()
        } catch (erro) {
            console.error("Erro ao encerrar a chamada:", erro);
        }
    };
    
    
        useEffect(() => {

        }, [props.verificaLigação]);
    
    
    return (
        <div>

            {props.verificaLigação(props.contact.id) ? (
                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <button className="text-red-600 m-1 hover:bg-mauve3 shadow-blackA7 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black">
                            <HiPhoneMissedCall></HiPhoneMissedCall>
                        </button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                        <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
                        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                            <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                                Qual foi o assunto da chamada?
                            </Dialog.Title>
                            <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                                Digite abaixo:
                            </Dialog.Description>
                            <fieldset className="mb-[15px] flex items-center gap-5">
                                <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="name">
                                    Assunto:
                                </label>
                                <input
                                    value={assunto}
                                    onChange={(e) => setAssunto(e.target.value)}
                                    className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[45px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                                    id="asssunto"
                                    placeholder='Digite aqui o assunto da conversa...'
                                />
                            </fieldset>
                            <div className="mt-[25px] flex justify-end">
                                
                                    <button onClick={finalizarChamada} className="bg-orange-300 text-orange-500 hover:bg-orange-400 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                                        Encerrar chamada
                                    </button>
                                
                            </div>
                            <Dialog.Close asChild>
                                <button
                                    className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                                    aria-label="Close"
                                >
                                    <Cross2Icon />
                                </button>
                            </Dialog.Close>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>

            ) : (
                <button onClick={() => Chamar(props.contact.id)} className="text-green-600 m-1 hover:bg-mauve3 shadow-blackA7 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black">
                    <BiSolidPhoneCall></BiSolidPhoneCall>
                </button>
            )}

        </div>
    );

};

export default BotaoChamada;
