import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cadastro from "../pages/Cadastro/Cadastro";

import Home from "../pages/Home/Login";
import NovoRecado from "../pages/NovoRecado/NovoRecado";
import Recados from "../pages/Recados/Recados";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/recados" element={<Recados />} />
        <Route path="/recados/novorecado" element={<NovoRecado />} />
      </Routes>
    </BrowserRouter>
  );
};
