
import { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import { TabType } from './ActivityTabs';
import { createBaseChartOptions, updateChartOptions, createInitialSeries } from './chartConfigUtils';

export const useChartOptions = (chartType: TabType) => {
  const [chartOptions, setChartOptions] = useState<Highcharts.Options>(() => {
    const baseOptions = createBaseChartOptions();
    baseOptions.series = createInitialSeries();
    return baseOptions;
  });

  // Update chart data when chartType changes
  useEffect(() => {
    setChartOptions(prevOptions => updateChartOptions(chartType, prevOptions));
  }, [chartType]);

  return chartOptions;
};
