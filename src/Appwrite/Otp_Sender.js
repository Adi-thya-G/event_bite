import { Await, json } from "react-router-dom";
import conf from "../conf/conf.js";
import {
  Client,
  ID,
  Databases,
  Query,
  Storage,
  Functions,
  Account,
  ExecutionMethod,
} from "appwrite";
import vendor from "./Add_vendor.js";

export class Order_Place_Information {
  client = new Client();
  databases;
  bucket;
  function;
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId)
      .setSession(localStorage.getItem("cookieFallback"));
    this.account = new Account(this.client);
    this.function = new Functions(this.client);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async Create_Order({
    delivery_date,
    status,
    address,
    contact,
    user,
    Number_of_Plates,
    Item_name,
    Alternative_Phone,
    delivery_time,
  }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteOrderCollectionId,
        ID.unique(),
        {
          delivery_date: delivery_date,
          status: status,
          address: address,
          contact: contact,
          user: user,
          Number_of_Plates: Number_of_Plates,
          Item_name: Item_name,
          Alternative_Phone: Alternative_Phone,
          delivery_time: delivery_time,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async Update_Oder_table({id,amount,newvendor})
  {
    try {
      return await this.databases.updateDocument(conf.appwriteDatabaseId,
        conf.appwriteOrderCollectionId,
        id,{
          status:"confirmed",
          amount:amount,
          newvendor:newvendor

        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  // list order for admin

  async List_Order() {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteOrderCollectionId,
        
      );
    } catch (error) {
      console.log(error);
    }
  }
  // generate otp method get is used
  async create_otp({ user_id, order_id }) {
    try {
      const promise = await this.function.createExecution(
        "67dbd8b2002e6cc6ace8", // functionId
        "", // body (optional)
        false, // async (optional)
        `/?user_id=${user_id}&order_id=${order_id}`, // path (optional)
        ExecutionMethod.GET, // method (optional)
        {}, // headers (optional)
        null // scheduledAt (optional)
      );
      return promise;
    } catch (error) {
      console.log(error?.message);
    }
  }

  async verify_otp({ id, otp }) {
    try {
      let response = await this.function.createExecution(
        "67dbd8b2002e6cc6ace8", // functionId
        JSON.stringify({
          id: String(id),
          otp: parseInt(otp),
        }), // body (optional)
        false, // async (optional)
        "/", // path (optional)
        ExecutionMethod.POST, // method (optional)
        {}, // headers (optional)
        null // scheduledAt (optional)
      );

      return response;
    } catch (error) {
      console.log(error?.message);
      return error;
    }
  }

  // resend otp method
  // http method used is patch
  // data send through path

  async Resend_otp({ document_id, resend_counter }) {
    try {
      return await this.function.createExecution(
        "67dbd8b2002e6cc6ace8",
        "",
        false,
        `/?document_id=${document_id}&resend_counter=${resend_counter}`,
        ExecutionMethod.PATCH, // method (optional)
        {}, // headers (optional)
        null
      );
    } catch (error) {
      console.log(error);
    }
  }
  // vendor data

  async listVendorsByItemRequest({ Item_name, plates, type }) {
    try {
      return await this.function.createExecution(
        "67fe13e2002f7b010547",
        JSON.stringify({
          Item_name: Item_name,
          plates: plates,
          type: type,
        }),
        false,
        "/",
        ExecutionMethod.POST, // method (optional)
        {}, // headers (optional)
        null
      );
    } catch (error) {
      console.log(error);
    }
  }
  // user dashboard 
  async ListOrderForUser({user_id})
  {
   try {
   return await this.databases.listDocuments(conf.appwriteDatabaseId,
    conf.appwriteOrderCollectionId,[
      Query.equal("user",user_id)
    ])
   } catch (error) {
    console.log(error)
   }
  }
}

const Order_object = new Order_Place_Information();
export default Order_object;
