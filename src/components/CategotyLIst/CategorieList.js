import './CategorieList.css';
import DropList from '../DropList/DropList';

const CategorieList = () => {
  const categoryList = ['T-shirts', 'Pants', 'Jeans', 'Sweat-Shirts', 'Sweats', 'Shorts'];
  const subCategories = {
    'T-shirts': ['triko', 'alskfdj', 'alkjsf', 'alskfj'],
    'Pants': ['tro', 'alskfdj', 'alkjsf', 'alskfj'],
    'Jeans': ['triko', 'alskj', 'alkjsf', 'alskfj'],
    'Sweat-Shirts': ['triko', 'alskfdj', 'alf', 'alskfj'],
    'Sweats': ['triko', 'alskfdj', 'alkjsf', 'alj'],
    'Shorts': ['triko', 'alskfdj', 'alsf', 'alskfj'],
  };

  return (
    <>
      <div className="category-container">
        {categoryList.map((category) => {
          return  <DropList key={category} title={category} items={subCategories[category]} />
        })}
      </div>
    </>
  )
}
export default CategorieList;
