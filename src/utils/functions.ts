export const setUsuarioLogado = (usuarioLogado: string ) =>{
    localStorage.setItem('usuarioLogado', usuarioLogado);
}

export const getUsuarioLogado = () => {
    return localStorage.getItem('usuarioLogado')
}

export const removeUsuarioLogado = () => {
    localStorage.removeItem('usuarioLogado')
}