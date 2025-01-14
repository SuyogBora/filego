import { Metadata } from "next"

export const siteConfig = {
    name: "FileGo",
    description: "Secure file transfer and monetization platform",
    url: "https://filego.com", 
    ogImage: "/og-image.jpg", 
  }
  
  export const homeMetadata: Metadata = {
    title: "FileGo - Secure File Transfer & Monetization Platform",
    description: "Share and monetize your files with ease. Secure file transfers, password protection, and instant payments for downloads.",
  }
  
  // Upload page metadata
  export const uploadMetadata: Metadata = {
    title: "Upload Files - FileGo",
    description: "Upload and share files securely. Set passwords, expiration dates, and monetize your downloads with FileGo.",
   
  }
  
  // Download page metadata
  export const downloadMetadata: Metadata = {
    title: "Download File - FileGo",
    description: "Download shared files securely from FileGo. Password-protected file transfers and secure payment processing.",
    
  }
  
  // Dashboard page metadata
  export const dashboardMetadata: Metadata = {
    title: "Dashboard - FileGo",
    description: "Manage your uploaded files, track downloads, and monitor earnings with FileGo's comprehensive dashboard.",
   
  }

  // Login page metadata
export const loginMetadata: Metadata = {
    title: `Login - ${siteConfig.name}`,
    description: "Log in to your FileGo account to manage your files, track downloads, and monitor earnings.",
   
  }
  
  // Sign up page metadata
  export const signupMetadata: Metadata = {
    title: `Create Account - ${siteConfig.name}`,
    description: "Join FileGo to start sharing files securely and monetize your downloads. Create your account today.",
  }
  
  // Forgot password page metadata
  export const forgotPasswordMetadata: Metadata = {
    title: `Forgot Password - ${siteConfig.name}`,
    description: "Reset your FileGo account password securely. We'll help you regain access to your account.",
    
  }
  
  // Reset password page metadata
  export const resetPasswordMetadata: Metadata = {
    title: `Reset Password - ${siteConfig.name}`,
    description: "Set a new password for your FileGo account. Ensure your account security with a strong password.",
  }