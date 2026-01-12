import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { useLocale } from "next-intl";

export default async function WebinarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // TODO: Re-enable protected logic when ready
  // const apiUrl = process.env.API_URL;
  // if (!apiUrl) {
  //   throw new Error("API_URL is not configured");
  // }

  // const cookieStore = await cookies();
  // const cookieHeader = cookieStore.toString();

  // try {
  //   const response = await fetch(`${apiUrl}/webinar/access-check`, {
  //     cache: "no-store",
  //     credentials: "include",
  //     headers: {
  //       Cookie: cookieHeader,
  //     },
  //   });

  //   if (!response.ok) {
  //     if (response.status === 403) {
  //       redirect(`/${locale}/login`);
  //     }
  //     redirect(`/${locale}/login`);
  //   }
  // } catch (error) {
  //   // If API is unavailable (e.g., in development), redirect to login for security
  //   // In production, you may want to handle this differently
  //   console.error("Failed to check webinar access:", error);
  //   redirect(`/${locale}/login`);
  // }

  const youtubeVideoId =
    process.env.NEXT_PUBLIC_YOUTUBE_VIDEO_ID || "Cw3uUnD8088";

  return (
    <section className="relative bg-[#FFF4EF] overflow-hidden min-h-screen">
      {/* Gradient Background - same as landing page sections */}
      <div className="absolute bottom-0 left-0 right-0 h-[400px] md:h-[651px] bg-linear-to-t from-[#FFF3ED] to-transparent pointer-events-none" />

      {/* Webinar Content */}
      <div className="relative z-10 container mx-auto px-4 pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* YouTube Live - Left side, takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <div className="aspect-video w-full bg-black rounded-lg overflow-hidden shadow-lg">
                {youtubeVideoId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1`}
                    title="YouTube Live"
                    allow="autoplay; encrypted-media"
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
              <div className="h-[600px] w-full bg-black rounded-lg overflow-hidden shadow-lg">
                {youtubeVideoId ? (
                  <iframe
                    src={`https://www.youtube.com/live_chat?v=${youtubeVideoId}&embed_domain=${
                      process.env.NEXT_PUBLIC_DOMAIN || "localhost"
                    }`}
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
    </section>
  );
}
