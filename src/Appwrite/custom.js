import conf from '../Conf/conf.js';
import { Client, ID, Databases,  Query,Storage } from "appwrite";

export class Custom{
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

    async uploadFile(file) {
        try {
          return await this.bucket.createFile(
            conf.appwriteUserCollectionId,
            ID.unique(),
            file
          );
        } catch (error) {
          console.log("Appwrite service :: uploadFile:: error " + error);
          return false;
        }
      }

      async createCustom({name,
        description,
        imgid,
        rating,
        vendor})
      {
        return await this.databases.createDocument(conf.appwriteDatabaseId,
            conf.appwriteCustomCollectionId,
            ID.unique(),
            {
                name,
                description,
                imgid,
                rating,
                vendor
            }
        )
      }



      async listCustom()
      {
       try{
        return await this.databases.listDocuments(conf.appwriteDatabaseId,
            conf.appwriteCustomCollectionId,

        )
       }
       catch(error)
       {
        console.log(error)
       }
      }

      async getfilesrc(fileId) {
        return this.bucket.getFilePreview(conf.appwriteCustomBucketId, fileId);
      }




}
const custom = new Custom()
export default custom
