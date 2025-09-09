import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Text,
} from 'react-native';
import { Stack } from 'expo-router';
import FarmDrawing from '@/components/FarmDrawing';
import LocationPicker from '@/components/LocationPicker';
import FarmMapView from '@/components/FarmMapView';
import { FarmStorage } from '@/utils/FarmStorage'

type StepType = 'loading' | 'drawing' | 'location' | 'map';

const FarmScreen = () => {
  const [currentStep, setCurrentStep] = useState<StepType>('loading');
  const [drawingData, setDrawingData] = useState<any>(null);
  const [farmData, setFarmData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkExistingFarmData();
  }, []);

  const checkExistingFarmData = async () => {
    try {
      setIsLoading(true);
      const existingFarmData = await FarmStorage.loadFarmData();
      
      if (existingFarmData) {
        // Farm data exists, show the map view
        setFarmData(existingFarmData);
        setCurrentStep('map');
      } else {
        // No farm data, start with drawing
        setCurrentStep('drawing');
      }
    } catch (error) {
      console.error('Error checking farm data:', error);
      Alert.alert('Error', 'Could not load farm data. Starting fresh.');
      setCurrentStep('drawing');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrawingComplete = (drawingResult: any) => {
    console.log('Drawing completed:', drawingResult);
    setDrawingData(drawingResult);
    setCurrentStep('location');
  };

  const handleLocationSelect = async (locationData: any) => {
    console.log('Location selected:', locationData);
    
    try {
      // Combine drawing and location data
      const completeFarmData = {
        coordinate: locationData.coordinate,
        drawingData: locationData.drawingData,
        region: locationData.region,
        timestamp: Date.now(),
      };

      // Save to storage
      const saved = await FarmStorage.saveFarmData(completeFarmData);
      
      if (saved) {
        setFarmData(completeFarmData);
        setCurrentStep('map');
        Alert.alert('Success', 'Your farm has been mapped successfully!');
      } else {
        Alert.alert('Error', 'Could not save farm data. Please try again.');
      }
    } catch (error) {
      console.error('Error saving farm data:', error);
      Alert.alert('Error', 'An error occurred while saving your farm data.');
    }
  };

  const handleEditFarm = () => {
    Alert.alert(
      'Edit Farm',
      'What would you like to edit?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Redraw Boundary',
          onPress: () => {
            setDrawingData(null);
            setCurrentStep('drawing');
          }
        },
        {
          text: 'Change Location',
          onPress: () => {
            if (farmData && farmData.drawingData) {
              setDrawingData(farmData.drawingData);
              setCurrentStep('location');
            } else {
              // If no drawing data, start from drawing
              setDrawingData(null);
              setCurrentStep('drawing');
            }
          }
        },
      ]
    );
  };

  const handleDeleteFarm = async () => {
    try {
      const deleted = await FarmStorage.deleteFarmData();
      if (deleted) {
        setFarmData(null);
        setDrawingData(null);
        setCurrentStep('drawing');
        Alert.alert('Success', 'Farm data has been deleted.');
      } else {
        Alert.alert('Error', 'Could not delete farm data.');
      }
    } catch (error) {
      console.error('Error deleting farm data:', error);
      Alert.alert('Error', 'An error occurred while deleting farm data.');
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'loading':
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2196F3" />
            <Text style={styles.loadingText}>Loading your farm data...</Text>
          </View>
        );

      case 'drawing':
        return (
          <FarmDrawing onDrawingComplete={handleDrawingComplete} />
        );

      case 'location':
        return (
          <LocationPicker
            onLocationSelect={handleLocationSelect}
            drawingData={drawingData}
          />
        );

      case 'map':
        return (
          <FarmMapView
            farmData={farmData}
            onEditFarm={handleEditFarm}
            onDeleteFarm={handleDeleteFarm}
          />
        );

      default:
        return (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Unknown state. Please restart the app.</Text>
          </View>
        );
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Initializing...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Farm Mapping',
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      {renderCurrentStep()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#f44336',
    textAlign: 'center',
  },
});

export default FarmScreen;