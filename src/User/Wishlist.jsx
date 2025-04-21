import React, { useEffect, useState } from 'react';
import Card from '../Order/Card';
import menu from '../Appwrite/menu';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import service from '../Appwrite/config';
import Loading from '../Loading/Loading';

function Wishlist() {
  const wishlist = useSelector((state) => state.auth.wishData) || [];
  console.log(wishlist);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (wishlist.length === 0) {
      setLoading(false);
      return;
    }

    setLoading(true);
    menu
      .getWishlists(wishlist)
      .then((res) => {
        setDocuments(res.documents);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching wishlist:', error);
        setError('Failed to load wishlist');
        setLoading(false);
      });
  }, [wishlist]); // Effect depends on `wishlist` changing

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex justify-center text-3xl text-red-500">{error}</div>
    );
  }

  return (
    <div className="py-4 bg-white shadow-lg rounded-lg p-6 m-5 w-full max-w-screen-xl mx-auto xl:w-[1270px] h-full">
      {wishlist[0] === undefined ? (
        <div className="flex justify-center text-3xl font-serif">No wishlist</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
          {documents?.map((ele) => (
            <div className="m-2" key={ele.$id}>
              <Card
                src={menu.getFilePreiview(ele.imgid)}
                name={ele.name}
                description={ele.description}
                rating={ele.rating}
                id={ele.$id}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
