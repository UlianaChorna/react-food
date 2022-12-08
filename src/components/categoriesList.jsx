import CategoryItem from "./categoriesItem";


const CategoriesList  = ({catalog =[]}) => {
    
    return ( 
        <>
     
    <div className="list">
        {catalog.map(el =>
            <CategoryItem key={el.idCategory} {...el} />)}
    </div>
    </>
     );
}
 
export default CategoriesList;