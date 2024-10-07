/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL : string    //connection to the API server.
    readonly VITE_CHAT_URL : string   //connection to the cHAT SERVER
}

interface ImportMeta {
    readonly env : ImportMetaEnv
}