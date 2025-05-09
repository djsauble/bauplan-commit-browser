import axios from 'axios';
import { Branch, Commit } from '../types';

const API_BASE_URL = 'http://localhost:8000/api';

export const fetchBranches = async (): Promise<Branch[]> => {
  try {
    const response = await axios.get<Branch[]>(`${API_BASE_URL}/branches`);
    return response.data;
  } catch (error) {
    console.error('Error fetching branches:', error);
    throw error;
  }
};

export const fetchCommitsByBranch = async (
  branchId: string,
  limit: number = 20
): Promise<Commit[]> => {
  try {
    const response = await axios.get<Commit[]>(
      `${API_BASE_URL}/branches/${branchId}/commits`,
      { params: { limit } }
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching commits for branch ${branchId}:`, error);
    throw error;
  }
};