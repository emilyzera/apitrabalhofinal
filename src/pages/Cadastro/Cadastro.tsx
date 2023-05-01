import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/modules/hooks";
import {
  adicionarUsuario,
  selectById,
  Usuario
} from "../../store/modules/SliceUsuarios/SliceUsuarios";

function verificacoesDosInputs(
  email: string,
  senha: string,
  reSenha: string
): boolean {
  const regexEmail = /\S+@\S+\.\S+/;
  if (email === "" || senha === "" || reSenha === "") {
    alert("Todas as informações devem ser preenchidas");
    return false;
  }

  if (!regexEmail.test(email)) {
    alert("Digite um e-mail válido");
    return false;
  }

  if (senha.length < 3) {
    alert("A senha deve ter pelo menos 3 dígitos");
    return false
  }
  if (senha !== reSenha) {
    alert("As senhas não conferem");
    return false;
  }

  return true;
}

const Cadastro = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [reSenha, setReSenha] = useState<string>("");
  const usuarioEncontrado = useAppSelector((state) => selectById(state, email));

  function cadastrarUsuario() {
    if (!verificacoesDosInputs(email, senha, reSenha)) return;
    if (usuarioEncontrado) return alert("Usuario já existe");

    const novoUsuario: Usuario = {
      email,
      senha,
    };

    dispatch(adicionarUsuario(novoUsuario));
    alert("Usuario cadastrado com sucesso!");
    navigate("/");
  }

  return (
    <>
      <Container sx={{ marginTop: 20 }}>
        <Grid container display={"flex"} justifyContent={"center"}>
          <Grid item sm={8} md={5} lg={5}>
            <Paper sx={{ padding: 2, opacity: 0.9 }} elevation={7}>
              <div>
                <Typography
                  variant="body1"
                  margin="normal"
                  textAlign={"center"}
                >
                  Preencha os campos abaixo para criar uma conta:
                </Typography>

                <TextField
                  margin="dense"
                  variant="outlined"
                  label="E-mail"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  fullWidth
                />

                <TextField
                  margin="dense"
                  variant="outlined"
                  label="Senha"
                  type="password"
                  value={senha}
                  onChange={(event) => setSenha(event.target.value)}
                  fullWidth
                />

                <TextField
                  margin="dense"
                  variant="outlined"
                  label="Repete Senha"
                  type="password"
                  value={reSenha}
                  onChange={(event) => setReSenha(event.target.value)}
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
                    onClick={() => navigate("/")}
                  >
                    Voltar
                  </Button>

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => cadastrarUsuario()}
                  >
                    Criar conta
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

export default Cadastro;