import { useEffect, useState } from 'react';

const API_KEY = 'AIzaSyAKZzqk6a48fKdQpGKX4eb3rOuWp0mgUnA';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  channelTitle: string;
  publishedAt: string;
  viewCount: string;
  likeCount: string;
  commentCount: string;
}

export interface YouTubeApiResponse {
  items: {
    id: string;
    snippet: {
      title: string;
      description: string;
      thumbnails: {
        medium: {
          url: string;
        };
      };
      channelTitle: string;
      publishedAt: string;
    };
    statistics: {
      viewCount: string;
      likeCount: string;
      commentCount: string;
    };
  }[];
  nextPageToken?: string;
}

export const YOUTUBE_CATEGORIES = [
  { id: '0', name: 'All Categories' },
  { id: '1', name: 'Film & Animation' },
  { id: '2', name: 'Autos & Vehicles' },
  { id: '10', name: 'Music' },
  { id: '15', name: 'Pets & Animals' },
  { id: '17', name: 'Sports' },
  { id: '19', name: 'Travel & Events' },
  { id: '20', name: 'Gaming' },
  { id: '22', name: 'People & Blogs' },
  { id: '23', name: 'Comedy' },
  { id: '24', name: 'Entertainment' },
  { id: '25', name: 'News & Politics' },
  { id: '26', name: 'Howto & Style' },
  { id: '27', name: 'Education' },
  { id: '28', name: 'Science & Technology' },
  { id: '29', name: 'Nonprofits & Activism' }
];

export const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'IN', name: 'India' },
  { code: 'JP', name: 'Japan' },
  { code: 'KR', name: 'South Korea' },
  { code: 'BR', name: 'Brazil' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'RU', name: 'Russia' },
  { code: 'MX', name: 'Mexico' }
];

export const SORT_OPTIONS = [
  { id: 'relevance', name: 'Relevance' },
  { id: 'views', name: 'Most Views' },
  { id: 'likes', name: 'Most Likes' },
  { id: 'comments', name: 'Most Comments' }
];

export const useYouTubeTrending = (
  regionCode: string = 'US',
  categoryId: string = '0',
  searchQuery: string = '',
  sortBy: string = 'relevance'
) => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingVideos = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          part: 'snippet,statistics',
          chart: 'mostPopular',
          maxResults: '24',
          regionCode,
          key: API_KEY
        });

        if (categoryId !== '0') {
          params.append('videoCategoryId', categoryId);
        }

        const response = await fetch(`${BASE_URL}/videos?${params}`);
        const data: YouTubeApiResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.error?.message || 'Failed to fetch trending videos');
        }

        let formattedVideos = data.items
          .filter(video => 
            searchQuery === '' || 
            video.snippet.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map(video => ({
            id: video.id,
            title: video.snippet.title,
            description: video.snippet.description,
            thumbnailUrl: video.snippet.thumbnails.medium.url,
            channelTitle: video.snippet.channelTitle,
            publishedAt: video.snippet.publishedAt,
            viewCount: video.statistics.viewCount || '0',
            likeCount: video.statistics.likeCount || '0',
            commentCount: video.statistics.commentCount || '0'
          }));

        // Sort videos based on selected option
        switch (sortBy) {
          case 'views':
            formattedVideos.sort((a, b) => parseInt(b.viewCount) - parseInt(a.viewCount));
            break;
          case 'likes':
            formattedVideos.sort((a, b) => parseInt(b.likeCount) - parseInt(a.likeCount));
            break;
          case 'comments':
            formattedVideos.sort((a, b) => parseInt(b.commentCount) - parseInt(a.commentCount));
            break;
        }

        setVideos(formattedVideos);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingVideos();
  }, [regionCode, categoryId, searchQuery, sortBy]);

  return { videos, loading, error };
};