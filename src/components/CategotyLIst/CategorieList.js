import './CategorieList.css';
import DropList from '../DropList/DropList';

const CategorieList = () => {
  const categoryList = ['Men', 'Women', 'Gifts', 'Decore', 'Accessories', 'Mats'];
  const subCategories = {
    'Men': ['Shirts', 'Pants', 'Winter Clothes', 'Pijamas', 'Sports'],
    'Women': ['Shirts', 'Pants', 'Hijab', 'Pijamas', 'Sports'],
    'Jeans': ['triko', 'alskj', 'alkjsf', 'alskfj'],
    'Gifts': ['For Him', 'For Her', 'For kids', 'Official'],
    'Decore': ['House', 'Office', 'Other'],
    'Accessories': ['Phone & PC', 'Keys', 'Cars', 'Other'],
    'Mats': ['Mats, Curtains', 'Carpets'],
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
