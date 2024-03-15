import config from "../config/config";
import { Client, Databases, Storage, ID, Query } from 'appwrite';

export class Service {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client.setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId);

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage,
        status, userId }) {
        console.log("Values ---> ", title, " -----> ", featuredImage, ' ------>', status, '------>', userId, "----> ", content,);
        try {
            return await this.databases.createDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug,
                {
                    title, content, featuredImage, status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Error From AppWrite Post Creation : ", error);
        }
    }

    async updatePost(slug, { title, content, featuredImage,
        status }) {
        try {
            return await this.databases.updateDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug,
                {
                    title, content, featuredImage, status,
                }
            )
        } catch (error) {
            console.log("Error From AppWrite Update Post : ", error);
        }
    }

    async deletePost(slug) {
        try {
            return await this.databases.deleteDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug
            );
            return true
        } catch (error) {
            console.log('Error from AppWrite Delete Post Method : ', error);
            return false
        }
    }

    async getPost(slug) {
        try {
            console.log("Value of slug backend---", slug);
            return await this.databases.getDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug
            )

        } catch (error) {
            console.log("Error from Appwrite get Post Method : ", error);
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Error from appwrite get multiple Posts Method : ", error);
            return false
        }
    };

    //Upload File(Image) and deltete Methods 
    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                config.appWriteBucketId,
                ID.unique(),
                file,
            )

        } catch (error) {
            console.log("Error From Appwrite uploadFile, Method : ", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.storage.deleteFile(
                config.appWriteBucketId,
                fileId,
            )
            return true
        } catch (error) {
            console.log("Error from Appwrite deletefile methode : ", error);
            return false
        }
    }

    async downloadFile(featuredImage) {
        try {
            return this.storage.getFileDownload(
                config.appWriteBucketId,
                featuredImage
            )
            return true

        } catch (error) {
            console.log("Error From Appwrite downloadFile method : ", error);
            return false
        }
    }

    getFilePreview(fileId) {
        // console.log("Backend : ", fileId);
        return this.storage.getFilePreview(
            config.appWriteBucketId,
            fileId
        );
    };
};

const service = new Service();

export default service;