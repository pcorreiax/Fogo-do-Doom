const pixelFogo = [];
const larguraFogo = 40;
const alturaFogo = 40;
const paletaDeCores = [
    {"r":7,"g":7,"b":7},
    {"r":31,"g":7,"b":7},
    {"r":47,"g":15,"b":7},
    {"r":71,"g":15,"b":7},
    {"r":87,"g":23,"b":7},
    {"r":103,"g":31,"b":7},
    {"r":119,"g":31,"b":7},
    {"r":143,"g":39,"b":7},
    {"r":159,"g":47,"b":7},
    {"r":175,"g":63,"b":7},
    {"r":191,"g":71,"b":7},
    {"r":199,"g":71,"b":7},
    {"r":223,"g":79,"b":7},
    {"r":223,"g":87,"b":7},
    {"r":223,"g":87,"b":7},
    {"r":215,"g":95,"b":7},
    {"r":215,"g":95,"b":7},
    {"r":215,"g":103,"b":15},
    {"r":207,"g":111,"b":15},
    {"r":207,"g":119,"b":15},
    {"r":207,"g":127,"b":15},
    {"r":207,"g":135,"b":23},
    {"r":199,"g":135,"b":23},
    {"r":199,"g":143,"b":23},
    {"r":199,"g":151,"b":31},
    {"r":191,"g":159,"b":31},
    {"r":191,"g":159,"b":31},
    {"r":191,"g":167,"b":39},
    {"r":191,"g":167,"b":39},
    {"r":191,"g":175,"b":47},
    {"r":183,"g":175,"b":47},
    {"r":183,"g":183,"b":47},
    {"r":183,"g":183,"b":55},
    {"r":207,"g":207,"b":111},
    {"r":223,"g":223,"b":159},
    {"r":239,"g":239,"b":199},
    {"r":255,"g":255,"b":255}
];
let debug = false;

function iniciar(){

    criaEstruturaDeBancoDoFogo();
    console.log(pixelFogo);
    criarFonteFogo();
    renderizaFogo();

    setInterval(calculaPropagaçãoDoFogo, 50)
}
function criaEstruturaDeBancoDoFogo(){
    const numeroDePixels = larguraFogo*alturaFogo;

    for (let i = 0; i < numeroDePixels; i++) {
        pixelFogo[i] = 0
        
    }
}

function calculaPropagaçãoDoFogo(){
    for (let coluna = 0; coluna < larguraFogo; coluna++) {
        for (let row = 0; row < alturaFogo; row++) {
            const indexPixel = coluna + (larguraFogo * row);

            atualizaIntensidadeFogoPorPixel(indexPixel);
        }
    }

    renderizaFogo();
}

function atualizaIntensidadeFogoPorPixel(pixelAtual){
    const pixelDeBaixo = pixelAtual + larguraFogo;

    if (pixelDeBaixo >= larguraFogo * alturaFogo) {
        return
    }

    const decair = Math.floor(Math.random() *3);
    const pixelDeBaixoIntensidade = pixelFogo[pixelDeBaixo];
    const novaIntensidade = 
        pixelDeBaixoIntensidade - decair >=0 ? pixelDeBaixoIntensidade - decair : 0;

    pixelFogo[pixelAtual  - decair] = novaIntensidade;
}

function renderizaFogo(){
    const debug = false;
    let html = '<table cellpadding=0 cellspacing=0>' 
    for (let row = 0; row < alturaFogo; row++) {
        html += '<tr>';

        for (let coluna = 0; coluna < larguraFogo; coluna++) {
            const indexPixel = coluna + (larguraFogo * row);
            const intensificarFogo = pixelFogo[indexPixel]

            if(debug === true){
                html += '<td>'
            html += `<div class="pixel-index">${indexPixel}</div>`;
            html += intensificarFogo;
            html += '</td>'
            }else{
                const cor = paletaDeCores[intensificarFogo];
                const corString = `${cor.r},${cor.g},${cor.b}`
                html +=`<td class="pixel" style="background-color: rgb(${corString})">`
                html += '</td>'
            }
        }

        html += '</tr>';
        
    }
    html+='</table>'

    document.querySelector('#canvasFogo').innerHTML = html;
}

function criarFonteFogo(){
    for (let coluna = 0; coluna <= larguraFogo; coluna++) {
        const sobreproPixelIndex = larguraFogo * alturaFogo;
        const indexPixel = (sobreproPixelIndex - larguraFogo) + coluna;

        pixelFogo[indexPixel] = 36;
        
    }
}

iniciar();
