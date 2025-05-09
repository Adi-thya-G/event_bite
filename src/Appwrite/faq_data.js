import conf from "../conf/conf.js";

import {
  Client,
  ID,
  Databases,
  Query,
  Storage,
  Functions,
  ExecutionMethod,
} from "appwrite";
export class FAQ_DATA {
  client = new Client();
  databases;
  functions;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.functions = new Functions(this.client);
  }
  // list all faq data from server

  async GetFaq() {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteFaqCollectionId
      );
    } catch (error) {
      throw error.message;
    }
  }
  // create new FAQ
  async CREATE_FAQ({ question, answer, type }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteFaqCollectionId,
        ID.unique(),
        {
          question: question,
          answer: answer,
          type: type,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  // delete one document form FAQ
  async Delete_FAQ(id) {
    try {
      return await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteFaqCollectionId,
        id
      );
    } catch (error) {
      console.log(error);
    }
  }
  //update FAQ
  async Update_FAQ({ id, question, answer, type }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteFaqCollectionId,
        id,
        {
          question: question,
          answer: answer,
          type: type,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  // user data fetch for admin render

  async Get_All_User_Data() {
    try {
      let response = await this.functions.createExecution(
        "67e0d77d003e610c57fb", // functionId
        "", // body (optional)
        false, // async (optional)
        "/", // path (optional)
        ExecutionMethod.GET, // method (optional)
        {}, // headers (optional)
        null // scheduledAt (optional)
      );

      return JSON.parse(response.responseBody);
    } catch (error) {
      console.log(error);
    }
  }
}

const faq_data = new FAQ_DATA();
export default faq_data;
