import Card from '@/components/card';
import React from 'react';
import AllocationChart from './chart';
import {
  Avalanche,
  BnB,
  Cosmos,
  Osmosis,
  Others,
  Solana,
} from '@/components/icons';
import Typography from '@/components/typography';
import { RenderWhenInView } from '@/animations';
import { useInView } from 'react-intersection-observer';

export default function Allocation() {
  const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger once when the item comes into view
    threshold: 0, // Define the visibility threshold
  });

  const data = [
    {
      name: 'Solana',
      value: '33.3%',
      icon: <Solana />,
    },
    {
      name: 'Osmosis',
      value: '33.3%',
      icon: <Osmosis />,
    },
    {
      name: 'Cosmos',
      value: '33.3%',
      icon: <Cosmos />,
    },
    {
      name: 'BNB Chain',
      value: '0%',
      icon: <BnB />,
    },
    {
      name: 'Avalanche',
      value: '0%',
      icon: <Avalanche />,
    },
    {
      name: 'Others',
      value: '0%',
      icon: <Others />,
    },
  ];
  return (
    <Card title="Locked Asset Allocation">
      <div className="md:grid md:grid-cols-[70%_auto_10%]">
        <div className="">
          <div className=" overflow-hidden relative flex items-center justify-center">
            {inView ? <AllocationChart /> : null}
          </div>
        </div>
        <div className="mt-5">
          {data.map((_data, index) => {
            return (
              <div
                ref={index == 3 ? ref : null}
                key={index}
                className="flex py-[8px] justify-between items-center"
              >
                <div className="flex  items-center">
                  <div className="mr-2">{_data.icon}</div>
                  <Typography
                    variant="body2"
                    className="!font-ibm-plex-semi-bold"
                    label={_data.name}
                  />
                </div>
                <div>
                  <Typography
                    variant="body2"
                    className="!font-noto-sans"
                    label={_data.value}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div></div>
      </div>
    </Card>
  );
}
