import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function WebinarPage() {
  const apiUrl = process.env.API_URL;
  if (!apiUrl) {
    throw new Error('API_URL is not configured');
  }

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const response = await fetch(`${apiUrl}/webinar/access-check`, {
    cache: 'no-store',
    credentials: 'include',
    headers: {
      Cookie: cookieHeader,
    },
  });

  if (!response.ok) {
    if (response.status === 403) {
      redirect('/login');
    }
    redirect('/login');
  }

  const youtubeVideoId = process.env.NEXT_PUBLIC_YOUTUBE_VIDEO_ID || '';

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* YouTube Live - Left side, takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
              {youtubeVideoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1`}
                  title="YouTube Live"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-white">
                  <p>YouTube Live embed will appear here</p>
                </div>
              )}
            </div>
          </div>
          
          {/* YouTube Chat - Right side, takes 1 column on large screens */}
          <div className="lg:col-span-1">
            <div className="h-[600px] w-full bg-black rounded-lg overflow-hidden">
              {youtubeVideoId ? (
                <iframe
                  src={`https://www.youtube.com/live_chat?v=${youtubeVideoId}&embed_domain=${process.env.NEXT_PUBLIC_DOMAIN || 'localhost'}`}
                  title="YouTube Chat"
                  className="w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-white">
                  <p>YouTube Chat will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

