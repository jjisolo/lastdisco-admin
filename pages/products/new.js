import Layout from "../components/Layout";

export default function NewProduct() {
    
    return(
        <Layout>
            <div className="flex-col">
                <h1>
                    New Product
                </h1>
                
                <input type="text" placeholder="enter product name" />
                <textarea placeholder="description"/>
                <input type="text" placeholder="price" />
            </div>
        </Layout>
    )
}