import { createFileRoute } from "@tanstack/react-router";
import { AlleyStudio } from "@/components/alley-studio";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return <AlleyStudio />;
}
