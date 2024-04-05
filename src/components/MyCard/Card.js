import './Card.css'
import { FaHeart } from "react-icons/fa";
const MyCard = () => {
  return (
    <div className='main-container'>
    <div className='box'>
      <div className='box-2'>
        <div className='section' />
        <div className='box-3'>
          <span className='text'>100</span>
          <div className='wrapper' />
        </div>
        <FaHeart className='pic'/>
      </div>
      <div className='pic-2' />
    </div>
    <div className='section-2'>
      <span className='text-2'>"The RenaiXance Rising...</span>
      <div className='section-3'>
        <span className='text-3'>BSC</span>
        <div className='wrapper-2' />
      </div>
    </div>
    <div className='box-4'>
      <div className='wrapper-3'>
        <div className='group'>
          <div className='wrapper-4'>
            <span className='text-4'>Ilustrador</span>
            <span className='text-5'>SalvadorDali</span>
          </div>
          <div className='img' />
        </div>
        <div className='box-5'>
          <span className='text-6'>Price</span>
          <span className='text-7'>2000.00 DZD</span>
        </div>
      </div>
      <div className='group-2'>
        <div className='wrapper-5'>
          <div className='box-6' />
          <span className='text-8'>Ofertar</span>
          <div className='box-7'>
            <div className='img-2' />
          </div>
        </div>
      </div>
    </div>
    <div className='box-8' />
  </div>

  );
};

export default MyCard;