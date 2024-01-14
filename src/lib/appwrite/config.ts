import { Client,Account,Databases, Avatars, Storage } from "appwrite";

export const appwriteConfig={
    projectId : import.meta.env.VITE_APPWRITE_PROJ_ID,
    url : import.meta.env.VITE_APPWRITE_URL,
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
