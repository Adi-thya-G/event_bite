import { Client, Account, ID,OAuthProvider } from "appwrite";
import conf from "../conf/conf.js";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl)
         .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }
   // to create a account 
  async createAccount({ email, password, name,phone }) {
  
    try { 
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      if (userAccount) {
        //call another method
     
        
        let response=await  this.login({ email, password });
       
        console.log("hello 1",);
        return response
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }
  

 


  

  // to send forget password email to user 
  async forget_password(email){
    try{
      return await this.account.createRecovery(email,"http://localhost:5173/reset-password-form")
    }
    catch(error)
    {
      console.log(error)
    }

  }
// to update password 
 async Updatepassword(userId,secret,password)
 {
  try{
   
   return await this.account.updateRecovery(userId,secret,password)
  }
  catch(error)
  {
    console.log(error.message)
  }
 }
 // login to user
  async login({ email, password }) {
    try {
      console.log("hello 2login");
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }
  // get current user  on base of session
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
    
  }
  // logout function 
  async logout() {
    try {
      console.log("hello logout");
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
 // login with google  function
 async login_with_google()
 {
  await this.account.createOAuth2Session(
    OAuthProvider.Google,
    'http://localhost:5173/',
    'http://localhost:5173/notfound'
  )
  
 }

}

const authService = new AuthService();

export default authService;
