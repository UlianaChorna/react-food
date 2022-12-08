import { useState, useEffect } from "react";
import { getAllCategories } from "../api";
import Preloader from "../components/preloader";
import CategoriesList from "../components/categoriesList";
import Search from "../components/search";
import { useLocation,useHistory } from "react-router-dom";

const Home = () => {
    const [catalog,setCatalog] = useState([]);
    const [filteredCatalog,setFilteredCatalog] = useState([])

    const handleSearch = (str ) => {
        setFilteredCatalog(
            catalog.filter(item => item.strCategory.toLowerCase().includes(str.toLowerCase()))
        )
            push({
                pathname,
                search:`?search=${str}`
            })
    }
    const {pathname,search} = useLocation();
    const { push} = useHistory();

    useEffect(() => {
        getAllCategories().then(data =>{
            setCatalog(data.categories)
            setFilteredCatalog(search ? 
                data.categories.filter((item) => item.strCategory.toLowerCase().includes(search.split('=')[1].toLowerCase())) : data.categories)
        });
    },[search]);
    return ( 
        <>
        <Search cb={handleSearch}/>
        {!catalog.length ? 
        (<Preloader/>) :
        ( <CategoriesList catalog={filteredCatalog} />)}
        </>
     );
}
 
export default Home;