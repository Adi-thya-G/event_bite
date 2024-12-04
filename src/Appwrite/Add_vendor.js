import { json } from 'react-router-dom';
import conf from '../Conf/conf.js';
import { Client, ID, Databases,  Query,Storage } from "appwrite";


export class Vendor{
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

    async Addvendor({name,phone,pancard,area,payment,hours,organisation,email,logoid,emergencynumber,category})
    {
        try{
            return  await this.databases.createDocument(conf.appwriteDatabaseId,
                conf.appwriteVendorCollectionId,
                ID.unique(),
                {
                    name:name,
                    phone:phone,
                    pancard:pancard,
                    area:area,
                    payment:payment,
                    hours:hours,
                    organisation:organisation,
                    email:email,
                    logoid:logoid,
                    emergencynumber,
                    category

                }
            )

        }
        catch(error){
            console.log(error)
 
        }
    }
    async getVendor()
    {
     try{
        return  await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteVendorCollectionId)
     }
     catch(error)
     {
        console.log(error.message)
     }
    }
    async uploadFile(file) {
        try {
          return await this.bucket.createFile(
            conf.appwriteVendorLogoBucketId,
            ID.unique(),
            file
          );
        } catch (error) {
          console.log("Appwrite service :: uploadFile:: error " + error);
          return false;
        }
      }

}
const vendor = new Vendor()
export default vendor