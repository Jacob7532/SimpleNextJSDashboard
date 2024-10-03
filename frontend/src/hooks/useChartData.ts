import { useState, useEffect } from 'react';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

//interface for chart data sets
interface ChartData {
  data: Array<{ name: string; value: number }>;
}

//interface for candlestick data
interface CandlestickData {
  data: Array<{
    x: string;
    open: number;
    high: number;
    low: number;
    close: number;
  }>;
}

//Hook used to fetch chart data from Django API
export const useChartData = () => {
  const [lineData, setLineData] = useState<ChartData>({ data: [] });
  const [barData, setBarData] = useState<ChartData>({ data: [] });
  const [pieData, setPieData] = useState<ChartData>({ data: [] });
  const [candlestickData, setCandlestickData] = useState<CandlestickData>({ data: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lineResponse, barResponse, pieResponse, candlestickResponse] = await Promise.all([
          fetch(`${API_URL}/api/line-chart-data/`),
          fetch(`${API_URL}/api/bar-chart-data/`),
          fetch(`${API_URL}/api/pie-chart-data/`),
          fetch(`${API_URL}/api/candlestick-data/`),
        ]);

        const [lineResult, barResult, pieResult, candlestickResult] = await Promise.all([
          lineResponse.json(),
          barResponse.json(),
          pieResponse.json(),
          candlestickResponse.json(),
        ]);

        //Checks for the API responses
        console.log('API responses:', { lineResult, barResult, pieResult, candlestickResult });

        setLineData({
          data: lineResult.labels.map((label: string, index: number) => ({
            name: label,
            value: lineResult.data[index]
          }))
        });

        setBarData({
          data: barResult.labels.map((label: string, index: number) => ({
            name: label,
            value: barResult.data[index]
          }))
        });

        setPieData({
          data: pieResult.labels.map((label: string, index: number) => ({
            name: label,
            value: pieResult.data[index]
          }))
        });

        setCandlestickData({
          data: candlestickResult.data.map((item: any) => ({
            x: item.x,
            open: parseFloat(item.open),
            high: parseFloat(item.high),
            low: parseFloat(item.low),
            close: parseFloat(item.close)
          }))
        });

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return { lineData, barData, pieData, candlestickData };
};