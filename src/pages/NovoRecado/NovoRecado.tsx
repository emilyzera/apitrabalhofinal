import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useAppDispatch } from "../../store/modules/hooks";
import {
  adicionarRecado,
  fetchrecados,
  Recado,
} from "../../store/modules/SliceRecados/SliceRecados";
import { getUsuarioLogado } from "../../utils/functions";

function verificaInputs(titulo: string, descricao: string, data: string) {
  if (titulo === "" || data === "" || descricao === "") {
    alert("Todos os campos devem ser preenchidos");
    return false;
  }
  return true;
}


const NovoRecado: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!getUsuarioLogado()) navigate("/");
  }, []);

  const usuarioLogado = getUsuarioLogado() || "";

  const [titulo, setTitulo] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [data, setData] = useState<string>("");

  function cadastraRecado() {
    if (!verificaInputs(titulo, descricao, data)) return;

    const novoRecado: Recado = {
      id: uuid(),
      titulo,
      descricao,
      data,
      usuario: usuarioLogado,
    };

    dispatch(adicionarRecado(novoRecado));
    navigate("/recados");
  }

  return (
    <>
      <Container sx={{ marginTop: 3 }}>
        <Grid container display={"flex"} justifyContent={"center"}>
          <Grid item sm={8} md={5} lg={5}>
            <Paper sx={{ padding: 2 }} elevation={7}>
              <div>
                <Typography variant="h6" margin="normal" textAlign={"center"}>
                  Cadastrar novo Recado:
                </Typography>

                <TextField
                  margin="dense"
                  variant="outlined"
                  label="Titulo"
                  type="string"
                  value={titulo}
                  onChange={(event) => setTitulo(event.target.value)}
                  fullWidth
                />

                <TextField
                  margin="dense"
                  variant="outlined"
                  type="date"
                  value={data}
                  onChange={(event) => setData(event.target.value)}
                  fullWidth
                />

                <TextField
                  margin="dense"
                  variant="outlined"
                  label="Descrição"
                  type="string"
                  value={descricao}
                  onChange={(event) => setDescricao(event.target.value)}
                  multiline
                  rows={5}
                  fullWidth
                />

                <Grid
                  item
                  margin={2}
                  display={"flex"}
                  justifyContent={"space-between"}
                >
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate("/recados")}
                  >
                    Voltar
                  </Button>

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => cadastraRecado()}
                  >
                    Salvar recado
                  </Button>
                </Grid>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default NovoRecado;
