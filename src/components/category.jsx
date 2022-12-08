import { useParams,useHistory } from "react-router-dom";
import { getFilterCategories } from "../api";
import { useEffect,useState } from "react";
import Preloader from "./preloader";
import MealsList from "./mealsList";



const Category = () => {
    const {name} = useParams();
    const[meals,setMeals]  = useState([]);
    const {goBack} = useHistory()
    useEffect(() => {
        getFilterCategories(name).then(data =>
            setMeals(data.meals))
    },[name])

    return ( <>
       <button className="btn" onClick={goBack}>Go Back </button>
    {!meals.length ? <Preloader/> : <MealsList meals={meals} /> }
    </> );
}
 
export default Category;