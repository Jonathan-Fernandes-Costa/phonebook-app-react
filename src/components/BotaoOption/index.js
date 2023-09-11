import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import FormContato from '../FormContato';

const BotaoOption = (props) => {
    const verifica = () => {
        if (props.modo === "get") {
            return (props.handle)
        }
    }
    const [dialogOpen, setDialogOpen] = useState(false);
    const fecharDialog = () => {
        setDialogOpen(false);
    };
    const abrirDialog = (event) => {
        event.preventDefault();
        setDialogOpen(true);
    };
    return (
        <div className='inline-flex'>
            <button onClick={verifica && abrirDialog} className="text-violet11  shadow-blackA7 hover:bg-mauve3 m-1 h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
                {props.name}
            </button>
            <Dialog.Root  open={dialogOpen} onOpenChange={fecharDialog}>
                
                {props.modo !== "get" && (
                    <Dialog.Portal>
                        <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
                        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                            <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                                {props.name + " Box³"}
                            </Dialog.Title>
                            <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                                {props.text}
                            </Dialog.Description>


                            <FormContato onSubmit={fecharDialog} modo={props.modo} contato={props.contato} update={props.update}></FormContato>


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
                )}



            </Dialog.Root>
        </div>
    )
}

export default BotaoOption;