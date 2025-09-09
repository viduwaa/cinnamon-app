import { View, Text } from 'react-native';
import React from 'react';
import QRGenerator from '@/components/QRGenerator';

type QRConfig = {
    role: string;
    fields: { key: string; label: string; sourceKey: string; defaultValue?: string }[];
    storageKeys: string[];
};

const QRCode = () => {
    const FarmerQRConfig: QRConfig = {
        role: "Farmer",
        storageKeys: ['farmerData', 'batchData', 'harvestData'],
        fields: [
            { key: 'farmName', label: 'Farm Name', sourceKey: 'farmerData' },
            { key: 'dateOfPlanting', label: 'Date of Planting', sourceKey: 'farmerData' },
            { key: 'farmName', label: 'Batch ID', sourceKey: 'batchData', defaultValue: 'N/A' }, // Assuming batchID is farmName
            { key: 'seedingSource', label: 'Number of Trees', sourceKey: 'batchData' },
            { key: 'dateOfPlanting', label: 'Expected Harvest Date', sourceKey: 'batchData' },
            { key: 'quantity', label: 'Harvest Quantity', sourceKey: 'harvestData' },
            { key: 'harvestMethod', label: 'Harvest Method', sourceKey: 'harvestData' },
        ],
    };
    return <QRGenerator config={FarmerQRConfig} />;
};

export default QRCode;