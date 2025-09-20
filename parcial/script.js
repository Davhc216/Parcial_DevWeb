const urlAPI = "http://data.fixer.io/api/latest?access_key=816632ee8492fbbd080f927c36c95e4e";

async function cargarMonedas() {
    try {
        const respuesta = await fetch(urlAPI);
        const datos = await respuesta.json();

        if (!datos.success) {
            throw new Error(`Error en la API: ${datos.error?.info || "Clave API incorrecta o vencida"}`);
        }

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
        const respuesta = await fetch(urlAPI);
        const datos = await respuesta.json();

        if (!datos.success) {
            throw new Error(`Error en la API: ${datos.error?.info || "Clave API incorrecta"}`);
        }

        const tasaDe = datos.rates[de];
        const tasaA = datos.rates[a];

        if (!tasaDe || !tasaA) {
            throw new Error(`No se encontró la tasa de cambio para ${de} o ${a}`);
        }


        const tasaConversion = tasaA / tasaDe;
        const resultado = (cantidad * tasaConversion).toFixed(2);

        document.getElementById("resultado").innerText = `${cantidad} ${de} = ${resultado} ${a}`;
    } catch (error) {
        console.error("Error al convertir moneda:", error);
    }
}


document.addEventListener("DOMContentLoaded", cargarMonedas);
