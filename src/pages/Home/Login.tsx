import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginAction,
  selectById as userSelectById,
} from "../../store/modules/SliceUsuarios/SliceUsuarios";
import { useAppSelector, useThunkAppDispatch } from "../../store/modules/hooks";
import { getUsuarioLogado } from "../../utils/functions";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (getUsuarioLogado()) navigate("/recados");
  }, []);

  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const thunkDispatch = useThunkAppDispatch();

  const existeUsuario = useAppSelector((state) => userSelectById(state, email));

  const executarLogin = async () => {
    if (!email || email.length < 6) {
      alert("Preencha o email com pelo menos 6 letras");
      return;
    }
    if (!senha || senha.length < 6) {
      alert("Preencha a senha com pelo menos 6 letras");
      return;
    }

    const login = {
      email,
      senha,
    };
    const result = await thunkDispatch(loginAction(login)).unwrap();
    if (!result.ok) {
      alert(result.message);
      return;
    }
    navigate("/recados");
  };

  return (
    <>
      <Container sx={{ marginTop: 20 }}>
        <Grid container display={"flex"} justifyContent={"center"}>
          <Grid item sm={8} md={5} lg={5}>
            <Paper sx={{ padding: 2, opacity: 0.9 }} elevation={7}>
              <div>
                <Typography variant="h6" textAlign={"center"}>
                  Bem Vindo a sua lista de recados
                </Typography>
                <Typography
                  variant="body1"
                  margin="normal"
                  textAlign={"center"}
                >
                  Digite seu e-mail e senha para acessar seus recados:
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

                <Grid
                  item
                  margin={2}
                  display={"flex"}
                  justifyContent={"space-between"}
                >
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate("/cadastro")}
                  >
                    Criar conta
                  </Button>

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={executarLogin}
                  >
                    Logar
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

export default Login;
