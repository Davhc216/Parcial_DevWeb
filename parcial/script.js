const urlAPI = "https://api.exchangerate.host/latest";

async function cargarMonedas() {
    try {
        const respuesta = await fetch(urlAPI);
        const datos = await respuesta.json();
        const monedas = Object.keys(datos.rates);
        
        const fromCurrency = document.getElementById("fromCurrency");
        const toCurrency = document.getElementById("toCurrency");
        
        monedas.forEach(moneda => {
            fromCurrency.innerHTML += `<option value="${moneda}">${moneda}</option>`;
            toCurrency.innerHTML += `<option value="${moneda}">${moneda}</option>`;
        });
    } catch (error) {
        console.error("Error al cargar las monedas:", error);
    }
}

async function convertir() {
    const cantidad = document.getElementById("amount").value;
    const de = document.getElementById("fromCurrency").value;
    const a = document.getElementById("toCurrency").value;
    
    if (cantidad === "" || cantidad <= 0) {
        alert("Ingrese un monto válido");
        return;
    }
    
    try {
        const respuesta = await fetch(`${urlAPI}?base=${de}&symbols=${a}`);
        const datos = await respuesta.json();
        const tasa = datos.rates[a];
        
        document.getElementById("resultado").innerText = `${cantidad} ${de} = ${(cantidad * tasa).toFixed(2)} ${a}`;
    } catch (error) {
        console.error("Error al convertir moneda:", error);
    }
}

document.addEventListener("DOMContentLoaded", cargarMonedas);
