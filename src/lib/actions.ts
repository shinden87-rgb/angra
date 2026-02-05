'use server';

import { getAllPapers as fetchAllPapers } from './api/research';
import { ResearchPaper } from '@/types';

export async function getPapersAction(): Promise<ResearchPaper[]> {
    try {
        return await fetchAllPapers();
    } catch (error) {
        console.error('Action error:', error);
        return [];
    }
}
