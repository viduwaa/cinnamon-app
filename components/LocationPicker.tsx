import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import Constants from 'expo-constants';

interface LocationPickerProps {
  onLocationSelect: (locationData: any) => void;
  drawingData: any;
}

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface Region extends Coordinate {
  latitudeDelta: number;
  longitudeDelta: number;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelect, drawingData }) => {
  const [selectedCoordinate, setSelectedCoordinate] = useState<Coordinate | null>(null);
  const [region, setRegion] = useState<Region>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>('');

  useEffect(() => {
    getCurrentLocation();
    checkApiKey();
  }, []);

  const checkApiKey = () => {
    const androidKey = Constants.expoConfig?.android?.config?.googleMaps?.apiKey;
    const envKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
    
    let debug = `Android Key: ${androidKey ? 'Found' : 'Missing'}\n`;
    debug += `Env Key: ${envKey ? 'Found' : 'Missing'}\n`;
    debug += `Using: ${androidKey || envKey || 'None'}`;
    
    setDebugInfo(debug);
    
    if (!androidKey && !envKey) {
      Alert.alert(
        'Google Maps API Key Missing',
        'Please add your Google Maps API key to app.json and .env file'
      );
    }
  };

  const requestLocationPermission = async (): Promise<boolean> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      const granted = status === 'granted';
      setLocationPermissionGranted(granted);
      return granted;
    } catch (error) {
      console.warn('Error requesting location permission:', error);
      return false;
    }
  };

  const getCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    
    if (hasPermission) {
      try {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        
        const { latitude, longitude } = location.coords;
        const newRegion: Region = {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setRegion(newRegion);
        console.log('Current location:', latitude, longitude);
      } catch (error) {
        console.log('Location error:', error);
        Alert.alert(
          'Location Error',
          'Could not get your current location. Using default location. You can still manually select your farm location.'
        );
      }
    } else {
      Alert.alert(
        'Location Permission',
        'Location permission is needed to help you find your farm location. You can still manually select the location on the map.'
      );
    }
  };

  const handleMapPress = (event: any) => {
    const coordinate = event.nativeEvent.coordinate;
    setSelectedCoordinate(coordinate);
    console.log('Selected coordinate:', coordinate);
  };

  const handleMapReady = () => {
    console.log('Map is ready!');
    setMapReady(true);
  };

  const handleMapError = (error: any) => {
    console.error('Map error:', error);
    Alert.alert(
      'Map Error',
      'There was an error loading the map. Please check your Google Maps API key configuration.'
    );
  };

  const confirmLocation = () => {
    if (!selectedCoordinate) {
      Alert.alert('No Location Selected', 'Please tap on the map to select your farm location');
      return;
    }

    const locationData = {
      coordinate: selectedCoordinate,
      drawingData: drawingData,
      region: {
        ...selectedCoordinate,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
    };

    onLocationSelect(locationData);
  };

  const resetSelection = () => {
    setSelectedCoordinate(null);
  };

  const showDebugInfo = () => {
    Alert.alert('Debug Info', debugInfo);
  };

  // Get Google Maps API key from environment
  const googleMapsApiKey = Constants.expoConfig?.android?.config?.googleMaps?.apiKey || 
                          process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Farm Location</Text>
      <Text style={styles.instruction}>
        Tap on the map where your farm is located
      </Text>

      {/* Debug Info Button - Remove in production */}
      {__DEV__ && (
        <TouchableOpacity style={styles.debugButton} onPress={showDebugInfo}>
          <Text style={styles.debugButtonText}>Debug Info</Text>
        </TouchableOpacity>
      )}

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
        region={region}
        onPress={handleMapPress}
        onMapReady={handleMapReady}
        onError={handleMapError}
        mapType="hybrid" // Changed from "satellite" - try hybrid for better loading
        showsUserLocation={locationPermissionGranted}
        showsMyLocationButton={locationPermissionGranted}
        showsCompass={true}
        showsScale={true}
        googleMapsApiKey={googleMapsApiKey}
        // Additional props that might help
        loadingEnabled={true}
        loadingIndicatorColor="#2196F3"
        loadingBackgroundColor="#ffffff"
      >
        {selectedCoordinate && (
          <Marker
            coordinate={selectedCoordinate}
            title="Your Farm Location"
            description="This is where your farm is located"
            pinColor="red"
          />
        )}
      </MapView>

      {!mapReady && (
        <View style={styles.loadingOverlay}>
          <Text style={styles.loadingText}>Loading map...</Text>
        </View>
      )}

      {selectedCoordinate && (
        <View style={styles.coordinateInfo}>
          <Text style={styles.coordinateText}>
            Selected Location:
          </Text>
          <Text style={styles.coordinateValue}>
            Lat: {selectedCoordinate.latitude.toFixed(6)}
          </Text>
          <Text style={styles.coordinateValue}>
            Lng: {selectedCoordinate.longitude.toFixed(6)}
          </Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={resetSelection}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            styles.confirmButton,
            !selectedCoordinate && styles.disabledButton
          ]}
          onPress={confirmLocation}
          disabled={!selectedCoordinate}
        >
          <Text style={styles.buttonText}>Confirm Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  instruction: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
    paddingHorizontal: 20,
  },
  debugButton: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    alignSelf: 'center',
    marginBottom: 10,
  },
  debugButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  map: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
  },
  loadingOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
    zIndex: 1000,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  coordinateInfo: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    margin: 10,
    borderRadius: 10,
  },
  coordinateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  coordinateValue: {
    fontSize: 14,
    color: '#666',
    marginVertical: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 120,
  },
  resetButton: {
    backgroundColor: '#FF5722',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LocationPicker;