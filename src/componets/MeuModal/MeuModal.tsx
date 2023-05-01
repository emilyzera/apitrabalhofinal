import React, { useState } from 'react'
import { Box, Grid, Typography, Modal, TextField, Button } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../store/modules/hooks';
import { atualizarRecado, Recado, selectById as recadosSelectById } from '../../store/modules/SliceRecados/SliceRecados';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 24,
    p: 2,
    pb: 0,
  };

interface MeuModalProps {
    open: boolean,
    handleClose: any,
    id: string
}


export default function MeuModal({ open, handleClose, id }: MeuModalProps) {
    const dispatch = useAppDispatch()
    const recadoEditar = useAppSelector(state => recadosSelectById(state, id)!)

    const [ idRecado ] = useState<string>(recadoEditar.id)
    const [ usuario ] = useState<string>(recadoEditar.usuario)
    const [ titulo, setTitulo] = useState<string>(recadoEditar.titulo)
    const [ descricao, setDescricao ] = useState<string>(recadoEditar.descricao)
    const [ data, setData ] = useState<string>(recadoEditar.data)

    function salvarEdicao(){
        if(titulo === '' || descricao === '' || data === '') return alert('Todos os campos devem ser preenchidos') 

        const recadoEditado: Recado = {
            id: idRecado,
            titulo,
            descricao,
            data,
            usuario,
        }

        dispatch(atualizarRecado({id: idRecado, changes: {...recadoEditado}}))
        handleClose()
    }

    return(
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Editar recado
                </Typography>

                    <TextField 
                        margin='dense' 
                        variant='outlined' 
                        label='Titulo' 
                        type='string'
                        value={titulo}
                        onChange={event => setTitulo(event.target.value)}
                        fullWidth
                    />
                

                <TextField
                    margin='dense' 
                    variant='outlined' 
                    type='date'
                    value={data}
                    onChange={event => setData(event.target.value)}
                    fullWidth 
                />

                <TextField 
                    margin='dense'
                    variant='outlined'
                    label='Descrição'
                    type='string'
                    value={descricao}
                    onChange={event => setDescricao(event.target.value)}
                    multiline
                    rows={5}
                    fullWidth
                />

                <Grid 
                    item 
                    margin={2} 
                    display={'flex'} 
                    justifyContent={'space-between'}
                
                >
                    <Button 
                        variant='outlined'
                        color='secondary'
                        onClick={handleClose}
                    >
                        Fechar
                    </Button>

                    <Button 
                        variant='contained'
                        color='secondary'
                        onClick={salvarEdicao}
                    >
                        Salvar recado
                    </Button>
                </Grid>

            </Box>
        </Modal>
    )
}