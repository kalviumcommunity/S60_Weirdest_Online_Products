const joi = require("joi")

const joiSchema = joi.object({
    Product: joi.string().required(),
    Customer_Ratings: joi.string().required(),
    Number_of_buyers_last_month: joi.number().required(),
    Price: joi.string().required(),
    Image_Link:joi.string().uri().required(),
    Product_Details:joi.string().required()
})

module.exports = joiSchema