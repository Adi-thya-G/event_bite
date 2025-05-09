const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteUserCollectionId: String(import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID),
    appwriteCustomCollectionId:String(import.meta.env.VITE_APPWRITE_CUSTOM_COLLECTION_ID),
    appwriteCustomBucketId:String(import.meta.env.VITE_APPWRITE_CUSTOM_BUCKET_ID),
    appwriteVendorCollectionId:String(import.meta.env.VITE_APPWRITE_VENDOR_COLLECTION_ID),
    appwriteVendorLogoBucketId:String(import.meta.env.VITE_APPWRITE_VENDOR_LOGO_BUCKET_ID),
    appwriteFaqCollectionId:String(import.meta.env.VITE_APPWRITE_FAQ_COLLECTION_ID),
    appwriteFeedbackCollectionId:String(import.meta.env.VITE_APPWRITE_FEEDBACK_COLLECTION_ID),
    appwriteApiKey:String(import.meta.env.VITE_APPWRITE_API_KEY_ADMIN),
    appwriteOrderCollectionId:String(import.meta.env.VITE_APPWRITE_ORDER_TABLE_COLLECTION_ID)
}


export default conf