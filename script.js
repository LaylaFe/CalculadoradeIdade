// Executa a função quando a página é carregada
window.onload = function CalcularIdade() {
   
    // Obtém os elementos de input pelo ID
    var dia = document.getElementById('dia');
    var mes = document.getElementById('mes');
    var ano = document.getElementById('ano');
    
    // Obtém todos os elementos <label> e elementos com classe 'erro'
    var label = document.getElementsByTagName('label');
    var erro = document.getElementsByClassName('erro');
    
    // Obtém o botão de submit e todos os elementos <span>
    var submit = document.getElementById('submit');
    var span = document.getElementsByTagName('span');

    // Cria um novo objeto de data
    var novaData = new Date();
    
    // Obtém o ano, mês e dia atuais
    var idadeAnoAtual = novaData.getFullYear();
    var idadeMesAtual = novaData.getMonth() + 1; // Os meses em JavaScript são indexados em 0
    var idadeDiaAtual = novaData.getDate();

    // Define as mensagens de erro
    const tipodoErro = [
        "",
        "Digite uma data válida.",
        "Coloque um dia válido.",
        "Coloque um mês válido.",
        "Coloque um ano válido."
    ];

    // Função para exibir mensagens de erro e colorir os campos
    const estadodoErro = (numerodoErro, mensagemErro, campo, cor) => {
        erro[numerodoErro].innerHTML = mensagemErro; // Define a mensagem de erro
        label[numerodoErro].style.color = cor; // Altera a cor do label
        campo.style.borderColor = cor; // Altera a cor da borda do campo
    };

    // Função para verificar se uma data é válida, considerando anos bissextos
    const anoBissexto = (dia, mes, ano) => {
        mes = mes - 1; // Ajusta o mês (indexado em 0)
        var dataCompleta = new Date(ano, mes, dia);
        // Retorna verdadeiro se a data for válida
        return (dia == dataCompleta.getDate() && mes == dataCompleta.getMonth() && ano == dataCompleta.getFullYear());
    };

    // Função para calcular a idade
    const calculoIdade = () => {
        var novoAno = idadeAnoAtual - ano.value;
        var novoMes = idadeMesAtual - mes.value;
        var novoDia = idadeDiaAtual - dia.value;
        
        // Ajusta o dia e mês se necessário
        if (novoDia < 0) {
            novoMes--;
            novoDia += 30;
        }
        
        if (novoMes < 0) {
            novoAno--;
            novoMes += 12;
        }
        
        // Define os valores calculados nos elementos <span>
        span[0].innerHTML = novoAno;
        span[1].innerHTML = novoMes;
        span[2].innerHTML = novoDia;
    };

    // Função para validar o dia
    const verificaDia = () => {
        // Verifica se o mês é válido antes de validar o dia
        if (!verificaMes()) {
            return false;
        }

        // Verificações de validade do dia
        if (dia.value == "") {
            estadodoErro(0, tipodoErro[2], dia, "#ff5757");
            return false;
        } else if (dia.value <= 0 || dia.value > 31) {
            estadodoErro(0, tipodoErro[2], dia, "#ff5757");
            return false;
        } else if (!anoBissexto(dia.value, mes.value, ano.value)) {
            estadodoErro(0, tipodoErro[4], dia, "#ff5757");
            return false;
        } else {
            estadodoErro(0, tipodoErro[0], dia, "");
            return true;
        }
    };

    // Função para validar o mês
    const verificaMes = () => {
        // Verificações de validade do mês
        if (mes.value == "") {
            estadodoErro(1, tipodoErro[3], mes, "#ff5757");
            return false;
        } else if (mes.value <= 0 || mes.value > 12) {
            estadodoErro(1, tipodoErro[3], mes, "#ff5757");
            return false;
        } else {
            estadodoErro(1, tipodoErro[0], mes, "");
            return true;
        }
    };

    // Função para validar o ano
    const verificaAno = () => {
        // Verificações de validade do ano
        if (ano.value == "") {
            estadodoErro(2, tipodoErro[1], ano, "#ff5757");
            return false;
        } else if (ano.value > idadeAnoAtual) {
            estadodoErro(2, tipodoErro[4], ano, "#ff5757");
            return false;
        } else {
            estadodoErro(2, tipodoErro[0], ano, "");
            return true;
        }
    };

    // Adiciona um listener ao botão de submit para validar os campos e calcular a idade
    submit.addEventListener("click", (e) => {
        e.preventDefault(); // Prevê o envio padrão do formulário
        let mesValido = verificaMes(); // Verifica o mês antes do dia
        let diaValido = verificaDia(); // Verifica o dia independentemente do mês
        let anoValido = verificaAno();

        // Se todos os campos forem válidos, calcula a idade
        if (diaValido && mesValido && anoValido) {
            calculoIdade();
        }
    });
};

