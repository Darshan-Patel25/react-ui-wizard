
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Filter, SortAsc } from "lucide-react";

const Header = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-900 rounded-md flex items-center justify-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold">Salespipe Project</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex -space-x-2">
          <Avatar className="border-2 border-white">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
          <Avatar className="border-2 border-white">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>KO</AvatarFallback>
          </Avatar>
        </div>
        <Button className="bg-blue-900 hover:bg-blue-800 text-white">
          <span className="mr-1">+</span> New Lead
        </Button>
      </div>
    </div>
  );
};

export default Header;
