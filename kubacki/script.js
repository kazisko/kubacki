document.getElementById("oblicz").addEventListener("click", function() {
    const nazwaFirmy = document.getElementById("nazwaFirmy").value;
    const pracownicy = parseInt(document.getElementById("pracownicy").value, 10);
    const odleglosc = parseFloat(document.getElementById("odleglosc").value);

    const uslugiCheckbox = document.querySelectorAll("#uslugi input[type='checkbox']:checked");
    let kosztNetto = 0;
    let kwotaVAT = 0;

    // Obliczanie kosztów usług
    uslugiCheckbox.forEach(usluga => {
        const cena = parseFloat(usluga.dataset.cena);
        const vat = parseFloat(usluga.dataset.vat);
        kosztNetto += cena;
        kwotaVAT += cena * (vat / 100);
    });

    // Uwzględnianie liczby dni
    let liczbaDni = pracownicy < 100 ? 1 : pracownicy <= 200 ? 2 : 3;
    kosztNetto *= liczbaDni;
    kwotaVAT *= liczbaDni;

    // Koszt dojazdu
    const kosztDojazdu = odleglosc * 2; // Przykładowo 2 zł/km
    kosztNetto += kosztDojazdu;

    // Koszt logistyki
    if (odleglosc > 300) {
        const kosztLogistyki = 300 * liczbaDni;
        kosztNetto += kosztLogistyki;
    }

    const kosztBrutto = kosztNetto + kwotaVAT;

    // Wyświetlenie wyników
    document.getElementById("kosztNetto").innerText = `Koszt netto: ${kosztNetto.toFixed(2)} zł`;
    document.getElementById("kwotaVAT").innerText = `Kwota VAT: ${kwotaVAT.toFixed(2)} zł`;
    document.getElementById("kosztBrutto").innerText = `Koszt brutto: ${kosztBrutto.toFixed(2)} zł`;

    document.getElementById("wynik").style.display = "block";
});
