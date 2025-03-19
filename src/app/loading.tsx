export default function Loading() {
  return (
    <div className="min-h-[400px] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-lime"></div>
        <p className="text-brand-lime text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
} 