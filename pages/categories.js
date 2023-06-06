import { useEffect, useState } from 'react';
import Layout from './components/Layout';
import axios from 'axios';
import { withSwal } from 'react-sweetalert2';
import LoadingOverlay from 'react-loading-overlay';

function Categories({swal}) {
    const [name,           setName]           = useState('');
    const [categories,     setCategories]     = useState([]);
    const [parentCategory, setParentCategory] = useState('');
    const [editedCategory, setEditedCategory] = useState(null);
    const [loadingTable,   setLoadingTable]   = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    function fetchCategories() {
        setLoadingTable(true);
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        }).finally(() => {
            setLoadingTable(false);
        });
    }

    function editCategory(category) {
        setEditedCategory(category);
        setParentCategory(category.parent?._id);
        setName          (category.name);
    }

    function deleteCategory(category) {
        swal.fire({
            title:              'Вы уверены?',
            text:               `Вы действительно хотите удалить ${category.name}?`,
            showCancelButton:   true,
            cancelButtonText:  'Нет',
            confirmButtonText:  'Да, хочу!',
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

    function resetForm() {
        var swalText = editedCategory
         ? `Вы дейстительно хотите сбросить форму для категории ${editedCategory.name}`
         : `Вы дейстительно хотите сбросить форму?`;

        swal.fire({
            title:              'Вы уверены?',
            text:               swalText,
            showCancelButton:   true,
            cancelButtonText:  'Нет',
            confirmButtonText:  'Да, хочу!',
            confirmButtonColor: "#d55",
        }).then (result => {
            setEditedCategory(null);
            setParentCategory('');
            setName('');
        }).catch(error => {

        });
    }

    return (
        <LoadingOverlay active={loadingTable} spinner text="Загружаем данные из базы данных...">
            <Layout>
                <h1 className='image-back-div'>
                    <span className='image-back-div-text'>
                        lastdisco://контроллер_категорий
                    </span>
                </h1>

                <label>
                    { editedCategory ? `Редактировать категорию ${editedCategory.name}` : "Создать новую категорию"}
                </label>

                <h2>
                    Перед вами форма категорий, для того чтобы
                    добавить категорию впишите ее название в
                    поле ввода(таким образом вы создаете&nbsp;
                    <span>ВЕДУЩУЮ</span> категорию),
                    затем вы опционально можете выбрать ее&nbsp;
                    <span>ВЕДОМУЮ</span> категорию. <br /><br />
                    
                    <span>ВЕДОМАЯ</span> категория это любая
                    категория с которой&nbsp;
                    <span>может быть</span>(а может
                    и нет) связана 
                    ее ведомая подкатегория.<br />

                    <span>ВЕДОМАЯ</span> категория это
                    любая категория у которой есть родитель
                    (уже существующая категория), например:&nbsp;
                    <span>ведущая</span> - глина,&nbsp;
                    <span>ведомая</span>&nbsp; - жабы
                </h2>

                <form onSubmit={saveCategory} className='flex gap-1' id='category-form'>
                    <input type='text' placeholder={'Наример: картина, глина, брелки...'} value={name} className='mb-0'
                        onChange={ev => setName(ev.target.value)} />
                    
                    <select className='mb-0' onChange={ev => setParentCategory(ev.target.value)} value={parentCategory}>
                        <option value="">
                            нет ведомой категории
                        </option>
                        
                        {categories.length > 0 && categories.map(category => (
                            <option value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    <button type='reset' className='btn-primary py-1 mt-4 bg-gray-700' onClick={resetForm}>
                        сбросить
                    </button>

                    <button type='submit' className='btn-primary py-1 mt-4 bg-green-800'>
                        сохранить
                    </button>
                </form>


                <div>
                    <div className='mt-20'>
                        <label>
                            Таблица категорий
                        </label>
                    </div>
                
                    <table className="basic mt-4">
                        <thead>
                            <tr>
                                <td>
                                    категория_ведущая
                                </td>

                                <td>
                                    категория_ведомая
                                </td>

                                <td>
                                    
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
                                        Редактировать
                                    </button>
    
                                    <button onClick={() => deleteCategory(category)} className='btn-primary text-red-400'>
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
</table>
            
            </div>
            </Layout>
        </LoadingOverlay>
    )
}

export default withSwal(({swal}, ref) => (
    <Categories swal={swal} />
));