import * as dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

export interface GoogleSearchResult {
  title: string;
  link: string;
  snippet?: string;
}

export interface GoogleSearchResponse {
  searchInformation?: {
    formattedTotalResults?: string;
    formattedSearchTime?: string;
    totalResults?: string;
  };
  items?: GoogleSearchResult[];
}

export class GoogleSearchAPI {
  private apiKey: string | undefined;
  private cx: string | undefined;

  constructor() {
    this.apiKey = process.env.GOOGLE_API_KEY;
    this.cx = process.env.GOOGLE_CX;

    if (!this.apiKey || !this.cx) {
      throw new Error(
        "Please set GOOGLE_API_KEY and GOOGLE_CX environment variables"
      );
    }
  }

  async search(query: string): Promise<GoogleSearchResponse> {
    const url = `https://www.googleapis.com/customsearch/v1?key=${
      this.apiKey
    }&cx=${this.cx}&q=${encodeURIComponent(query)}`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`API request failed: ${res.status} ${res.statusText}`);
    }
    return (await res.json()) as GoogleSearchResponse;
  }
}
