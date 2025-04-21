import React, { useEffect, useState } from 'react';
import Card from '../Order/Card';
import menu from '../Appwrite/menu';
import { useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Cart() {
  const cartlist = useSelector((state) => state.auth.cartData);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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
        setError('Failed to load cart items');
        setLoading(false);
      });
  }, [cartlist]);

  const order_submit = () => {
    if (cartlist.length === 0) {
      toast.error("No cart item to order", {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
      });
    } else {
      const url_param = documents.slice(0, 4)
        .map((ele) => `${ele.$id}${ele.name}`)
        .join('&');

      navigate(`/order-information/${url_param}`, {
        state: {
          url_param: url_param,
          data: documents
        }
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="flex justify-center text-3xl text-red-500">{error}</div>;
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto bg-white shadow-lg rounded-lg p-4 sm:p-6 my-5 h-[700px] overflow-auto">
      <div className="flex justify-end mb-4">
        <button
          className="px-5 py-2 rounded-md border-2 border-gray-200 text-white bg-sky-500 text-lg sm:text-xl active:opacity-90"
          onClick={order_submit}
        >
          Order
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-hidden">
        {cartlist.length === 0 ? (
          <div className="text-center text-2xl sm:text-3xl font-serif col-span-full">
            No cart items
          </div>
        ) : (
          documents?.map((ele) => (
            <div className="m-1" key={ele.$id}>
              <Card
                src={menu.getFilePreiview(ele.imgid)}
                name={ele.name}
                description={ele.description}
                rating={ele.rating}
                id={ele.$id}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Cart;
