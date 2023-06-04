import { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useRouter } from "next/router";


export default function NewProduct() {
    const [title,       setTitle]       = useState('');
    const [description, setDescription] = useState('');
    const [price,       setPrice]       = useState('');
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
        <Layout>
            <form onSubmit={createProduct}>
                <div className="flex-col">
                    <h1>   New Product</h1>

                    <label>Product Name</label>
                    <input type="text" 
                        placeholder="enter product name"
                        value={title}
                        onChange={ev => setTitle(ev.target.value)}/>
                    
                    <label>Product Description</label>
                    <textarea placeholder="description"
                            value      ={description}
                            onChange   ={ev => setDescription(ev.target.value)}/>
                    
                    <label>Product Price(USD)</label>
                    <input type       ="text"
                        placeholder="price"
                        value      ={price}
                        onChange   ={ev => setPrice(ev.target.value)}/>

                    <button type="submit" className="btn-primary">
                        Save
                    </button>
                </div>
            </form>
        </Layout>
    )
}