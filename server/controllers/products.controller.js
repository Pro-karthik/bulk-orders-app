const { PrismaClient } =  require('@prisma/client')
const prisma = new PrismaClient()

exports.addProducts = async (req, res) => {
    try{
       const {name,price,imageUrl} = req.body
        const product = await prisma.product.create({
            data:{
                name,
                price,
                imageUrl
            }
        })
        res.status(201).json(product)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: 'Internal server error'})
    }
}
