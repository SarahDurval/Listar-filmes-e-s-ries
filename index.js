const express = require("express")
const app = express()

app.use(express.json())

// "Banco de dados" em memória
let filmes = [
    {
        id: 1,
        title: "Como Eu Era Antes de Você",
        description: "narra a história de Louisa Clark, uma jovem peculiar contratada para cuidar de Will Traynor...",
        genre: "Romance/Drama",
        releaseYear: 2016,
        image: "https://m.media-amazon.com/images/M/MV5BMjQ4ZGMyZjYtNDYwNC00MmUyLWE4ZWQtM2ViMTQ0OTc1M2U1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
    }
]

let series = [
    {
        id: 1,
        title: "Suits",
        description: "Advogados em Nova York enfrentando casos complexos",
        genre: "Drama",
        releaseYear: 2011,
        image: "https://m.media-amazon.com/images/M/MV5BYmE4MmNjZjUtNTEyNy00NTZiLWE4NTktYjM2NjBhYzQ1N2IzXkEyXkFqcGc@._V1_.jpg"
    }
]


// Listar todos os filmes com filtro por genero
app.get("/filmes", (req, res) => {
    const { genre } = req.query
    if (genre) {
        return res.json(filmes.filter(f => f.genre() === genre()))
    }
    return res.json(filmes)
})

//Bcar filme por id
app.get("/filmes/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const filme = filmes.find(f => f.id === id)

    if (!filme) {
        return res.status(404).json({ error: "Filme não encontrado😭" })
    }
    return res.json(filme)
})

// Criar filme
app.post("/filmes", (req, res) => {
    const { title, genre, description, image, releaseYear } = req.body
 
    if (!title || !genre || !description || !image || !releaseYear) {
        return res.status(400).json({ mensagem: "Título inválido" })
    }
 
    const novafilme = {
        id: filmes.length + 1,
        title: title,
        genre: genre,
        description: description,
        releaseYear: releaseYear,
        image: image
    }
 
   filmes.push(novafilme)
    return res.status(201).json(novafilme)
})


// Listar todas as séries com filtro por genero
app.get("/series", (req, res) => {
    const { genre } = req.query
    if (genre) {
        return res.json(series.filter(s => s.genre() === genre()))
    }
    return res.json(series)
})

// Buscar serie por id
app.get("/series/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const serie = series.find(s => s.id === id)

    if (!serie) {
        return res.status(404).json({ error: "Série não encontrada😭" })
    }
    return res.json(serie)
})

// Criar serie
app.post("/series", (req, res) => {
    const { title, genre, description, image, releaseYear } = req.body
 
    if (!title || !genre || !description || !image || !releaseYear) {
        return res.status(400).json({ mensagem: "Título inválido" })
    }
 
    const novaSerie = {
        id: series.length + 1,
        title: title,
        genre: genre,
        description: description,
        releaseYear: releaseYear,
        image: image
    }
 
    series.push(novaSerie)
    return res.status(201).json(novaSerie)
})

// Acessar Servidor
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000")
})
