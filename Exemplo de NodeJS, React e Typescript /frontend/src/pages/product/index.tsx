import { Header } from '../../components/Header'
import styles from './styles.module.scss'
import Head from 'next/head'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { FiUpload } from 'react-icons/fi'
import { ChangeEvent, FormEvent, useState } from 'react'
import { setupAPIClient } from '../../services/api'
import { toast } from 'react-toastify'

type ItemProps ={
    id: string;
    name: string;
}

interface CategoryProps{
    categoryList: ItemProps[];
} 


export default function Product({categoryList}: CategoryProps) {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null);

    const [categories, setCategories] = useState(categoryList || []);
    const [categorySelected, setCategorieSelected] = useState(0);

    //Para seleçao de imagens 
    function handleFile(e: ChangeEvent<HTMLInputElement>){
        if(!e.target.files){
            return
        }

        const image = e.target.files[0];

        if(!image){
            return;
        }

        if(image.type === 'image/png' || image.type === 'image/jpeg'){
            
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(e.target.files[0]))        
        }
    }

    //Quando seleciona uma nova categoria na lista
    function handleChangeCategory(e){
        setCategorieSelected(e.target.value)
    }


    //Registrando o produto
    async function handleRegister(e: FormEvent) {
        e.preventDefault();
        try{
            const data = new FormData();

            if(name === ''|| price === ''|| description === '' || imageAvatar === null){
                toast.error("Preencha todos os campos.")
                return;
            }

            data.append('name', name);
            data.append('price', price);
            data.append('description', description);
            data.append('category_id', categories[categorySelected].id);
            data.append('file', imageAvatar);

            const apiClient = setupAPIClient();
            await apiClient.post('/product', data);
            toast.success("Cadastro realizado com sucesso.")

        }
        catch(err){
            toast.error("Ops! Erro ao cadastrar.")
        }

        setName('');
        setPrice('');
        setDescription('');
        setImageAvatar(null);
        setAvatarUrl('');
        
    }



    return (
        <>
            <Head>
                <title>Novo Produto</title>
            </Head>
            <div>
                <Header />

                <main className={styles.container}>
                    <h1>Novo Produto</h1>


                    <form className={styles.form} onSubmit={handleRegister}>

                        <label className={styles.labelAvatar}>
                            <span><FiUpload size={25} color="#FFF" /></span>
                            <input type='file' accept='image/png, image/jpeg' onChange={handleFile} />

                            {avatarUrl && (<img
                                className={styles.preview}
                                src={avatarUrl}
                                alt='Foto'
                                width={250}
                                height={250} />)}
                        </label>

                        <select value={categorySelected} onChange={handleChangeCategory}>
                            {categories.map((item, index)=>{
                                return(
                                    <option key={item.id} value={index}>
                                        {item.name}
                                    </option>
                                )
                            })}

                        </select>

                        <input
                            type='text'
                            placeholder='Nome do produto'
                            className={styles.input} 
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            />

                        <input
                            type='text'
                            placeholder='Preço do produto'
                            className={styles.input}
                            value={price}
                            onChange={(e)=>setPrice(e.target.value)} 
                            />

                        <textarea 
                        placeholder='Descrição do produto'
                        className={styles.input} 
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        />

                        <button className={styles.buttonAdd} type='submit'>Cadastrar</button>

                    </form>

                </main>
            </div>

        </>

    )
}

export const getServerSideProps = canSSRAuth(async (context) => {

    const apiClient = setupAPIClient(context);

    const response = await apiClient.get('/listcategory')


    return {
        props: {
            categoryList: response.data
        }
    }
})