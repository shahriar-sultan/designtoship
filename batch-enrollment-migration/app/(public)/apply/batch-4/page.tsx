import { BatchApplicationWizard } from "@/components/application/BatchApplicationWizard";

export const metadata = {
  title: "Batch 4 Application | Design & Ship with AI",
  description: "Apply for Design & Ship with AI — Batch 4",
};

export default function BatchApplicationPage() {
  return (
    <div className="min-h-screen bg-secondary/10 px-4 py-10 md:py-14">
      <BatchApplicationWizard />
    </div>
  );
}
