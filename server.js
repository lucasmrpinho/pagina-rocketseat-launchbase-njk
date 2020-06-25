const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const cards = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    noCache: true
})

server.get("/", function(req,res){
    server.use(function(req, res) {
        res.status(404).render("not-found")
        })
    const about = {
        logo_url: "https://rocketseat.gallerycdn.vsassets.io/extensions/rocketseat/rocketseatreactnative/3.0.1/1588456740326/Microsoft.VisualStudio.Services.Icons.Default",
        nome: "Rocketseat",
        tecnologias: [
            "JavaScript",
            "HTML",
            "CSS",
            "ReactJS",
            "NodeJS",
            "React Native"
        ],
        texto: "As melhores tecnologias em programação, direto ao ponto e do jeito certo.",
        links: [
            {url: "/", name: "Github"},
            {url: "/", name: "Instagram"},
            {url: "/", name: "Facebook"},
        ]
    }
    return res.render('about', { about })
})

server.get("/cursos", function(req,res){
    server.use(function(req, res) {
        res.status(404).render("not-found")
      })
    return res.render('cursos',{courses: cards})
 })


 server.get("/card", function (req,res){
     server.use(function(req,res){
         res.status(404).render("not-found")
     })

     const id = req.query.id
     
     const card = cards.find(function(card){
         if (card.id == id){
            return true
         }
     })
     
     if (!card){
         return res.send("Page not found!")
     }

     return res.render('card', { card: card })
 })

server.listen(5000, () =>{
    console.log('server is running')
})


