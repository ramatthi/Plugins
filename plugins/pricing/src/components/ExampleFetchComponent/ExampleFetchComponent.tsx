import React, { useState } from 'react';
import {
  Table,
  TableColumn,
  Progress,
  ResponseErrorPanel,
} from '@backstage/core-components';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';


import useAsync from 'react-use/lib/useAsync';

type RidePricing = {
  id: number; // Added ID to the type
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
  const [open, setOpen] = useState(false);
  const [currentData, setCurrentData] = useState<RidePricing | null>(null);

  const handleClickOpen = (row: RidePricing) => {
    setCurrentData(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentData(null);
  };

  const handleSave = async () => {
    if (!currentData) return;

    await fetch(`http://localhost:8080/api/updatePricing/${currentData.id}`, { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        baseKms: currentData.baseKms,
        baseRateDay: currentData.baseRateDay,
        baseRateNight: currentData.baseRateNight,
        perKmsDay: currentData.perKmsDay,
        perKmsNight: currentData.perKmsNight,
      }),
    });

    handleClose();
  };

  const columns: TableColumn<RidePricing>[] = [
    { title: 'Vehicle Type', field: 'vehicleType' },
    { title: 'Base KMS', field: 'baseKms' },
    { title: 'Base Rate - Day Time (INR)', field: 'baseRateDay' },
    { title: 'Base Rate - Night Time (INR)', field: 'baseRateNight' },
    { title: 'Per KMS - Day Time (INR)', field: 'perKmsDay' },
    { title: 'Per KMS - Night Time (INR)', field: 'perKmsNight' },
    {
      title: 'Actions',
      render: (rowData: RidePricing) => (
        <Button variant="contained" color="primary" onClick={() => handleClickOpen(rowData)}>
          Edit
        </Button>
      ),
     

    },
  ];

  const data = pricing.map(item => ({
    id: item.id, 
    vehicleType: item.vehicleType,
    baseKms: item.baseKms,
    baseRateDay: item.baseRateDay,
    baseRateNight: item.baseRateNight,
    perKmsDay: item.perKmsDay,
    perKmsNight: item.perKmsNight,
  }));

  return (
    <>
      <Table
        title="Ride Pricing"
        options={{ search: true, paging: true, sorting: false }}
        columns={columns}
        data={data}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Ride Pricing</DialogTitle>
        <DialogContent>
          {currentData && (
            <>
               <TextField
                label="Vehicle Type"
                value={currentData.vehicleType}
                InputProps={{
                  readOnly: true, 
                }}
                fullWidth
              />
              <TextField
                label="Base KMS"
                type="number"
                value={currentData.baseKms}
                onChange={(e) => setCurrentData({ ...currentData, baseKms: Number(e.target.value) })}
                fullWidth
              />
              <TextField
                label="Base Rate - Day Time (INR)"
                type="number"
                value={currentData.baseRateDay}
                onChange={(e) => setCurrentData({ ...currentData, baseRateDay: Number(e.target.value) })}
                fullWidth
              />
              <TextField
                label="Base Rate - Night Time (INR)"
                type="number"
                value={currentData.baseRateNight}
                onChange={(e) => setCurrentData({ ...currentData, baseRateNight: Number(e.target.value) })}
                fullWidth
              />
              <TextField
                label="Per KMS - Day Time (INR)"
                type="number"
                value={currentData.perKmsDay}
                onChange={(e) => setCurrentData({ ...currentData, perKmsDay: Number(e.target.value) })}
                fullWidth
              />
              <TextField
                label="Per KMS - Night Time (INR)"
                type="number"
                value={currentData.perKmsNight}
                onChange={(e) => setCurrentData({ ...currentData, perKmsNight: Number(e.target.value) })}
                fullWidth
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const ExampleFetchComponent = () => {
  const { value, loading, error } = useAsync(async (): Promise<RidePricing[]> => {
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
