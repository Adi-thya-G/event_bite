import { json } from 'react-router-dom';
import conf from "../conf/conf.js";
import { Client, ID, Databases,  Query,Storage } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createUserData(id,{Name,Phone,Address,Pincode}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUserCollectionId,
                 id,
                {
                 name:Name,
                 phone:Phone,
                 address:Address,
                 pincode:Pincode    
                }
            ) 
        } catch (error) {
            console.log("createUsetData",error);
        }
    }
     
    async getData(id)
    {
        try{
            
         return this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteUserCollectionId,
            id
         )
        }
        catch(error)
        {
            console.log(error)
        }
    }
    async updataData(id,{name,phone,address,pincode,})
    {
        try{
            console.log("hello update")
            return this.databases.updateDocument(
                conf.appwriteDatabaseId,
            conf.appwriteUserCollectionId,
        id,{
            name:name,
            phone:phone,
            address:address,
            pincode:pincode
        } )
        }
        catch(error)
        {
            console.log(error)
        }
    }

   

 async updateWishlist(id,wishdata)
 {
    try{
        console.log("hello wish;")
        return this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteUserCollectionId,
            id,
            {
                wishlist:wishdata
            }
            
        )
    }
    catch(error)
    {
        console.log(error)
    }
 }
 async updatecart(id,cartData){
    try{
        console.log("hello CART")
        return this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteUserCollectionId,
            id,
            {
                cart:cartData
            }
            
        )
    }
    catch(error)
    {
        console.log(error)
    }

 }
   
    
    
    

  



}


const service = new Service()
export default service