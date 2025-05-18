const formatarMoeda = valor => new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
}).format(valor);

let artigosSelecionados = [];

let todosArtigos = {};

$(document).ready(() => {
    function aplicarArtigo(codigo, meses, multa, fianca, alerta = '') {
        const input = $('#TotalArtigos').html().trim();
        if (!input.includes(codigo)) {
            artigosSelecionados.push(codigo);

            const mesesTotal = (Number($('#meses').data('raw')) || 0) + meses;
            const multaTotal = (Number($('#multa').data('raw')) || 0) + multa;
            const fiancaTotal = (Number($('#fianca').data('raw')) || 0) + fianca;

            $('#TotalArtigos').html(`${input}${codigo}, `);
            $('#multa').data('raw', multaTotal).html(formatarMoeda(multaTotal));
            $('#meses').data('raw', mesesTotal).html(mesesTotal);
            $('#fianca').data('raw', fiancaTotal).html(formatarMoeda(fiancaTotal));
        }

        if (alerta) alert(alerta);
    }

    function aplicarArtigosCategoria(categoria, artigos) {
        for (const [codigo, dados] of Object.entries(artigos)) {
            todosArtigos[codigo] = dados;
            $(`.${categoria}[data-codigo="${codigo}"]`).on('click', () => {
                aplicarArtigo(codigo, dados.meses || 0, dados.multa || 0, dados.fianca || 0, dados.alerta);
            });
        }
    }

    const infracoesLeves = {
        "53": { nome: "Pousar Aeronaves em local proibido", multa: 14000, meses: 0, fianca: 0 },
        "54": { nome: "Poluição sonora", multa: 6900, meses: 0, fianca: 0 },
        "56": { nome: "Danos a terceiros", multa: 12000, meses: 0, fianca: 0 },
        "108": { nome: "Direção perigosa", multa: 6500, meses: 0, fianca: 0 },
        "162": { nome: "Sem habilitação", multa: 5000, meses: 0, fianca: 0 },
        "172": { nome: "Estacionar em local proibido", multa: 2500, meses: 0, fianca: 0 },
        "244": { nome: "Sem capacete", multa: 1500, meses: 0, fianca: 0 }
    };

    const crimesMedios = {
        "02": { nome: "Uso de máscara", fianca: 4000, meses: 10 },
        "19": { nome: "Porte de arma branca", fianca: 5500, meses: 10 },
        "102": { nome: "Fuga", fianca: 2500, meses: 10 },
        "139": { nome: "Calúnia, difamação e injúria", fianca: 6000, meses: 10 },
        "147": { nome: "Ameaça", fianca: 7000, meses: 15 },
        "150": { nome: "Invasão", fianca: 3300, meses: 0 },
        "165": { nome: "Dirigir sob efeito de álcool/drogas", fianca: 4500, meses: 10 },
        "173": { nome: "Racha / corrida ilegal", fianca: 5100, meses: 10 },
        "251-2": { nome: "Posse/Porte colete balístico", fianca: 4900, meses: 10 },
        "287": { nome: "Apologia ao crime", fianca: 6100, meses: 5 },
        "289": { nome: "Posse de dinheiro sujo", fianca: 2000, meses: 5 },
        "330": { nome: "Desobediência", fianca: 8000, meses: 10 },
        "331": { nome: "Desacato", fianca: 13000, meses: 10 },
        "333": { nome: "Tentativa de suborno", fianca: 6000, meses: 15 }
    };

    const crimesGraves = {
        "14": { nome: "Mal uso de arma com porte", fianca: 5000, meses: 20 },
        "33": { nome: "Tráfico de drogas", fianca: 4200, meses: 10 },
        "129": { nome: "Lesão corporal", fianca: 4000, meses: 10 },
        "157-2": { nome: "Furto", fianca: 6000, meses: 10 },
        "157-3": { nome: "Roubo a caixa registradora", fianca: 2900, meses: 10 },
        "157-4": { nome: "Roubo a caixa eletrônico", fianca: 4000, meses: 10 },
        "158": { nome: "Extorsão", fianca: 5200, meses: 10 },
        "180": { nome: "Receptação", fianca: 5000, meses: 10 },
        "251": { nome: "Posse/Porte de Explosivos", fianca: 3300, meses: 5 },
        "288": { nome: "Associação criminosa", fianca: 3500, meses: 10 },
        "298": { nome: "Falsificação de documentos", fianca: 3500, meses: 10 },
        "299": { nome: "Falsidade ideológica", fianca: 4000, meses: 10 },
        "334": { nome: "Contrabando (itens ilegais)", fianca: 4000, meses: 10 },
        "342": { nome: "Falso testemunho", fianca: 10000, meses: 10 },
        "358": { nome: "Obstrução de justiça", fianca: 5000, meses: 15 },
        "520": { nome: "Multas pendentes", fianca: 4000, meses: 10 }
    };

    const crimesGravissimos = {
        "15": { nome: "Posse/Porte ilegal de arma de baixo calibre", fianca: 0, meses: 10 },
        "16": { nome: "Posse/Porte de arma de alto calibre", fianca: 0, meses: 20 },
        "16-1": { nome: "Posse/Porte de Arma Restrita", fianca: 0, meses: 30 },
        "18": { nome: "Tráfico de armas", fianca: 0, meses: 20 },
        "33": { nome: "Tráfico Internacional", fianca: 0, meses: 15 },
        "57": { nome: "Posse/Porte ilegal de munições", fianca: 0, meses: 10 },
        "59": { nome: "Roubo a bancos", fianca: 0, meses: 20 },
        "60": { nome: "Roubo à joalheria", fianca: 0, meses: 20 },
        "92-1": { nome: "Simulacro de arma", fianca: 0, meses: 10 },
        "129-1": { nome: "Tentativa de homicídio", fianca: 0, meses: 10 },
        "148": { nome: "Sequestro", fianca: 0, meses: 20 },
        "148-1": { nome: "Extorsão mediante sequestro", fianca: 0, meses: 25 },
        "157-1": { nome: "Roubo", fianca: 0, meses: 15 },
        "157-5": { nome: "Homicídio", fianca: 0, meses: 25 },
        "157-6": { nome: "Latrocínio", fianca: 0, meses: 30 },
        "157-7": { nome: "Roubo ao Nióbio / Galinheiro", fianca: 0, meses: 20 },
        "157-8": { nome: "Roubo a loja de conv./armas", fianca: 0, meses: 15 },
        "157-9": { nome: "Roubo a residência", fianca: 0, meses: 15 },
        "171": { nome: "Estelionato", fianca: 0, meses: 10 },
        "351": { nome: "Fuga da prisão / Resgate", fianca: 0, meses: 15 }
    };

    aplicarArtigosCategoria('infracaoLeve', infracoesLeves);
    aplicarArtigosCategoria('crimeMedio', crimesMedios);
    aplicarArtigosCategoria('crimeGrave', crimesGraves);
    aplicarArtigosCategoria('crimeGravissimo', crimesGravissimos);
});


function clean() {
    $('#name, #cpf').val('');
    $('#TotalArtigos').html('');
    $('#multa').html('').data('raw', 0);
    $('#meses').html('').data('raw', 0);
    $('#fianca').html('').data('raw', 0);
    $('#Resumo').html('');
    $('#meses').removeData('reduzido').removeData('colaborado');
    artigosSelecionados = [];
}

function primario() {
    if ($('#meses').data('reduzido')) return alert('A redução de pena já foi aplicada.');
    let totalMeses = Number($('#meses').data('raw')) || 0;
    if (totalMeses > 0) {
        let penalidadeReduzida = totalMeses * 0.5;
        $('#meses').html(Math.round(penalidadeReduzida));
        $('#meses').data('raw', penalidadeReduzida).data('reduzido', true);
    } else alert('Nenhuma pena registrada para redução.');
}

function colaborar() {
    if ($('#meses').data('colaborado')) return alert('A redução de pena por colaboração já foi aplicada.');
    let totalMeses = Number($('#meses').data('raw')) || 0;
    if (totalMeses > 0) {
        let penalidadeReduzida = totalMeses * 0.9;
        $('#meses').html(Math.round(penalidadeReduzida));
        $('#meses').data('raw', penalidadeReduzida).data('colaborado', true);
    } else alert('Nenhuma pena registrada para redução.');
}

function finalizar(event) {
    if (event) event.preventDefault();

    const nome = $('#name').val();
    const cpf = $('#cpf').val();
    const totalArtigos = $('#TotalArtigos').text();
    let totalMulta = Number($('#multa').data('raw')) || 0;
    let totalFianca = Number($('#fianca').data('raw')) || 0;
    let totalMeses = Number($('#meses').data('raw')) || 0;

    totalMeses = Math.min(totalMeses, 30);

    const parcialMeses = artigosSelecionados.reduce((soma, codigo) => {
        const dados = todosArtigos[codigo];
        return dados && dados.fianca === 0 ? soma + (dados.meses || 0) : soma;
    }, 0);

    $('#nomeTotal').text(nome);
    $('#cpfTotal').text(cpf);
    $('#artigosTotal').text(totalArtigos);
    $('#penaTotal').text(totalMeses);
    $('#multaTotal').text(formatarMoeda(totalMulta));
    $('#fiancaTotal').text(0);

    $('#nomeParcial').text(nome);
    $('#cpfParcial').text(cpf);
    $('#artigosParcial').text(totalArtigos);
    $('#penaParcial').text(parcialMeses);
    $('#multaParcial').text(formatarMoeda(totalMulta));
    $('#fiancaParcial').text(formatarMoeda(totalFianca));

    $('#nomeLiberdade').text(nome);
    $('#cpfLiberdade').text(cpf);
    $('#artigosLiberdade').text(totalArtigos);
    $('#penaLiberdade').text(0);
    $('#multaLiberdade').text(formatarMoeda(totalMulta));
    $('#fiancaLiberdade').text(formatarMoeda(totalFianca));

    // Não limpar os dados aqui para manter visível no popup
}

function penaTotal() {
    finalizar();
    $('#resumoTotal').show();
    $('#resumoParcial, #resumoLiberdade').hide();
    $('#popupResumo').fadeIn();
}

function penaParcial() {
    finalizar();
    $('#resumoParcial').show();
    $('#resumoTotal, #resumoLiberdade').hide();
    $('#popupResumo').fadeIn();
}

function liberdade() {
    finalizar();
    $('#resumoLiberdade').show();
    $('#resumoTotal, #resumoParcial').hide();
    $('#popupResumo').fadeIn();
}

function fecharPopup() {
    $('#popupResumo').fadeOut();
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') fecharPopup();
});

function copiarTexto(tipo) {
    const getText = (selector) => $(selector).text().trim() || 'N/A';

    let texto = '';
    switch (tipo) {
        case 'penaTotal':
            texto = `**PRESO** \nIndivíduo encaminhado à prisão para cumprir totalmente sua pena.\n
Nome: ${getText('#nomeTotal')}
CPF: ${getText('#cpfTotal')}
Artigos: ${getText('#artigosTotal')}
Pena: ${getText('#penaTotal')}
Multa: ${getText('#multaTotal')}
Fiança: ${getText('#fiancaTotal')}`;
            break;

        case 'penaParcial':
            texto = `**PENA PARCIAL** \nIndivíduo encaminhado à prisão porém com redução da pena\n
Nome: ${getText('#nomeParcial')}
CPF: ${getText('#cpfParcial')}
Artigos: ${getText('#artigosParcial')}
Pena: ${getText('#penaParcial')}
Multa: ${getText('#multaParcial')}
Fiança: ${getText('#fiancaParcial')}`;
            break;

        case 'liberdade':
            texto = `**LIBERDADE** \nIndivíduo segue em liberdade por pagamento total da fiança.\n
Nome: ${getText('#nomeLiberdade')}
CPF: ${getText('#cpfLiberdade')}
Artigos: ${getText('#artigosLiberdade')}
Pena: ${getText('#penaLiberdade')}
Multa: ${getText('#multaLiberdade')}
Fiança: ${getText('#fiancaLiberdade')}`;
            break;

        default:
            alert('Tipo de cópia inválido.');
            return;
    }

    navigator.clipboard.writeText(texto).then(() => {
        alert('Copiado para área de transferência.\n\nAgora basta "colar" (CTRL + V) na canaleta 💻┃registro-de-ficha juntamente com as fotos do indivíduo.');
            fecharPopup(); // <-- Fecha o popup após o usuário clicar em OK
    }).catch(() => {
        alert('Falha ao copiar o texto.');
    });
}

function abrirQRCode() {
    document.getElementById('popupQRCode').style.display = 'flex';
}

function fecharQRCode() {
    document.getElementById('popupQRCode').style.display = 'none';
}

// Detectar pressionamento da tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        fecharQRCode();
    }
});

