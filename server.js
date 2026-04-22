const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const path = require("path");

const app = express();

app.use(express.static("public"));

app.get("/consulta", async (req, res) => {
    try {
        const url = req.query.url;

        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const empresa = $("span.txtTopo").text();
        const cnpj = $("span.txtCNPJ").text();
        const valor = $("span.totalNumb").text();
        const chave = $("span.chave").text();
        const data = $("span.data").text();
        const numero = $("span.nota").text();

        res.json({
            empresa,
            cnpj,
            valor,
            chave,
            data,
            numero
        });

    } catch (e) {
        res.json({ erro: "Erro ao consultar SEFAZ" });
    }
});

app.listen(3000, () => console.log("Servidor rodando"));
