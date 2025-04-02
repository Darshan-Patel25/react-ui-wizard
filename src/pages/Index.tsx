
import { Helmet } from 'react-helmet';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ViewTabs from '@/components/ViewTabs';
import LeadTable from '@/components/LeadTable';
import AiPromo from '@/components/AiPromo';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Salespipe | CRM Dashboard</title>
      </Helmet>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6 flex-1 overflow-auto">
            <Header />
            <ViewTabs />
            <LeadTable />
          </div>
        </div>
        <AiPromo />
      </div>
    </>
  );
};

export default Index;
