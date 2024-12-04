const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteUserCollectionId: String(import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID),
    appwriteCustomCollectionId:String(import.meta.env.VITE_APPWRITE_CUSTOM_COLLECTION_ID),
    appwriteCustomBucketId:String(import.meta.env.VITE_APPWRITE_CUSTOM_BUCKET_ID),
    appwriteVendorCollectionId:String(import.meta.env.VITE_APPWRITE_VENDOR_COLLECTION_ID),
    appwriteVendorLogoBucketId:String(import.meta.env.VITE_APPWRITE_VENDOR_LOGO_BUCKET_ID),
}
// there was a name issue with the import.meta.env.VITE_APPWRITE_URL, it was later fixed in debugging video

export default conf