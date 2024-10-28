function validar(validar) {
    let elementos = ['vcc', 'vin', 'rs', 'r1', 'r2', 'rc', 're', 're0', 'rl', 'bcc']
    var valores = []

    for (let e in elementos) {
        valores[e] = Number(document.getElementById(elementos[e]).value)
    }
    return valores
}

function calcular() {
    var valores = validar(0)

    var res = document.getElementById('res')
    while (res.childElementCount > 0) {res.firstElementChild.remove('p')}
    let item = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    for (let i in item) {
        item[i] = document.createElement('p')
    }

    if (valores[5] == 0) {coletor_comum(valores, res, item)} 
    else {emissor_comum(valores, res, item)} 

    
} 
