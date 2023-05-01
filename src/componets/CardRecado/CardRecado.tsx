import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import { Recado, removerRecado } from '../../store/modules/SliceRecados/SliceRecados';
import { useAppDispatch } from '../../store/modules/hooks';

interface CardRecadoProps extends Recado {
  setModal: any
}

export default function CardRecado({data, titulo, descricao, id, usuario, setModal }: CardRecadoProps) {

  const dispatch = useAppDispatch();

  function apagarRecado(): void {
    if(window.confirm(`Deseja apagar o recado ${titulo}?`)) dispatch(removerRecado(id))
  }
  
  return (
    <Card sx={{ minWidth: 200 }} elevation={5} >
      <CardContent>

        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {data}
        </Typography>

        <Typography variant="h5" component="div">
          {titulo}
        </Typography>

        <Typography variant="body2" marginTop={1} textAlign="justify">
          {descricao}
        </Typography>

      </CardContent>
      
      <CardActions>
        <Grid container justifyContent={'flex-end'}>
            <Button sx={{m: 0.5}} onClick={setModal} size="small" variant='outlined' color="secondary">Editar</Button>
            <Button sx={{m: 0.5}} onClick={apagarRecado} size="small" variant='outlined' color="error">Apagar</Button>
        </Grid>
      </CardActions>
    </Card>
  );
}