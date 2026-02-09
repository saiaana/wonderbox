import { loadingConfig } from "../config/loading";

export default function Loading() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center text-sm text-stone-500">
      <div>
        <p className="animate-bounce text-6xl font-semibold tracking-[-0.09em] text-pink-600/70">
          {loadingConfig.title}
        </p>
        <p className="text-xs uppercase tracking-wide text-stone-400">
          {loadingConfig.description}
        </p>
      </div>
    </div>
  );
}
