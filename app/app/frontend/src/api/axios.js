// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api/users', // Replace with your Spring Boot backend URL
  timeout: 1000,
  headers: {'Content-Type': 'application/json'}
});

export default instance;
