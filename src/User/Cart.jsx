import React, { useEffect, useState } from 'react';
import Card from '../Order/Card';
import menu from '../Appwrite/menu';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import service from '../Appwrite/config';
import Loading from '../Loading/Loading';

function Cart() {
  const cartlist = useSelector((state) => state.auth.cartData);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cartlist.length === 0) {
      setLoading(false);
      return;
    }

    setLoading(true);
    menu.getWishlists(cartlist)
      .then((res) => {
        setDocuments(res.documents);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching wishlist:', error);
        setError('Failed to load wishlist');
        setLoading(false);
      });
  }, [cartlist]);  // Effect depends on `wishlist` changing
 
  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return <div className="flex justify-center text-3xl text-red-500">{error}</div>;
  }
 

  return (
    <div className="grid grid-row-2 grid-cols-2   py-4 bg-white shadow-lg rounded-lg p-6 m-5 w-full">
      {cartlist[0]==undefined?( <div className="flex justify-center text-3xl font-serif">No cart item</div>): (
      
        documents.map((ele) => (
          <div className="m-2" key={ele.$id}>
            <Card
              src={menu.getFilePreiview(ele.imgid)}
              name={ele.name}
              description={ele.description}
              rating={ele.rating}
              id={ele.$id}
            />
          </div>
        )))
       
       
      }
    </div>
  );
}

export default Cart