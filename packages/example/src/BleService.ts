import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import BleManager from 'react-native-ble-plx';

export const BleService = () => {
  const [bleManager, setBleManager] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    BleManager.enableBluetooth()
      .then(() => {
        console.log('Bluetooth enabled');
        return BleManager.start({ showAlert: true });
      })
      .then(() => {
        console.log('BleManager started');
        setBleManager(new BleManager());
      })
      .catch((error) => console.error('Error starting BleManager', error));

    return () => {
      if (bleManager) {
        bleManager.stopDeviceScan();
      }
    };
  }, []);

  useEffect(() => {
    if (bleManager) {
      const startScan = () => {
        bleManager
          .startDeviceScan(null, null, 5000)
          .then(() => setIsScanning(true))
          .catch((error) => console.error('Error starting scan', error));
      };

      const stopScan = () => {
        bleManager
          .stopDeviceScan()
          .then(() => setIsScanning(false))
          .catch((error) => console.error('Error stopping scan', error));
      };

      bleManager.onStateChange((state) => {
        if (state === 'poweredOn') {
          startScan();
        } else {
          stopScan();
        }
      });

      bleManager.onDeviceFound((device) => {
        setDevices((prevDevices) => {
          if (!prevDevices.some((d) => d.id === device.id)) {
            return [...prevDevices, device];
          }
          return prevDevices;
        });
      });

      return () => {
        bleManager.stopDeviceScan();
      };
    }
  }, [bleManager]);

  return (
    <View>
      <Text>Bluetooth Devices:</Text>
      {devices.map((device, index) => (
        <Text key={index}>
          {device.name} - {device.id}
        </Text>
      ))}
      <Text>Scanning: {isScanning ? 'Yes' : 'No'}</Text>
    </View>
  );
};
