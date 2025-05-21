import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-rich-black flex items-center justify-center">
      <div className="text-center">
        <Loader2 size={40} className="animate-spin text-neon-red mx-auto mb-4" />
        <p className="text-white/70">Loading...</p>
      </div>
    </div>
  );
}