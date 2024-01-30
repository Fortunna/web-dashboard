import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const DoughnutChart = () => {
  const data = [
    {
      name: 'Solana',
      y: 33.3,
      color: '#8C4EF6',
    },
    {
      name: 'Osmosis',
      y: 33.3,
      color: '#CE1AC9',
    },
    {
      name: 'Cosmos',
      y: 33.3,
      color: '#BA3FD9',
    },
    {
      name: 'BNB Chain',
      y: 0,
      color: '#F3BA30',
    },
    {
      name: 'Avalanche',
      y: 0,
      color: '#E93F3F',
    },
    {
      name: 'Others',
      y: 0,
      color: '#999999',
    },
  ];
  const options = {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
    },
    credits: {
      enabled: false,
    },
    title: {
      text: null,
    },
    plotOptions: {
      pie: {
        innerSize: '70%',
        depth: 45,
        dataLabels: {
          enabled: false,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },
    series: [
      {
        name: 'Percentage',
        // colorByPoint: true,
        borderWidth: 0,
        data: [...data],
      },
    ],
  };

  return (
    <span className="allocation-chart">
      <HighchartsReact highcharts={Highcharts} options={options} />{' '}
    </span>
  );
};

export default DoughnutChart;
