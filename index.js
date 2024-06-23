import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// Define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
const port = 3000;

app.use(bodyParser.json())

app.set('view engine', 'ejs');

app.get('/createpost', (req, res) => {
  res.render('createPost');
});

app.get('/posts', (req, res) => {
  const filePath = 'posts.json';

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Server error');
    }
const posts = data ? JSON.parse(data) : [];
    res.json(posts);
  });
    
});
/* app.post("/post", (req, res) => {
  const post = req.body;
  console.log(post);
  res.status(200).json({succes:true});
 }); */

app.post('/post', (req, res) => {
  const postData = req.body;
  const filePath = "posts.json"

  fs.readFile(filePath, 'utf8', (err, data) => {
    let json = data ? JSON.parse(data) : [];
    json.push(postData);

    fs.writeFile(filePath, JSON.stringify(json, null, 2), 'utf8', (err) => {
      if (err) {
        return res.status(500).send('Server error');
      }
      res.send('Post received and saved');
    });
  });
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });