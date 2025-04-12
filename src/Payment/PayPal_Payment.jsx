import React, { useState } from 'react'
import PayPal from './PayPal'
function PayPal_Payment() {

  const [checkout,setcheckout] = useState(false)
  return (
    <div>
        {checkout ?(
          <PayPal/>
        ):(<button onClick={()=>setcheckout(true)}>chechout</button>)}
       
    </div>
  )
}

export default PayPal_Payment