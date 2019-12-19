const express = require('express')
const request = require('request')
const cheerio = require('cheerio')
const mongoose = require('mongoose')
const app = express();

//
const Data = require('./models/Data')
//

const db = 'mongodb://manishupadhyaya:manish12345@ds159273.mlab.com:59273/pragmatic'
mongoose.connect(db, {
        useNewUrlParser: true
    })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.get('/scrape', (req, response) => {

    Data.find({},(err,data)=>{
        if(err)
        {
            return res.status(400).json({
                message: "Error requesting database"
            })
        }
        console.log(data)
        if(data)
        {
            console.log("Hello")
            request(`http://disabilityaffairs.gov.in/content/page/schemes.php`, (error, res, html) => {
            let t = []
            let name = ''
            let link = ''
            if (!error && res.statusCode == 200) {
                const $ = cheerio.load(html);
                $('#content-section').each((i,el)=>{
                    // console.log("First",$(el).text())
                        $(el).find('#right-part-inner-page').each((i,el)=>{
                            $(el).find('.about-us-heading').each((i,el)=>{
                                $(el).find('li').each((i,el)=>{
                                    name = $(el).find('a').text()
                                    link = $(el).find('a').attr('href')
                                    t.push({name,link})
                                })
                                const data = new Data({scraped:JSON.stringify(t)})
                                data.save((err)=>{
                                    if(err)
                                    {
                                        return response.status(400).send({
                                            message:"Could not save into database"
                                        })
                                    }
                                })
                                response.json(t)
                        })
                });
            })
            }
        })
        }
    })

})

var port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})