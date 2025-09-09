import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { CameraView, Camera } from 'expo-camera';

const { width, height } = Dimensions.get('window');

const ScannerPage = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    try {
      // Parse the QR code data as JSON
      const parsedData = JSON.parse(data);
      setScannedData(parsedData);
      console.log('QR Code scanned:', parsedData);
    } catch (error) {
      console.error('Error parsing QR code data:', error);
      setScannedData({ error: 'Invalid QR code data' });
    }
  };

  const startScanning = () => {
    setIsScanning(true);
    setScanned(false);
    setScannedData(null);
  };

  const stopScanning = () => {
    setIsScanning(false);
    setScanned(false);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <View style={styles.cameraPlaceholder}>
          <Text style={styles.placeholderText}>Requesting camera permission...</Text>
        </View>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <View style={styles.cameraPlaceholder}>
          <Text style={styles.placeholderText}>Camera permission denied</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2c2c2c" />
      
      {/* Camera/Scanner Container */}
      <View style={styles.cameraContainer}>
        {isScanning ? (
          <CameraView
            style={styles.camera}
            facing="back"
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "pdf417"],
            }}
          >
            {/* Scanning Frame Overlay */}
            <View style={styles.overlay}>
              <View style={styles.scanFrame}>
                <View style={[styles.corner, styles.topLeft]} />
                <View style={[styles.corner, styles.topRight]} />
                <View style={[styles.corner, styles.bottomLeft]} />
                <View style={[styles.corner, styles.bottomRight]} />
              </View>
            </View>
          </CameraView>
        ) : (
          <View style={styles.cameraPlaceholder}>
            <View style={styles.packageIcon}>
              📦
            </View>
            <Text style={styles.placeholderText}>Point camera at QR code</Text>
          </View>
        )}
      </View>

      {/* Scan Button */}
      <TouchableOpacity 
        style={styles.scanButton} 
        onPress={isScanning ? stopScanning : startScanning}
      >
        <View style={styles.scanButtonContent}>
          <Text style={styles.cameraIcon}>📷</Text>
          <Text style={styles.scanButtonText}>
            {isScanning ? 'STOP SCAN' : 'SCAN HERE'}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Result Display */}
      <View style={styles.resultContainer}>
        <Text style={styles.resultLabel}>QR Code Result:</Text>
        <View style={styles.resultBox}>
          {scannedData ? (
            scannedData.error ? (
              <Text style={styles.resultText}>{scannedData.error}</Text>
            ) : (
              <>
                {scannedData.role && (
                  <Text style={styles.resultText}>
                    <Text style={styles.resultFieldLabel}>Role: </Text>
                    {scannedData.role}
                  </Text>
                )}
                {Object.entries(scannedData).map(([key, value]) => {
                  // Skip 'role' and 'error' as they are handled separately
                  if (key === 'role' || key === 'error' || value === null || value === undefined) return null;
                  return (
                    <Text key={key} style={styles.resultText}>
                      <Text style={styles.resultFieldLabel}>{key.replace(/([A-Z])/g, ' $1').trim()}: </Text>
                      {typeof value === 'string' ? value : JSON.stringify(value)}
                    </Text>
                  );
                })}
              </>
            )
          ) : (
            <Text style={styles.resultText}>No QR code scanned yet</Text>
          )}
        </View>
        
        {scannedData && (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={() => {
              setScannedData(null);
              setScanned(false);
            }}
          >
            <Text style={styles.clearButtonText}>Clear Result</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c2c2c',
    paddingTop: StatusBar.currentHeight || 40,
  },
  cameraContainer: {
    width: width - 40,
    height: width - 40,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 30,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#8b7355',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  cameraPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8b7355',
  },
  packageIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  placeholderText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 200,
    height: 200,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: 'white',
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  scanButton: {
    backgroundColor: '#6b5a47',
    marginHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scanButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  scanButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  resultContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  resultLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  resultBox: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    minHeight: 80,
    justifyContent: 'center',
  },
  resultText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 4,
  },
  resultFieldLabel: {
    fontWeight: '600',
    color: '#000',
  },
  clearButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 15,
    alignSelf: 'center',
    paddingHorizontal: 30,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ScannerPage;