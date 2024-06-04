//to enhance maintainability and reusibility of the code: import axios, { AxiosResponse, AxiosError } from 'axios';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { Activity } from '../types';
//import { PrismaClient } from '@prisma/client';
//const prisma = new PrismaClient();

const API_BASE_URL = 'http://localhost:3000/api'; // Base URL of your API server

export const createActivity = async (data: any): Promise<any> => {
    
};

// Function to fetch activity by ID from backend
export const fetchActivityById = async (id: string): Promise<Activity> => {
    try {
        const response: AxiosResponse<Activity> = await axios.get(`${API_BASE_URL}/activities/${id}`);
        return response.data;
    } catch (error:unknown) {
        handleRequestError(error as AxiosError);
        throw error; // Rethrow the error to propagate it to the caller
    }
};

export const fetchActivities = async (): Promise<Activity[]> => {
    try {
        const response: AxiosResponse<Activity[]> = await axios.get(`${API_BASE_URL}/activities`);
        return response.data;
    } catch (error: unknown) {
        handleRequestError(error as AxiosError);
        throw error; // Rethrow the error to propagate it to the caller
    }
};

export const updateActivity = async (id: string, data: any): Promise<any> => {
    
};

// Function to handle API request errors
const handleRequestError = (error: AxiosError) => {
    if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        console.error('Request failed with status:', error.response.status);
        console.error('Response data:', error.response.data);
    } else if (error.request) {
        // The request was made but no response was received
        console.error('Request made but no response received:', error.request);
    } else {
        // Something happened in setting up the request that triggered an error
        console.error('Error setting up request:', error.message);
    }
};


