
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const AiPromo = () => {
  return (
    <div className="fixed bottom-4 left-4 bg-white rounded-lg shadow-lg border p-4 w-80">
      <div className="flex items-start justify-between mb-2">
        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd" />
          </svg>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <X className="h-5 w-5" />
        </button>
      </div>
      <h3 className="font-semibold text-lg mb-2">Enhance your experience with AI integration!</h3>
      <p className="text-gray-600 text-sm mb-4">Leverage the power of AI to optimize your workflow and improve efficiency.</p>
      <div className="space-y-2">
        <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white">
          Activate AI tools
        </Button>
        <button className="w-full text-sm text-blue-600 hover:underline">
          See details
        </button>
      </div>
    </div>
  );
};

export default AiPromo;
