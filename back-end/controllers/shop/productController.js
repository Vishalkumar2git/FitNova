import Product from "../../models/ProductModel.js"



const filteredProducts = async (req, res) =>{
    try {
        const {category = [], brand = [], sortBy = "price-lowtohigh"} = req.query
        let filter = {};
        if(category.length ){
            filter.category = {
                $in: category.split(",")
            }
        }
        if(brand.length ){
            filter.brand = {
                $in: brand.split(",")
            }
        }
        let sort = {}
        switch (sortBy) {
            case 'price-lowtohigh':
                sort.price = 1;
                
                break;
                case 'price-hightolow':
                    sort.price = -1;
                    
                    break;
                    case 'title-atoz':
                        sort.title = 1;
                        
                        break;
                        case 'title-ztoa':
                            sort.title = -1;
                            
                            break;
        
            default:
                sort.price = 1;
                break;
        }


        const product = await Product.find(filter).sort(sort);
        res.status(200).json({
            success: true,
            data: product
            
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
        
    }
}

const productDetails = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        if(!product)  return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
        res.status(200).json({
            success: true,
            data: product
        })
           
        
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })  
    }
}

export { filteredProducts, productDetails };
