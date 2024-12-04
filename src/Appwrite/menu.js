import { json } from 'react-router-dom';
import conf from '../Conf/conf.js';
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
    // create combo
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
      console.log("hello get menu")
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
    
    async getWishlists(data) {
      try {
        console.log("hello wishlisgwt")
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

      async deleteFile(fileId) {
        try {
          console.log("hello de;etefile")
          await this.bucket.deleteFile(conf.appWriteBucketId, fileId);
          return true;
        } catch (error) {
          console.log("Appwrite service :: deleteFile :: error " + error);
          return false;
        }
      }
    
      getFilePreiview(fileId) {
        console.log("hello getfile")
        return this.bucket.getFilePreview(conf.appwriteCustomBucketId, fileId);
      }
    


}

const menu=new Menu()
export default menu