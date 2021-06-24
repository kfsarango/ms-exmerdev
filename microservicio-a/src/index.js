require('dotenv').config()
const app = require('./config/server')

app.listen(app.get('port'), () => {
    console.log('app running on port ', app.get('port'))
})