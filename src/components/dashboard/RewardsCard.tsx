import { Card, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Filter } from "lucide-react";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";


interface RewardsCardProps {
  startDate: string;
  endDate: string;
  department: string;
}

// Extended interfaces to include language field for filtering
interface ExtendedRankLobbyItem {
  rank: string;
  active: boolean;
  users: number;
  value: string;
  language?: string;
}

interface ExtendedCertificate {
  name: string;
  value: number;
  trend: number;
  rising: boolean;
  endDate: string;
  language?: string;
  active?: boolean;
}

const RewardsCard = ({ startDate, endDate, department }: RewardsCardProps) => {
  const [selectedTab, setSelectedTab] = useState<'certificates' | 'rank'>('certificates');
  const isMobile = useIsMobile();
  
  // Filter states
  const [languageFilters, setLanguageFilters] = useState({
    english: true,   // language: "1"
    sinhala: true,   // language: "2"
    tamil: true      // language: "3"
  });
  
  const [statusFilters, setStatusFilters] = useState({
    active: true,
    inactive: true
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Fetch certificates data from API
  const { data: certificates, loading: certificatesLoading, error: certificatesError } = useTopCertificates({ startDate, endDate, department });
    // Fetch rank lobby data from API
  const { data: rankLobbyData, loading: rankLoading, error: rankError } = useRankLobby({ startDate, endDate, department });
  // Filter functions
  const filterByLanguage = (item: ExtendedRankLobbyItem | ExtendedCertificate) => {
    if (!item.language) return true; // If no language field, show all
    const lang = item.language.toString();
    if (lang === "1" && languageFilters.english) return true;
    if (lang === "2" && languageFilters.sinhala) return true;
    if (lang === "3" && languageFilters.tamil) return true;
    return false;
  };

  const filterByStatus = (item: ExtendedRankLobbyItem | ExtendedCertificate) => {
    if (typeof item.active === 'undefined') return true; // If no active field, show all
    if (item.active && statusFilters.active) return true;
    if (!item.active && statusFilters.inactive) return true;
    return false;
  };
  // Apply filters to data
  const filteredRankLobbyData = (rankLobbyData as ExtendedRankLobbyItem[])?.filter(item => 
    filterByLanguage(item) && filterByStatus(item)
  ) || [];

  // Filter certificates data (assuming certificates also have language field)
  const filteredCertificates = (certificates as ExtendedCertificate[])?.filter(item => 
    filterByLanguage(item) && filterByStatus(item)
  ) || [];

  // Filter UI handlers
  const handleLanguageFilterChange = (language: 'english' | 'sinhala' | 'tamil', checked: boolean) => {
    setLanguageFilters(prev => ({ ...prev, [language]: checked }));
  };

  const handleStatusFilterChange = (status: 'active' | 'inactive', checked: boolean) => {
    setStatusFilters(prev => ({ ...prev, [status]: checked }));
  };

  // Function to get rank image based on index (loop through 9 images)
  const getRankImage = (index: number) => {
    const imageNumber = (index % 9) + 1;
    const paddedNumber = imageNumber.toString().padStart(2, '0');
    return `/rank-map/rank-${paddedNumber}.svg`;
  };

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
  );  return (
    <Card className={`w-auto h-full ${isMobile ? '' : 'min-h-[490px]'} p-6 animate-slide-in-up bg-white flex flex-col overflow-hidden`} 
      style={{ animationDelay: '0.4s' }}>      {/* Header - Fixed at top */}
      <CardHeader title="Rewards" 
      rightContent={selectedTab === 'rank' ? (
        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <button 
              className="flex items-center justify-center   transition-colors"
              aria-label="Filter options"
              title="Filter options"
            >
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-52 p-0" align="end">
            <div className="p-4 pt-0">
                         
              <Accordion type="multiple" defaultValue={["language", "status"]} className="w-full">                {/* Language Accordion */}
                <AccordionItem value="language">
                  <AccordionTrigger className="text-sm font-medium text-[#4F5A69] hover:no-underline">Language</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 ">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="english"
                          checked={languageFilters.english}
                          onCheckedChange={(checked) => handleLanguageFilterChange('english', checked as boolean)}
                        />
                        <label htmlFor="english" className="text-sm text-[#4F5A69] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          English
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="sinhala"
                          checked={languageFilters.sinhala}
                          onCheckedChange={(checked) => handleLanguageFilterChange('sinhala', checked as boolean)}
                        />
                        <label htmlFor="sinhala" className="text-sm text-[#4F5A69] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Sinhala
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="tamil"
                          checked={languageFilters.tamil}
                          onCheckedChange={(checked) => handleLanguageFilterChange('tamil', checked as boolean)}
                        />
                        <label htmlFor="tamil" className="text-sm text-[#4F5A69] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Tamil
                        </label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>                {/* Status Accordion */}
                <AccordionItem value="status" className="border-b-0">
                  <AccordionTrigger className="text-sm font-medium text-[#4F5A69] hover:no-underline">Status</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="active"
                          checked={statusFilters.active}
                          onCheckedChange={(checked) => handleStatusFilterChange('active', checked as boolean)}
                        />
                        <label htmlFor="active" className="text-sm text-[#4F5A69] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Active
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="inactive"
                          checked={statusFilters.inactive}
                          onCheckedChange={(checked) => handleStatusFilterChange('inactive', checked as boolean)}
                        />
                        <label htmlFor="inactive" className="text-sm text-[#4F5A69] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Inactive
                        </label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </PopoverContent>
        </Popover>
      ) : null} />
      
      {/* Tabs section - Fixed below header */}      <Tabs 
        defaultValue="certificates" 
        value={selectedTab} 
        onValueChange={(value) => {
          setSelectedTab(value as 'certificates' | 'rank');
          setIsFilterOpen(false); // Close filter popover when switching tabs
        }}
        className="w-full flex flex-col flex-1 min-h-0"
      >
        {/* Tab headers - Fixed */}
        <TabsList className="flex h-auto justify-start w-full bg-white rounded-none p-0 flex-shrink-0">
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
        </TabsList>

        {/* Scrollable content area */}        <TabsContent value="certificates" className="m-0 flex-1 overflow-y-auto minimal-scrollbar min-h-0">
          <div className="py-2.5 flex flex-col gap-2.5 transition-all duration-300">
              {certificatesLoading ? (
                <CertificatesSkeleton />
              ) : certificatesError ? (
                <div className="p-6 text-center text-red-500">{certificatesError}</div>
              ) : filteredCertificates && filteredCertificates.length > 0 ? (
                filteredCertificates.map((cert, index) => (
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
                ))            ) : (
              <EmptyState cardName="Certificates" />
            )}
          </div>
        </TabsContent>        <TabsContent value="rank" className="m-0 flex-1 overflow-y-auto minimal-scrollbar min-h-0">
          <div className="py-2.5 flex flex-col gap-2.5 transition-all duration-300">
            {rankLoading ? (
              <RankLobbySkeleton />
            ) : rankError ? (
              <div className="p-6 text-center text-red-500">{rankError}</div>
            ) : filteredRankLobbyData && filteredRankLobbyData.length > 0 ? (
              filteredRankLobbyData.map((rankItem, index) => (
                <div
                  key={`${rankItem.rank}-${index}`}
                  className="flex justify-between items-center p-3 border-b border-[#F5F6F8] hover:bg-[#F8F9FA] transition-colors duration-200"
                >                  {/* First Column - Image + Title/Badge + User Count */}
                  <div className="flex items-center gap-3">
                    {/* Image */}
                    <div className="w-12 h-12 bg-gradient-to-br  rounded-full flex items-center justify-center flex-shrink-0">
                      <img 
                        src={getRankImage(index)} 
                        alt={rankItem.rank}
                        className="w-12 h-12 object-contain"
                        onError={(e) => {
                          // Fallback to placeholder if rank image fails to load
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    
                    {/* Two-row content: Title + Badge, User Count */}
                    <div className="flex flex-col gap-1">                      
                      {/* Row 1: Title and Active Badge */}
                      <div className="flex items-center gap-2">
                        <span className="text-[#4F5A69] text-md font-medium overflow-hidden text-ellipsis whitespace-nowrap max-w-[120px]">
                          {rankItem.rank.length > 15 ? rankItem.rank.slice(0, 12) + '...' : rankItem.rank}
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
                        <span className="text-[#8C9BAC] text-sm font-medium mr-1">Achieved Users : </span>
                        <span className="text-[#4F5A69] font-semibold text-sm">{rankItem.users}</span>
                      </div>
                    </div>
                  </div>

                  {/* Second Column - Percentage (with space between) */}
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
    </Card>
  );
};

export default RewardsCard;
