window.onload = function CalcularIdade() {
    var dia = document.getElementById('dia');
    var mes = document.getElementById('mes');
    var ano = document.getElementById('ano');
    var label = document.getElementsByTagName('label');
    var erro = document.getElementsByClassName('erro');
    var submit = document.getElementById('submit');
    var span = document.getElementsByTagName('span');

    var novaData = new Date();
    
    var idadeAnoAtual = novaData.getFullYear();
    var idadeMesAtual = novaData.getMonth() + 1;
    var idadeDiaAtual = novaData.getDate();

    const tipodoErro = [
        "",
        "Digite uma data válida.",
        "Coloque um mês válido.",
        "Coloque um ano válido.",
        "Coloque um dia válido."
    ];

    const estadodoErro = (numerodoErro, tipodoErro, tipodeData, color) => {
        erro[numerodoErro].innerHTML = tipodoErro;
        label[numerodoErro].style.color = color;
        tipodeData.style.borderColor = color;
    }

    const anoBissexto = (dia, mes, ano) => {
        mes = mes - 1;
        var dataCompleta = new Date(ano, mes, dia);
        return (dia == dataCompleta.getDate() && mes == dataCompleta.getMonth() && ano == dataCompleta.getFullYear());
    }

    const calculoIdade = () => {
        var novoAno = Math.abs(idadeAnoAtual - ano.value);
        var novoMes = 0;
        if (idadeMesAtual >= mes.value) {
            novoMes = idadeMesAtual - mes.value;
        } else {
            novoAno--;
            novoMes = 12 + idadeMesAtual - mes.value;
        }
        var novoDia = 0;
        if (idadeDiaAtual >= dia.value) {
            novoDia = idadeDiaAtual - dia.value;
        } else {
            novoMes--;
            novoDia = 30 + idadeDiaAtual - dia.value;
            if (novoMes < 0) {
                novoMes = 11;
                novoAno--;
            }
        }
        span[0].innerHTML = novoAno;
        span[1].innerHTML = novoMes;
        span[2].innerHTML = novoDia;
    }

    const verificaDia = () => {
        if (dia.value == "") {
            estadodoErro(0, tipodoErro[1], dia, "#ff5757");
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
    }

    const verificaMes = () => {
        if (mes.value == "") {
            estadodoErro(1, tipodoErro[1], mes, "#ff5757");
            return false;
        } else if (mes.value <= 0 || mes.value > 12) {
            estadodoErro(1, tipodoErro[3], mes, "#ff5757");
            return false;
        } else {
            estadodoErro(1, tipodoErro[0], mes, "");
            return true;
        }
    }

    const verificaAno = () => {
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
    }

    submit.addEventListener("click", () => {
        let diaValido = verificaDia();
        let mesValido = verificaMes();
        let anoValido = verificaAno();

        if (diaValido && mesValido && anoValido) {
            calculoIdade();
        }
    });
}
