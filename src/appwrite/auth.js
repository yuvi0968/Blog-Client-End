import config from "../config/config";
import { Client, Account, ID } from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client.setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId);

        this.account = new Account(this.client);
    }

    async craeteAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(),
                email, password, name);

            if (userAccount) {
                return this.logIn({ email, password });
            } else {
                return ('User not create : ', userAccount);
            }
        } catch (error) {
            throw error;
        }
    }

    async logIn({ email, password }) {
        try {
            return await this.account.createEmailSession(
                email, password
            );
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            return user;
        } catch (error) {
            console.log("Error... from appwrite service.", error);
            throw error
        }


        // return null;
    }

    async logOut() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Logout Error By Server AppWrite : ", error);
        }
    }
}

const authService = new AuthService();

export default authService;