exports.index = (req, res) => {
    res.render('index');
};

exports.funcionalidades = (req, res) => {
    res.render('funcionalidades');
};

exports.sobre = (req, res) => {
    res.render('sobre');
};

exports.planos = (req, res) => {
    res.render('planos');
};

exports.contato = (req, res) => {
    res.render('contato');
};

exports.showLoginPage = (req, res) => {
    res.render('login', { error: null });
};

/* Pós login */

exports.home = (req, res) => {
    res.render('home');
};

exports.listaos = (req, res) => {
    res.render('listaos');
};

exports.listaos = (req, res) => {
    // Lista estática de orçamentos
    const listaOrcamentos = [
        { id: 1, tipoServico: 'Manutenção', cliente: 'Cliente A', entradaOrcamento: '01/10/2023', previsaoTermino: '10/10/2023' },
        { id: 2, tipoServico: 'Instalação', cliente: 'Cliente B', entradaOrcamento: '01/10/2023', previsaoTermino: '07/10/2023' },
        { id: 3, tipoServico: 'Consultoria', cliente: 'Cliente C', entradaOrcamento: '01/10/2023', previsaoTermino: '02/10/2023' },
    ];

    res.render('listaos', { listaOrcamentos });
};

exports.cadastroCliente = (req, res) => {
    res.render('cadastroCliente');
};