

export interface GeminiAnalysisResult {
  text: string | null;
  image: string | null; // base64 data URL
}

export interface HistoryItem {
  id: string;
  timestamp: string; // ISO string
  imagePreview: string; // base64 data URL
  prompt: string;
  result: GeminiAnalysisResult;
  imageHash: string;
}