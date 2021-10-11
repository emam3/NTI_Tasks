const express = require('express')
const app = express()
const path = require('path')
const https = require('https')
const hbs = require('hbs')
    // const API_Link = 'https://jsonplaceholder.typicode.com/posts/'

const staticDir = path.join(__dirname, '../')
const viewDir = path.join(__dirname, '../design/views')
const partialFilesDir = path.join(__dirname, '../design/layouts')

app.use(express.static(staticDir))
app.set('view engine', 'hbs')
app.set('views', viewDir)
hbs.registerPartials(partialFilesDir)

// getting data from api
let apiPostsData
let apiCommentsData

// create api link function
API_Link = (dirSent) => {
    let link = `https://jsonplaceholder.typicode.com/${dirSent}/`
    return link
}

// fetching posts
let req = https.request(API_Link("posts"), (res) => {
    let finalData = ''
    res.on('data', (partOfData) => {
        finalData += partOfData
    })
    res.on('end', () => {
        apiPostsData = JSON.parse(finalData)
    })
})
req.on('error', (err) => {
    console.log(err)
})
req.end()


// fetching comments
let req_comments = https.request(API_Link("comments"), (res) => {
    let finalData = ''
    res.on('data', (partOfData) => {
        finalData += partOfData
    })
    res.on('end', () => {
        apiCommentsData = JSON.parse(finalData)
    })
})

req_comments.on('error', (err) => {
    console.log(err)
})
req_comments.end()


//sending data of posts to be handeled
app.get('/posts', (req, res) => {
    res.render('posts.hbs', { apiPostsData })
})


//sending data of comments to be handeled
app.get('/comments', (req, res) => {
    res.render('comments.hbs', { apiCommentsData })
})

app.listen(3000)