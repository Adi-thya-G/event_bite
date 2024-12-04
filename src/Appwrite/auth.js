import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl);
    this.client.setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    // eslint-disable-next-line no-useless-catch
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //call another method
        console.log("hello 1");
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  // password recovery

  async Passwordrecovery(email) {
    try {
      return await this.account.createRecovery(
        email,
        "http://localhost:5173/login/recovery"
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  async Updatepassword(password) {
    try {
      return await this.account.updatePassword(
        "672b9fbe000af75a11c6",
        password
      );
    } catch (error) {
      console.log(error);
    }
  }

  async login({ email, password }) {
    try {
      console.log("hello 2login");
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      console.log("hello 1=get");
      return await this.account.get();
    } catch (error) {
      throw error;
    }
    return null;
  }
  async logout() {
    try {
      console.log("hello logout");
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
