import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Typography from '../typography';
import Badge from '../badge';
import Button from '../button';
import classNames from 'classnames';
import BuyCoinModal from '@/modules/home/buyCoin/buyCoinModal';

const ExchangeRateChart = () => {
  const [data, setData] = useState([]);
  const [showBuyFortuna, setShowBuyFortuna] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://cdn.jsdelivr.net/gh/highcharts/highcharts@v10.3.3/samples/data/usdeur.json'
        );
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const config = {
    chart: {
      // zoomType: "x",
      type: 'area',
      zoomType: 'x',
      panning: true,
      panKey: 'shift',
      scrollablePlotArea: {
        minWidth: 600,
      },
      backgroundColor: 'transparent',
    },
    title: {
      text: null,
    },
    credits: {
      enabled: false, // Hide x-axis category labels
    },

    xAxis: {
      type: 'datetime',
      labels: {
        style: {
          color: '#FFF', // X-axis label color
          fontFamily: 'Inter',
          fontSize: '12px', // X-axis label font size
          opacity: '0.30000001192092896',

          // Add more styling properties as needed
        },
      },
    },
    yAxis: {
      gridLineWidth: 1,
      gridLineColor: 'rgba(255, 255, 255,.1)',
      gridLineDashStyle: 'Dash',
      title: '',
      labels: {
        style: {
          color: '#FFF', // X-axis label color
          fontFamily: 'Inter',
          fontSize: '12px', // X-axis label font size
          opacity: '0.30000001192092896',

          // Add more styling properties as needed
        },
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      area: {
        fillColor: 'rgba(123, 97, 255, 0.1)',
        marker: {
          radius: 2,
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1,
          },
        },
        threshold: null,
      },
    },
    series: [
      {
        type: 'area',
        name: 'USD to EUR',
        data: data,
        color: '#DE1EFD',
      },
    ],
  };

  const filterBy = ['24H', '7D', '30D', '90D', '1Y', 'ALL'];

  return (
    <div>
      <div className="md:flex md:justify-between md:text-start text-center">
        <div>
          <Typography
            label="Current Balance"
            variant="body2"
            className="opacity-[0.5]"
          />
          <div className="md:flex md:items-center">
            <div className="md:flex md:items-center">
              <Typography
                label="$ -"
                className="!text-[54px] !font-aeonik-pro !font-normal"
              />
              {/* <div>
                <div className="md:flex inline-block  mx-auto align-top h-full md:-mt-5">
                  <Badge
                    className="!py-1 ml-4"
                    rightComponent={
                      <svg
                        width={10}
                        height={9}
                        className="ml-1"
                        viewBox="0 0 10 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.5835 7.91667L8.50016 1M8.50016 1V5.16667M8.50016 1H4.37516"
                          stroke="#2EBE7B"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                    theme="success"
                    label="+12px"
                    outline
                  />
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="flex items-center md:justify-start justify-center md:mt-0 mt-5">
          <Button
            theme="transparent"
            leftComponent={
              <div className="bg-white w-[14px] mr-3 h-[14px] rounded-full">
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 2.9165V11.0832"
                    stroke="#343436"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.9165 7H11.0832"
                    stroke="#343436"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            }
            label="Invest"
            className="flex text-white py-3 px-7 items-center justify-center "
          ></Button>
          <div className="mx-3"></div>
          <Button
            onClick={() => setShowBuyFortuna(true)}
            theme="secondary"
            label="Buy FORTUNA"
          />
        </div>
      </div>

      <div className="md:flex hidden justify-between py-7">
        <div className="flex items-center">
          {/*     <Button size="small" theme="transparent" label="Deposit" />
          <div className="mx-1"></div>
          <Button size="small" theme="transparent" label="Convert" />
          <div className="mx-1"></div>

          <Button size="small" theme="transparent" label="Withdraw" /> */}
        </div>
        <div>
          <div className="flex items-start justify-between">
            {filterBy.map((_option, index) => {
              const activeStyle = classNames({
                'bg-[#2C2C33]': index == 2,
              });
              return (
                <Typography
                  variant="body1"
                  className={`!font-aeonik-pro px-3 py-2 ml-2  rounded-[5px] cursor-pointer hover:bg-[#2C2C33] transition-all ${activeStyle}`}
                  key={index}
                  label={_option}
                />
              );
            })}
          </div>
        </div>
      </div>
      {data.length > 0 ? (
        <div className="home-chart">
          <HighchartsReact highcharts={Highcharts} options={config} />
        </div>
      ) : (
        <div>Loading...</div>
      )}

      {showBuyFortuna ? (
        <BuyCoinModal onClose={() => setShowBuyFortuna(false)} />
      ) : null}
    </div>
  );
};

export default ExchangeRateChart;
