import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState }  from "react";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
    _id,
    title:       existingTitle,
    description: existingDescription,
    price:       existingPrice,
    images:      existingImages,
    category:    existingCategory
}) {
    const [category,    setCategory]    = useState(existingCategory    || '');
    const [title,       setTitle]       = useState(existingTitle       || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price,       setPrice]       = useState(existingPrice       || '');
    const [images,      setImages]      = useState(existingImages      || []);
    const [goToProducts,setToToProducts]= useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [categories,  setCategories ] = useState([]);
    const router                        = useRouter();
    
    useEffect(() => {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        });
    }, []);

    async function saveProduct(ev) {
        ev.preventDefault();
        const data = {title, description, price, images, category};

        if(_id) {
            await axios.put('/api/products', {...data, _id});
        } else {
            await axios.post('/api/products', data);
        }

        setToToProducts(true);
    }

    if(goToProducts) {
        router.push('/products');
    }

    async function uploadImages(ev) {
        const files = ev.target?.files;

        if(files?.length > 0) {
            setIsUploading(true);

            const data = new FormData();
            for(const file of files) {
                data.append("file", file);
            }
            
            const res = await axios.post('/api/upload', data);
            setImages(oldImages => {
                return [...oldImages, ...res.data.links];
            });

            setIsUploading(false);
        }
    }

    function updateImagesOrder(images) {
        setImages(images);
    }

    return(
            <form onSubmit={saveProduct}>
                <div className="flex-col">
                    <label>Product Name</label>
                    <input type    ="text" 
                        placeholder="enter product name"
                        value={title}
                        onChange={ev => setTitle(ev.target.value)}/>
                    
                    <label>Category</label>
                    <select value={category} onChange={ev => setCategory(ev.target.value)}>
                        <option value="">Uncategorized</option>
                        
                        {categories.length > 0 && categories.map(c => (
                            <option value={c._id}>
                                {c.name}
                            </option>
                        ))}
                    </select>

                    <label>
                        Images
                    </label>
                    <div className="mb-2 flex flex-wrap gap-1">
                        <ReactSortable list={images} className="flex flex-wrap gap-1" setList={updateImagesOrder}>
                            {!!images?.length && images.map(link => (
                                <div key={link} className="h-24">
                                    <img src={link} alt="" className="rounded-lg"/>
                                </div>
                            ))}
                        </ReactSortable>
                        {isUploading && (
                            <div className="h-24 p-1 flex items-center rounded-lg">
                                <Spinner />
                            </div>
                        )}
                        
                        <label className="w-24 h-24 cursor-pointer text-center flex items-center justify-center textr-sm gap-1 text-gray-600 rounded-lg bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>

                            <div>
                                Upload
                            </div>

                            <input type='file' onChange={uploadImages} className="hidden" />
                        </label>
                    </div>
                    

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