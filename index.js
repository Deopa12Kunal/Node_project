const fs = require('fs');
const http = require('http');
const url = require('url');
//importing modules 
 const replaceTemplate = require('./modules/replaceTemplate');
// todo: SERVER

const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/devdata/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    // console.log(req.url);
    const{query,pathname} = url.parse(req.url, true);
    // const pathName = req.url;
    //Overview Page 
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'content-type': 'text/html' });
        const cardHtml = dataObj.map(el =>
            replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardHtml);

        res.end(output);
//product page
    } else if (pathname === '/product') {
        //todo way to reteive an element based on query string
res.writeHead(200, { 'content-type': 'text/html' });
const  product = dataObj[query.id]; 
const output = replaceTemplate(tempProduct,product);
        // console.log(query); 
        res.end(output);
    } else if (pathname === '/api') {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(data);
    } else {
        res.writeHead(404, {
            'content-type': 'text/html',
            'my-own-header': "this is my header"
        });
        res.end('<h1>Page not found!!!!!!!!!!1</h1>');
    }
});
server.listen(8001, '127.0.0.1', () => {
    console.log('Listening to request on port 8000');
});
