const mongoose = require('mongoose')

// Subdocument schema for 'desc'
const descSchema = new mongoose.Schema({
    specifications: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
        required: true,
    },
}, { _id: false });//using id=false to disbale automatic id generation in mongoDB

// Subdocument schema for 'attrs'
const attrsSchema = new mongoose.Schema({
    design: {
        type: String,
        required: true, //values where user needs to click to see changes in variation
    },
    imgs: {
        type: String,
        required: true,
    },
}, { _id: false });//using id=false to disbale automatic id generation in mongoDB

// Subdocument schema for 'design'
const designSchema = new mongoose.Schema({//it consist of all the feilds that inside a variation
    product_id: {
        type: String,
        required: [true,],//validation method
    },

    labourPerFloor: {
        type: Number,
        required: [true,],//validation method
    },

    applicability: {
        type: Number,
        required: [true,],//validation method
    },

    loadingUnloadingPrice: {
        type: Number,
        required: [true,],//validation method
    },
    price: {
        type: Number,
        required: [true,],//validation method
    },

    discounted_price: {
        type: Number,
        required: [true,],//validation method
    },

    discounted_percent: {
        type: Number,
        required: [true,],//validation method
    },

    desc: descSchema, //calling function for desc bcz desc is dynamic
    attrs: attrsSchema, //calling function for design and image inside of attrs bcz attrs is dynamic
}, { _id: false });

// Main schema for 'vars'
const varsSchema = new mongoose.Schema({
    design: [designSchema], // Array of designs
}, { _id: false });


const productSchema = mongoose.Schema(//basic product model consist of all parameter including vars
    {
        group: {
            type: String,
            required: [true,],//validation method
        },


        subgroup: {
            type: String,
            required: [true,],//validation method  
        },

        brand: {
            type: String,
            required: [true,],//validation method
        },

        product_id: {
            type: String,
            required: [true,],//validation method
        },

        plyUnit: {
            type: Number,
            required: [true,],//validation method
        },

        labourPerFloor: {
            type: Number,
            default: 0,
        },

        applicability: {
            type: Number,
            required: [true,],//validation method
        },

        loadingUnloadingPrice: {
            type: Number,
            default: 0,
        },

        product_name: {
            type: String,
            required: [true,],//validation method
        },

        ProductDescription: {
            type: String,
            required: [true,],//validation method
        },


        category: {
            type: String,
            required: [true,],//validation method
        },

        subcategory: {
            type: String,
            required: [true,],//validation method
        },

        attrs: {
            imgs: {
                type: [String], // an array of strings image
                required: [true, "Please provide at least one image URL"],
            }
        },

        averageRating: {
            type: Number,
            required: [true,],
            default: 0
        },

        price: {
            type: Number,
            required: [true,],//validation method
        },

        discounted_price: {
            type: Number,
            required: [true,],//validation method
        },

        discounted_percent: {
            type: Number,
            required: [true,],//validation method
        },

        desc: descSchema,//desc/specification of product model is also dynamic thats why calling the same function that we called in vars.

        vars: varsSchema,//declared vars before productModel and vars is nested of attrs and desc


        //this two are made for future purpose
        // NumberOfItemInStock: {
        //     type: Number,
        //     required: [true,],//validation method
        //     default: 0
        // },

        //   StockINorOUT: {
        //     type: Boolean,
        //     required: [true,],//validation method
        // }


    },
    {
        timestamps: true//it will give time and date everytime you add data 
    }
)


const Product = mongoose.model('Product', productSchema);

module.exports = Product;