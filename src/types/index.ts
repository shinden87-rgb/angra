export interface ResearchPaper {
  id: string;
  title: string;
  titleJa?: string;
  authors: string[];
  summary: string;
  summaryJa?: string;
  url: string;
  source: 'PubMed' | 'arXiv';
  publishedDate: string;
  category: 'Health' | 'Training' | 'Nutrition' | 'Psychology';
}

export type Category = ResearchPaper['category'];
