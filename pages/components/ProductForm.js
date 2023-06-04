import { useRouter } from "next/router";
import { useState } from "react";

export default function ProductForm({
    title:       existingTitle,
    description: existingDescription,
    price:       existingPrice,
}) {
    const [title,       setTitle]       = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price,       setPrice]       = useState(existingPrice || '');
    const [goToProducts,setToToProducts]= useState(false);
    const router                        = useRouter();
    
    async function createProduct(ev) {
        ev.preventDefault();
        const data = {title, description, price};
        await axios.post('/api/products', data);
        setToToProducts(true);
    }

    if(goToProducts) {
        router.push('/products');
    }

    return(
            <form onSubmit={createProduct}>
                <div className="flex-col">
                    <label>Product Name</label>
                    <input type    ="text" 
                        placeholder="enter product name"
                        value={title}
                        onChange={ev => setTitle(ev.target.value)}/>
                    
                    <label>Product Description</label>
                    <textarea placeholder="description"
                            value      ={description}
                            onChange   ={ev => setDescription(ev.target.value)}/>
                    
                    <label>Product Price(USD)</label>
                    <input type    ="text"
                        placeholder="price"
                        value      ={price}
                        onChange   ={ev => setPrice(ev.target.value)}/>

                    <button type="submit" className="btn-primary">
                        Save
                    </button>
                </div>
            </form>
    )
}