import validator, { isNumeric } from "validator";
class validation_class
{
 password_validation(password)
 {
    if(validator.isStrongPassword(password,{
        minLength:8,
        minLowercase:2,
        minNumbers:1,
        minSymbols:1,
        minUppercase:1}))
{
return true
}
else
{
    
 return "Please enter strong password"
} 
}
 name_validation(name)
 {
    let exp=new RegExp(/^[A-Za-z\s]{3,}$/) 
    if(exp.test(name))
       return true
    else
    {
       return "Please enter valid name"
    }
 }
 phone_validation(phone)
 {
    const exp = /^[6-9]*$/;
    console.log(phone)
    if(phone.length==10)
    {
        if(isNumeric(phone)||exp.test(phone))
         return true
    }
    else
     return "Please enter valid phone number"   
}
pincode_validation(pincode)
{ const exp=new RegExp(/^[5][5-9][0-9]{4}$/)
    if(exp.test(pincode))
    {
       return true
    }
    else
      return "please enter the valid pincode"
}
email_validation(email)
{
    if(validator.isEmail(email))
        return true
    else
     return "please enter correctly"
}
address_validation(address)
{
    const exp=new RegExp(/^[a-zA-A\s]+$/g)  
    if(exp.test(address)&&exp!=" ")
       return true
    else

       return "please enter correct address"        
}
username_validation(username)
{
    const exp=new RegExp(/^[A-Za-z][A-Za-z0-9_]{5,15}$/g)
    if(exp.test(username))
        return true
    else
     return "please enter user name correctly"
}
adhar_validation(adhar)
{
   let regex = new RegExp( /^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/)
   if(regex.test(adhar)&&adhar!=" ")
    return true
   else 
     return "please enter adhar number correctly"
}
confirm_password(password,confirm,id)
{
   let ele= document.getElementById(id)
   if(password==confirm)
    {     ele.style.borderColor="black"
            return true
   }
   else
   {
     ele.style.borderColor="red"
      return "password do not match"
   }  
   }
}
const validation_obj=new validation_class()
export default validation_obj