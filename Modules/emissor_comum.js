function emissor_comum(valores, res, item) {
    var vcc = valores[0]
    var vin = valores[1] / 1000
    var rs = valores[2] * 1000
    var r1 = valores[3] * 1000
    var r2 = valores[4] * 1000
    var rc = valores[5] * 1000
    var re = valores[6] * 1000
    var re0 = valores[7]
    var rl = valores[8] * 1000
    var bcc = valores[9]

    //Calculo de impedâncias
    var vb = ((vcc * r2) / (r1 + r2))
    var ve = vb - 0.7
    var ie = (ve / (re + re0))
    var re1 = (0.025 / ie)
    var bre = bcc * re1
    var z1 = (1 / (1 / r1 + 1 / r2 + 1 / bre))
    var av = (-rc / (re1 + re0))
    var zout = rc
    var vce = vcc - (ie * (re + rc))
    var vc = vcc - (rc * ie) 
    //Mostrar dados:
    item[0].innerHTML = '<strong>Calculos de Impedância (DC):</strong>'
    res.appendChild(item[0])
    item[1].innerText = `1) vb = (Vcc x R2) / (R1 + R2) = ${vcc} x ${r2} / (${r1} + ${r2}) = ${vb.toFixed(2)}V`
    res.appendChild(item[1])
    if (re0 == 0) {
        item[2].innerText = `2) ie = (vb - vbe) / RE = (${vb} - 0.7) /  ${re} = ${ie.toFixed(4) * 1000}mA`
    } else {
        item[2].innerText = `2) ie = (vb - vbe) / (RE + rE) = (${vb} - 0.7) /  (${re} + ${re0}) = ${ie.toFixed(4) * 1000}mA`
    }
    res.appendChild(item[2])
    item[3].innerHTML = `3) re' = 25mV / ie = 25mV / ${ie.toFixed(4)} = ${re1.toFixed(3)}&Omega;`
    res.appendChild(item[3])
    item[4].innerHTML = `4) bre = bcc x re' = ${bcc} x ${re1.toFixed(3)} = ${bre.toFixed(2)}&Omega;`
    res.appendChild(item[4])
    item[5].innerHTML = `5) Zin = R1 // R2 // bre = 1 / (1 / R1 + 1 / R2 + 1 / bre) = 1 / (1 / ${r1} + 1 / ${r2} + 1 / ${bre.toFixed(2)}) = ${z1.toFixed(2)}&Omega;`
    res.appendChild(item[5])
    item[6].innerHTML = `6) Zout = RC = ${zout}&Omega;`
    res.appendChild(item[6])
    if (re0 == 0) {
        item[7].innerText = `7) Av = -RC / re' = -${rc} / ${re1.toFixed(3)} = ${av.toFixed(2)}`
    } else { 
        item[7].innerText = `7) Av = -RC / (re' + rE) = -${rc} / ${re1.toFixed(3)} + ${re0} = ${av.toFixed(2)}`
    }
    res.appendChild(item[7])

    //calculo de tensão de saida
    var vinb = (vin * z1 / (rs + z1))
    var voutb = vinb * av
    var vout = voutb * rl / (zout + rl)
    //Mostrar dados
    item[8].innerHTML = `<strong>Calculo de Tensão de Saida (AC):</strong>`
    res.appendChild(item[8])
    item[9].innerText = `8) V1 = Vbase(ac) = (Vin x Zin) / (rs + Zin) = (${vin} x ${z1.toFixed(2)}) / (${rs} + ${z1.toFixed(2)}) = ${(vinb * 1000).toFixed(2)}mV`
    res.appendChild(item[9])
    item[10].innerText = `9) V2 = Vcoletor(ac) = V1 x AV = ${vinb.toFixed(4)} = x ${av.toFixed(2)} = ${(voutb * 1000).toFixed(2)} mV`
    res.appendChild(item[10])
    item[11].innerText = `10) Vout = (V2 x RL) / (Zout + RL) = (${voutb.toFixed(4)} x ${rl}) / (${zout.toFixed(2)} + ${rl}) = ${(vout * 1000).toFixed(2)}mV `
    res.appendChild(item[11])

    //calculos de potencia 
    var icq = ie
    var vce = vcc - (icq * (rc + re + re0))
    var vceq = vce
    var icsat = vcc / (rc + re + re0)
    var rc0 = rc * rl / (rc + rl)
    var icsat0 = icq + (vceq / (rc0 + re0))
    var vcemax0 = vceq + ((rc0 + re0) * icq)
    //mostrar dados
    item[12].innerHTML = '<strong>Calculos de Potência</strong>'
    res.appendChild(item[12])
    item[13].innerHTML = `11) ICQ = IE = ${ie.toFixed(3)}mA`
    res.appendChild(item[13])
    if (re0 == 0) {
        item[14].innerHTML = `12) VCE = Vcc - (ICQ x (RC + RE)) = ${vcc} - (${icq.toFixed(3)} x (${rc} + ${re})) = ${vce.toFixed(2)}V`
        item[15].innerHTML = `13) IC sat = Vcc / (RC + RE) = ${vcc} / (${rc} + ${re}) = ${icsat.toFixed(3) * 1000}mA`
        item[17].innerHTML = `15) ic sat = ICQ + (VCEQ / rc) = ${icq.toFixed(3)} + (${vceq.toFixed(2)} / ${rc0.toFixed(2)}) = ${icsat0.toFixed(3) * 1000}mA`
        item[18].innerHTML = `16) vce max = VCEQ + (rc  x ICQ) = ${vceq.toFixed(2)} + (${rc0.toFixed(2)} x ${icq.toFixed(3)}) = ${vcemax0.toFixed(2)}V`
    } else {
        item[14].innerHTML = `12) VCE = VCQ = Vcc - (ICQ x (RC + RE + rE)) = ${vcc} - (${icq.toFixed(3)} x (${rc} + ${re} + ${re0})) = ${vce.toFixed(2)}V`
        item[15].innerHTML = `13) IC sat = Vcc / (RC + RE + rE) = ${vcc} / (${rc} + ${re} + ${re0}) = ${icsat.toFixed(3) * 1000}mA`
        item[17].innerHTML = `15) ic sat = ICQ + (VCEQ / (rc + rE)) = ${icq.toFixed(3)} + (${vceq.toFixed(2)} / (${rc0.toFixed(2)} + ${re0})) = ${icsat0.toFixed(3) * 1000}mA`
        item[18].innerHTML = `16) vce max = VCEQ + ((rc + rE) x ICQ) = ${vceq.toFixed(2)} + ((${rc0.toFixed(2)} + ${re0}) x ${icq.toFixed(3)}) = ${vcemax0.toFixed(2)}V`
    }
    item[16].innerHTML = `14) rc =  (RC x RL) / (RC + RL) = (${rc} x ${rl}) / (${rc} + ${rl}) = ${rc0.toFixed(2)}&Omega;`
    res.appendChild(item[14])
    res.appendChild(item[15])
    res.appendChild(item[16])
    res.appendChild(item[17])
    res.appendChild(item[18])
    //Colocar grafico

    var vpp = 2 * ((rc0 + re0) * icq)
    var ai = bcc
    var av = -rc0 / (re1 + re0)
    var ap = av * ai
    var plmax = (vpp ** 2) / (8 * rl)
    var i1 = vcc / (r1 + r2)
    var it = i1 + icq
    var pt = vcc * it
    var e = (plmax / pt) * 100
    var pdq = vce * ie
    //mostar dados 
}
