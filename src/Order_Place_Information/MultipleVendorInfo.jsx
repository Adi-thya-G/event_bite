import React, { useEffect, useState } from 'react';
import VendorInfoCard from './VendorInfoCard';
import { useSelector } from 'react-redux';
import Order_object from '../Appwrite/Otp_Sender';
import { useNavigate } from 'react-router-dom';
import { Flex, Spin } from 'antd';
function MultipleVendorInfo() {
  const [data, setdata] = useState([]);
  const [loading,setloading]=useState(true)
  const cache = useSelector((state) => state.auth.cache);
  const navigate = useNavigate();

  if (cache?.Item_Name == null) {
    navigate("/not-found-error"); // fixed typo
  }

  useEffect(() => {
    setloading(true)
    Order_object.listVendorsByItemRequest({
      Item_name: cache.Item_Name,
      plates: cache.Plates,
      type: "veg"
    }).then((res) => {
      const parsedResponse = JSON.parse(res.responseBody);
      if (parsedResponse.success) {
        setdata(parsedResponse.data);
        setloading(false)
      } else {
        console.error("Failed to fetch vendors");
      }
    }).catch(err => {
      console.error("API Error", err);
    });
  }, [cache?.Item_Name, cache?.Plates]);
 console.log(data)
 if (loading) {
  return (
    <div className="flex items-center justify-center h-screen">
      <Flex align="center" justify="center" gap="middle">
        <Spin size="large" />
      </Flex>
    </div>
  );
}

  return (
    <div className='grid lg:grid-cols-3'>
     {!loading&&data?.map((ele) => (
  <VendorInfoCard
    key={ele.$id}
    id={ele.$id}   
    businessName={ele.Business_name}
    finalValue={ele.finalPrice}
    discountValue={ele.DiscountValue}
    totalAmount={ele.TotalAmount}
    discountPercentage={ele.Discount}
    perpetualValue={ele.PerPlatesValue}
  />
))}

    </div>
  );
}

export default MultipleVendorInfo;
