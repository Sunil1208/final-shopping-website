const stripe = require('stripe')("sk_test_6haJ7lXzh6txZTRz3D6RAdKE00DaaJ3Aw4")
const uuid = require('uuid/v4')
exports.makePayment = (req, res) => {
    const {products,token} = req.body
    console.log(`PRODUCTS : ${products}`)

    let amount =0
        products.map((product, index) => {
            amount = amount+ product.price
        });

         let shippingCharges = parseFloat(0.03*amount);
         let tax = parseFloat(0.05*amount);
         let total = shippingCharges+tax+amount
         console.log(`Total charges : ${total}`)

        const idempotencyKey = uuid()

        return stripe.customers.create({
            email: token.email,
            source: token.id,

        }).then( customer => {
            stripe.charges.create({
                amount: total*100,
                currency: 'usd',
                customer: customer.id,
                receipt_email: token.email,
                shipping: {
                    name: token.card.name,
                    address: {
                        line1: token.card.address_line1,
                        line2: token.card.address._line2,
                        city: token.card.address_city,
                        country: token.card.address_country,
                        postal_code: token.card.address_zip
                    }
                }
            },{idempotencyKey})
            .then(result => res.status(200).json(result))
            .catch( err => console.log(err))
        })
}