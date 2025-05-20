import { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import { TabType } from './ActivityTabs';
import { createBaseChartOptions, updateChartOptions, createInitialSeries } from './chartConfigUtils';

export const useChartOptions = (chartType: TabType, selectedStat: string | null) => {
  const [chartOptions, setChartOptions] = useState<Highcharts.Options>(() => {
    const baseOptions = createBaseChartOptions();
    baseOptions.series = createInitialSeries();
    return baseOptions;
  });

  // Update chart data when chartType or selectedStat changes
  useEffect(() => {
    setChartOptions(prevOptions => updateChartOptions(chartType, prevOptions, selectedStat));
  }, [chartType, selectedStat]);

  return chartOptions;
};
