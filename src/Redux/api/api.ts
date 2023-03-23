import axios from "axios";

const instance = axios.create({
  baseURL: "https://www.googleapis.com/books/v1/",
  // params: {
  //   key: "AIzaSyB6kaL4XZEbdZp52NlmcT5P7GcY_KeMSbs",
  // },
});

export const googleBooksApi = instance;
