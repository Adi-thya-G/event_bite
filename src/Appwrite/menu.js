
import conf from "../conf/conf.js";

import { Client, ID, Databases,  Query,Storage } from "appwrite";


export class Menu{
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
    // create custom combo 
    async createcombo({name,description,image,rating,id,type})
    {
        try {
          console.log("hello creaet cobo")
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCustomCollectionId,
                ID.unique(),
                {
                name:name,
                description:description,
                imgid:image,
                rating:rating,
                id,
                type
                }
            )
        } catch (error) {
            console.log("createUsetData",error);
        }
    }
     
    async getmenu()
    {
      console.log(" list costom cumbo document")
      try{
        return  this.databases.listDocuments(
          conf.appwriteDatabaseId,
          conf.appwriteCustomCollectionId,
        )
      }
      catch(error)
      {
        console.log(error)
      }
    }
    
   //update menu

   async Update_Menu(id,{name,description,rating})
   {
    try{
        return this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCustomCollectionId,
          id,{
            name:name,description:description,rating:rating
          }
        )
    }
    catch(error)
    {
      console.log(error)
    }
   }
    // delete  custom combo document

    async Delete_Menu(id)
    {
      try{
           let res= await this.databases.deleteDocument(conf.appwriteDatabaseId,
            conf.appwriteCustomCollectionId,id.id
           )
           return res
      }
      catch(error){
        console.log(error.message)

      }
    }

    //getwishlist  document form custom combo
    async getWishlists(data) {
      try {
        return await this.databases.listDocuments(
          conf.appwriteDatabaseId,
          conf.appwriteCustomCollectionId,
         [Query.equal("$id",data)]
        );
      } catch (error) {
        console.log("Appwrite service :: getData :: error " + error);
        return false;
      }
    }



     // menu upload file
    async uploadFile(file) {
        try {
          console.log("hello uploadfil")
          return await this.bucket.createFile(
            conf.appwriteCustomBucketId,
            ID.unique(),
            file
          );
        } catch (error) {
          console.log("Appwrite service :: uploadFile:: error " + error);
          return false;
        }
      }
      // dlete upload photo form custom combo collection
      async deleteFile(fileId) {
        try {
          console.log("delete file custom combo")
          await this.bucket.deleteFile(conf.appWriteBucketId, fileId);
          return true;
        } catch (error) {
          console.log("Appwrite service :: deleteFile :: error " + error);
          return false;
        }
      }
    
     getFilePreiview(fileId) {
        try {
          console.log("preview")
        return this.bucket.getFilePreview(conf.appwriteCustomBucketId, fileId);
        } catch (error) {
          console.log(error,)
        }
      }
    


}

const menu=new Menu()
export default menu