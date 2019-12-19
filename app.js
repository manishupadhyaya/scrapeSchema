const express = require('express')
const request = require('request')
const cheerio = require('cheerio')

const app = express();

app.get('/scrape', (req, res) => {
    request(`http://disabilityaffairs.gov.in/content/page/schemes.php`, (error, res, html) => {
        if (!error && res.statusCode == 200) {
            const $ = cheerio.load(html);
            $('#content-section').each((i,el)=>{
                // console.log("First",$(el).text())
                    $(el).find('#right-part-inner-page').each((i,el)=>{
                        $(el).find('.about-us-heading').each((i,el)=>{
                            $(el).find('li').each((i,el)=>{
                                console.log($(el).find('a').attr('href'))
                            })
                    })
            });
        })
        }
})
})

var port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})