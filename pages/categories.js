import { useEffect, useState } from 'react';
import Layout from './components/Layout';
import axios from 'axios';
import { withSwal } from 'react-sweetalert2';

function Categories({swal}) {
    const [name,           setName]           = useState('');
    const [categories,     setCategories]     = useState([]);
    const [parentCategory, setParentCategory] = useState('');
    const [editedCategory, setEditedCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    function fetchCategories() {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        });
    }

    function editCategory(category) {
        setEditedCategory(category);
        setParentCategory(category.parent?._id);
        setName          (category.name);
    }

    function deleteCategory(category) {
        swal.fire({
            title:              'Are you sure?',
            text:               `Do you really want to delete ${category.name}?`,
            showCancelButton:   true,
            cancelButtonTitle:  'Cancel',
            confirmButtonText:  'Yes, delete it!',
            confirmButtonColor: "#d55",
        }).then (async result => {
            if(result.isConfirmed) {
                const {_id} = category;
                await axios.delete('/api/categories?_id='+_id);
                fetchCategories();
            }
        }).catch(error => {

        });
    }

    async function saveCategory(ev) {
        ev.preventDefault();

        const data = {name, parentCategory};
        if(editedCategory) {
            data._id = editedCategory._id;
            await axios.put ('/api/categories', data);
            setEditedCategory(null);
        } else {
            await axios.post('/api/categories', data); 
        }
        
        setName('');
        fetchCategories();
    }

    return (
        <Layout>
            <h1>
                Categories
            </h1>

            <label>
                { editedCategory ? `Edit category  ${editedCategory.name}` : "Create new category"}
            </label>

            <form onSubmit={saveCategory} className='flex gap-1'>
                <input type='text' placeholder={'Category name'} value={name} className='mb-0'
                       onChange={ev => setName(ev.target.value)} />
                
                <select className='mb-0' onChange={ev => setParentCategory(ev.target.value)} value={parentCategory}>
                    <option value="">
                        No parent category
                    </option>
                    
                    {categories.length > 0 && categories.map(category => (
                        <option value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <button type='submit' className='btn-primary py-1'>
                    Save
                </button>
            </form>
            
            <table className="basic mt-4">
                <thead>
                    <tr>
                        <td>
                            Category name
                        </td>

                        <td>
                            Parent Category
                        </td>

                        <td>
                            Action
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map(category => (
                        <tr key={category.name}>
                            <td>
                                {category?.name}
                            </td>

                            <td>
                                {category?.parent?.name}
                            </td>

                            <td>
                                <button onClick={() => editCategory(category)} className='btn-primary mr-1'>
                                    Edit
                                </button>

                                <button onClick={() => deleteCategory(category)} className='btn-primary'>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}

export default withSwal(({swal}, ref) => (
    <Categories swal={swal} />
));