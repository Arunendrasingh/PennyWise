import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";
import { Alert } from "react-native";
import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";
import {makeRedirectUri} from 'expo-auth-session';

export const config = {
  platform: "com.its_dev.PennyWise",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
};

let client = new Client();
client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform);

// Avatar & Account
const avatar = new Avatars(client);
const account = new Account(client);

// Login Function
export async function login() {
  try {
    const redirectUrl = makeRedirectUri({
      scheme: 'pennywise',
      path: 'sign-in',
      preferLocalhost: true,
      isTripleSlashed: false,
    });
    if (!redirectUrl?.hostname) {
      redirectUrl.hostname = "localhost";
    }
    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUrl
    );
    if (!response) return "OAuth Token Creation Failed!! ☹️☹️☹️";

    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUrl.toString()
    );
    
    if (browserResult.type !== "success") {
      console.log("Failed to open browser");
      return "Failed to open browser";
    }

    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();
    if (!secret || !userId) throw new Error("Create OAuth2 token failed");

    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Failed to create session");

    return true;

    // code
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function loginWithGoogle() {
  try {
    // Create linking
    const redirectUrl = await Linking.createURL("/");
    console.log("Redirect URL", redirectUrl);

    // Create OAuthToken
    console.log("Creating OAuth Token", OAuthProvider.Google);
    const response = await account.createOAuth2Session(
      OAuthProvider.Google,
      redirectUrl
    );

    console.log("OAuth Token", response.toString());
    if (!response) return "OAuth Token Creation Failed!! ☹️☹️☹️";

    // code
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function logout() {
  try {
    const result = await account.deleteSession("current");
    return result;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// Get Current User
export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    console.log("Working", user);
    if (user.$id) {
      const userAvatar = avatar.getInitials(user.name);

      return {
        ...user,
        avatar: userAvatar.toString(),
      };
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
