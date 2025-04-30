import conf from "../conf/conf.js";
import { Client, ID, Databases,  Query,Storage } from "appwrite";
export class Feedback {
  client = new Client();
 databases;

 constructor(){
    this.client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
}
// this function used to create feedback document form user
async Create_Feedback({username,message,rating})
{
    try{
        return await this.databases.createDocument(conf.appwriteDatabaseId,
            conf.appwriteFeedbackCollectionId,
            ID.unique(),
            {
                username:username,
                message:message,
                rating:rating,
            }

        )

    }
   catch(error)
   {
    console.log(error)
   }
}
async list_feedback()
{
    try {
        return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteFeedbackCollectionId,

        )
    } catch (error) {
        console.log(error)
    }
}


}
const Feedback_OBJ = new Feedback
export default Feedback_OBJ