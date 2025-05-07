const mongoose = require("mongoose");

const pdfSchema = mongoose.Schema({
    filename: String,       
    data: Buffer,      
    date:String,
    contentType: String,    
    uploadDate: {            
        type: Date,
        default: Date.now
    },
    user: {                 
        type: mongoose.Schema.Types.ObjectId,
        ref: "prof"
    }
});

module.exports = mongoose.model("pdf", pdfSchema);
