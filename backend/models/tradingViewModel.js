const mongoose = require('mongoose')

const tradingViewSchema = mongoose.Schema({
    id: {
        type: String, 
        required: [true, 'No id for PK'],
        unique: true
    },
    exchange: {
        type: String, 
        required: [true, 'No exhange'],
    },
    fullExchange: {
        type: String, 
        required: [true, 'No full exchange name']
    },
    screener: {
        type: String, 
        required: [true, 'No asset name'],
        
    },
    symbol: {
        type: String, 
        required: [true, 'No symbol name'],
        
    },
    description: {
        type: String, 
        required: [false, 'No description'],
        
    },
    type: {
        type: String, 
        required: [true, 'No type name'],
        
    },
    getTA: {
        type: String, 
        required: [false, 'No function applied'],
        
    },
},
{
    timestamps: true,
}
)

module.exports = mongoose.model('tradingView', tradingViewSchema)