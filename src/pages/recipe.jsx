import { useParams,useHistory } from "react-router-dom";
import { getMealById } from "../api";
import { useState,useEffect } from "react";
import Preloader from "../components/preloader";


const Recipe = () => {
    const {id} = useParams();
    const[recipe,setRecipe] = useState([]);
    const {goBack} = useHistory()
    useEffect(() => {
        getMealById(id).then(data => 
            setRecipe(data.meals[0]))
    },[id] )
    return ( 
    <>
    <button className="btn" onClick={goBack}>Go Back </button>
    {!recipe.idMeal ? <Preloader/> : (
        <div className="recipe">
            <img src={recipe.strMealThumb} alt={recipe.strMeal } />
            <h1>{recipe.strMeal }</h1>
            <h6>Category:{recipe.strCategory}</h6>
            { recipe.srtArea ? <h6>Country:{recipe.srtArea}</h6> : null}
            <p>{recipe.strInstructions}</p>
            <table className="centered">
                <thead>
                    <tr>
                        <th>Ingredient</th>
                    <th>Measure</th></tr>
                    </thead>
                    <tbody>
                       { Object.keys(recipe).map((key) => {
                        if(key.includes('Ingredient') && recipe[key]){
                            return (

                                <tr key ={key} >
                                    <td>{recipe[key]}</td>
                                    <td>{recipe[`strMeasure${key.slice(13)}`]
                                        }</td>
                                </tr>
                            )
                        }
                       })}
                    </tbody>
                
            </table>
            {recipe.strYoutube ? (
                <div className="row">
                    <h5>Video Recipe</h5>
               
               
                 <iframe  src={`https://www.youtube.com/embed/${recipe.strYoutube.slice(-11)}`} title={id} 
                   allowfullscreen></iframe>
                </div>
            ) : null}

        </div>
        )}
    </> );
}
 
export default Recipe;