import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableColumn,
  Progress,
  ResponseErrorPanel,
} from '@backstage/core-components';
import useAsync from 'react-use/lib/useAsync';

// Define the type for ride pricing
type RidePricing = {
  vehicleType: string;
  baseKms: number;
  baseRateDay: number;
  baseRateNight: number;
  perKmsDay: number;
  perKmsNight: number;
};

type DenseTableProps = {
  pricing: RidePricing[];
};

export const DenseTable = ({ pricing }: DenseTableProps) => {
  const columns: TableColumn[] = [
    { title: 'Vehicle Type', field: 'vehicleType' },
    { title: 'Base KMS', field: 'baseKms' },
    { title: 'Base Rate - Day Time (INR)', field: 'baseRateDay' },
    { title: 'Base Rate - Night Time (INR)', field: 'baseRateNight' },
    { title: 'Per KMS - Day Time (INR)', field: 'perKmsDay' },
    { title: 'Per KMS - Night Time (INR)', field: 'perKmsNight' },
  ];

  const data = pricing.map(item => ({
    vehicleType: item.vehicleType,
    baseKms: item.baseKms,
    baseRateDay: item.baseRateDay,
    baseRateNight: item.baseRateNight,
    perKmsDay: item.perKmsDay,
    perKmsNight: item.perKmsNight,
  }));

  return (
    <Table
      title="Ride Pricing"
      options={{ search: true, paging: true, sorting: false }}
      columns={columns}
      data={data}
    />
  );
};

export const ExampleFetchComponent = () => {
  const { value, loading, error } = useAsync(async (): Promise<RidePricing[]> => {
    // Replace this URL with your actual API endpoint
    const response = await fetch('http://localhost:8080/api/pricingdetails');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <ResponseErrorPanel error={error} />;
  }

  return <DenseTable pricing={value || []} />;
};
