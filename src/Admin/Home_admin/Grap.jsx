import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

import { Flex, Spin } from 'antd';
export default function Grap({ order }) {
  const [load, setLoad] = React.useState(true);
  const [value, setValue] = React.useState([]);
  const [date, setDate] = React.useState([]);

  React.useEffect(() => {
    let tempValue = [];
    let tempDate = [];

    order.forEach((element) => {
      const day = element.$createdAt.split('T')[0];

      if (!tempDate.includes(day)) {
        tempDate.push(day);
        tempValue.push(element.amount);
      } else {
        const index = tempDate.indexOf(day);
        tempValue[index] += element.amount;
        console.log(tempValue)
      }
    });

    setDate(tempDate.slice(-7));
    setValue(tempValue.slice(-7));
    setLoad(false);
    console.log(date,value)
  }, [order]);

  return (
    <>
      {load ? (
        <Flex align="center" gap="middle">
                       
        <Spin size="large" />
      </Flex>
      ) : (
        <BarChart
          xAxis={[{ scaleType: 'band', data: date  ,}]}
          
          series={[{ data: value }]}
          
          width={500}
          height={350}
          margin={0}
          colors={['#6B21A8']}
        />
      )}
    </>
  );
}
