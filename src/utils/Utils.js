import axios from "axios";
import { Base64 } from "js-base64";

export async function lgoin(emailId, pass) {
  const email = Base64.encode(emailId);
  const password = Base64.encode(pass);
  const body = {
    email,
    password,
  };
  try {
    const response = await axios.post("/login", body, {});
    return response;
  } catch (error) {
    return error;
  }
}

export async function registration(name, emailId, pass) {
  const email = Base64.encode(emailId);
  const password = Base64.encode(pass);
  const username = name;
  const body = {
    username,
    password,
    email,
  };
  try {
    const response = await axios.post("/register", body, {});
    return response;
  } catch (error) {
    return error;
  }
}

export async function fetchDocuemnt(emailId) {
// const email = Base64.encode(emailId);
  try {
    const response = await axios.get(`/fetchDocuemnt/${emailId}`,  {});
    return response;
  } catch (error) {
    return error;
  }
}

export async function webscoket() {
  try {
    const response = await axios.get("/ws", {});
    return response;
  } catch (error) {
    return error;
  }
} 

export async function createDocument() {
  try {
    const response = await axios.post("/createDocument", {});
    return response;
  } catch (error) {
    return error;
  }
} 