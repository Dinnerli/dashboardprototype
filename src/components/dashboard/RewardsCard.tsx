import { Card, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useState } from "react";
import CardHeader from "./CardHeader";
import ViewReportButton from "./ViewReportButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ChartContainer } from "@/components/ui/chart";
import TrendIndicator from "./common/TrendIndicator";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTopCertificates } from "@/hooks/useTopCertificates";
import { useRankLobby } from "@/hooks/useRankLobby";
import styles from './RewardsCard.module.css';
import EmptyState from "./EmptyState";


interface RewardsCardProps {
  startDate: string;
  endDate: string;
  department: string;
}

const RewardsCard = ({ startDate, endDate, department }: RewardsCardProps) => {
  const [selectedTab, setSelectedTab] = useState<'certificates' | 'rank'>('certificates');
  const isMobile = useIsMobile();
  
  // Fetch certificates data from API
  const { data: certificates, loading: certificatesLoading, error: certificatesError } = useTopCertificates({ startDate, endDate, department });
  
  // Fetch rank lobby data from API
  const { data: rankLobbyData, loading: rankLoading, error: rankError } = useRankLobby({ startDate, endDate, department });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' });
  };
  // Skeleton for certificates loading
  const CertificatesSkeleton = () => (
    <div className="flex flex-col w-full h-full animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex p-2.5 justify-between items-center border-b border-[#F5F6F8]">
          <div className="flex h-full items-start pr-2">
            <span className="w-2 p-2.5 text-[#D1D5DB] text-center text-xs self-start bg-gray-200 rounded-full">&nbsp;</span>
          </div>
          <div className="flex py-2.5 px-2.5 flex-col justify-center items-start flex-1">
            <span className="w-32 h-4 bg-gray-200 rounded mb-2"></span>
            <span className="w-24 h-3 bg-gray-100 rounded"></span>
          </div>
          <div className="flex justify-end items-center px-2.5 gap-2">
            <div className="flex flex-col justify-end items-end">
              <span className="w-10 h-6 bg-gray-200 rounded"></span>
            </div>
            <div className="flex justify-end items-end">
              <span className="w-6 h-6 bg-gray-100 rounded-full"></span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Skeleton for rank lobby loading
  const RankLobbySkeleton = () => (
    <div className="flex flex-col w-full h-full animate-pulse gap-2">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="flex p-3 justify-between items-center border-b border-[#F5F6F8]">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div className="flex flex-col">
              <span className="w-20 h-4 bg-gray-200 rounded mb-2"></span>
              <span className="w-16 h-3 bg-gray-100 rounded"></span>
            </div>
          </div>
          <div className="flex flex-col items-center px-4">
            <span className="w-16 h-3 bg-gray-100 rounded mb-1"></span>
            <span className="w-8 h-4 bg-gray-200 rounded"></span>
          </div>
          <div className="flex items-center">
            <span className="w-12 h-6 bg-gray-200 rounded"></span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Card className={`w-auto h-full ${isMobile ? '' : 'min-h-[490px]'} p-6 animate-slide-in-up bg-white overflow-hidden`} 
      style={{ animationDelay: '0.4s' }}>
      <CardHeader title="Rewards" rightContent={isMobile ? null : <ViewReportButton />} />
      <div className="flex flex-col h-full">
        {/* Tabs section - converted to using shadcn Tabs */}
        <Tabs 
          defaultValue="certificates" 
          value={selectedTab} 
          onValueChange={(value) => setSelectedTab(value as 'certificates' | 'rank')}
          className="w-full"
        >
          <TabsList className="flex h-auto justify-start w-full bg-white rounded-none p-0">
            <TabsTrigger 
              value="certificates"
              className={`px-3 py-2 sm:px-5 sm:py-3 rounded-none data-[state=active]:shadow-none data-[state=active]:bg-white relative text-xs sm:text-sm md:text-base font-semibold data-[state=active]:text-[#338FFF] data-[state=inactive]:text-[#8C9BAC] focus-visible:outline-none focus-visible:ring-0 ${isMobile ? 'flex-1' : ''}`}
            >
              {selectedTab === "certificates" && <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#338FFF]"></div>}
              Certificates
            </TabsTrigger>
            <TabsTrigger 
              value="rank"
              className={`px-3 py-2 sm:px-5 sm:py-3 rounded-none data-[state=active]:shadow-none data-[state=active]:bg-white relative text-xs sm:text-sm md:text-base font-semibold data-[state=active]:text-[#338FFF] data-[state=inactive]:text-[#8C9BAC] focus-visible:outline-none focus-visible:ring-0 ${isMobile ? 'flex-1' : ''}`}
            >
              {selectedTab === "rank" && <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#338FFF]"></div>}
              Rank Lobby
            </TabsTrigger>
          </TabsList>          <TabsContent value="certificates" className="m-0 overflow-y-auto">
            {/* Certificate list */}
            <div className="flex flex-col w-full h-full">
              {certificatesLoading ? (
                <CertificatesSkeleton />
              ) : certificatesError ? (
                <div className="p-6 text-center text-red-500">{certificatesError}</div>
              ) : certificates && certificates.length > 0 ? (
                certificates.map((cert, index) => (
                  <div key={cert.name} className="flex p-2.5 justify-between items-center border-b border-[#F5F6F8]">
                    <div className="flex h-full items-start pr-2">
                      <span className="w-2 p-2.5 text-[#4F5A69] text-center text-xs self-start">{index + 1}</span>
                    </div>
                    <div className="flex py-2.5 px-2.5  flex-col justify-center items-start flex-1">
                      <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-[#4F5A69] text-sm font-medium">
                        {cert.name.length > 18 ? cert.name.slice(0, 15) + '...' : cert.name}
                      </span>
                      <span className="w-full text-[#8C9BAC] text-xs pt-1">
                        End date: {formatDate(cert.endDate)}
                      </span>
                    </div>
                    <div className="flex justify-end items-center px-2.5 gap-2">
                      <div className="flex flex-col justify-end items-end">
                        <span className="text-[#4F5A69] font-bold text-2xl">{cert.value}</span>
                      </div>
                      <div className="flex justify-end items-end">
                        <TrendIndicator value={`${Math.abs(cert.trend)}%`} isPositive={cert.rising} />
                      </div>
                    </div>
                  </div>
                ))              ) : (
                <EmptyState cardName="Certificates" />
              )}
            </div>
          </TabsContent>          <TabsContent value="rank" className="mt-4 overflow-hidden">
            <div className="flex flex-col h-full overflow-y-auto gap-2">
              {rankLoading ? (
                <RankLobbySkeleton />
              ) : rankError ? (
                <div className="p-6 text-center text-red-500">{rankError}</div>
              ) : rankLobbyData && rankLobbyData.length > 0 ? (
                rankLobbyData.map((rankItem, index) => (
                  <div
                    key={`${rankItem.rank}-${index}`}
                    className="flex justify-between items-center p-3 border-b border-[#F5F6F8] hover:bg-[#F8F9FA] transition-colors duration-200"
                  >
                    {/* First Column - Image + Title/Badge + User Count */}
                    <div className="flex items-center gap-3">
                      {/* Image */}
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <img 
                          src="/placeholder.svg" 
                          alt={rankItem.rank}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      
                      {/* Two-row content: Title + Badge, User Count */}
                      <div className="flex flex-col gap-1">                        {/* Row 1: Title and Active Badge */}
                        <div className="flex items-center gap-2">
                          <span className="text-[#4F5A69] text-md font-semibold">
                            {rankItem.rank}
                          </span>
                          <span className={cn(
                            "text-[8px] px-2 py-0.5 rounded-full font-light",
                            rankItem.active 
                              ? "bg-green-100 text-green-600" 
                              : "bg-gray-100 text-gray-600"
                          )}>
                            {rankItem.active ? "Active" : "Inactive"}
                          </span>
                        </div>
                        
                        {/* Row 2: Achieved Users Count */}
                        <div className="flex items-center">
                          <span className="text-[#8C9BAC] text-sm font-medium mr-1">Achieved Users |</span>
                          <span className="text-[#4F5A69]
                           font-semibold text-xs">{rankItem.users}</span>
                        </div>
                      </div>
                    </div>                    {/* Second Column - Percentage (with space between) */}
                    <div className="flex items-center ml-8">
                      <span className="text-[#4F5A69] font-semibold text-[22px]">{rankItem.value}</span>
                    </div>
                  </div>
                ))
              ) : (
                <EmptyState cardName="Rank Lobby" />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};

export default RewardsCard;
