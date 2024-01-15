import { Client,Account,Databases, Avatars, Storage } from "appwrite";

export const appwriteConfig = {
    url : import.meta.env.VITE_APPWRITE_URL,
    projectId : import.meta.env.VITE_APPWRITE_PROJ_ID,
    databaseId : import.meta.env.VITE_APPWRITE_DB,
    storageId : import.meta.env.VITE_APPWRITE_STORAGEID,
    user_collectionId: import.meta.env.VITE_APPWRITE_COLLECTION_ID_users,
    save_collectionId: import.meta.env.VITE_APPWRITE_COLLECTION_ID_saves,
    post_collectionId: import.meta.env.VITE_APPWRITE_COLLECTION_ID_posts,

}

export const client = new Client();
client.setProject(appwriteConfig.projectId);
console.log(appwriteConfig.projectId)
client.setEndpoint(appwriteConfig.url);
console.log(appwriteConfig.url)



export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
