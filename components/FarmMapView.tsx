import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import MapView, { Marker, Polygon, PROVIDER_GOOGLE } from 'react-native-maps';
import Constants from 'expo-constants';
import { FarmData } from '../utils/FarmStorage';

interface FarmMapViewProps {
  farmData: FarmData | null;
  onEditFarm: () => void;
  onDeleteFarm: () => void;
}

interface Coordinate {
  latitude: number;
  longitude: number;
}

const FarmMapView: React.FC<FarmMapViewProps> = ({ farmData, onEditFarm, onDeleteFarm }) => {
  const [farmPolygon, setFarmPolygon] = useState<Coordinate[]>([]);
  const [mapRegion, setMapRegion] = useState<any>(null);

  useEffect(() => {
    if (farmData) {
      // Convert drawing paths to polygon coordinates
      const polygonCoordinates = convertDrawingToPolygon(
        farmData.drawingData,
        farmData.coordinate
      );
      setFarmPolygon(polygonCoordinates);
      
      // Set map region centered on farm
      setMapRegion({
        latitude: farmData.coordinate.latitude,
        longitude: farmData.coordinate.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [farmData]);

  const convertDrawingToPolygon = (drawingData: any, centerCoordinate: Coordinate): Coordinate[] => {
    if (!drawingData || !drawingData.paths || drawingData.paths.length === 0) {
      // Create a default small square around the center point
      const offset = 0.001; // Small offset for demo
      return [
        {
          latitude: centerCoordinate.latitude + offset,
          longitude: centerCoordinate.longitude - offset,
        },
        {
          latitude: centerCoordinate.latitude + offset,
          longitude: centerCoordinate.longitude + offset,
        },
        {
          latitude: centerCoordinate.latitude - offset,
          longitude: centerCoordinate.longitude + offset,
        },
        {
          latitude: centerCoordinate.latitude - offset,
          longitude: centerCoordinate.longitude - offset,
        },
      ];
    }

    // Convert SVG paths to coordinate points
    const canvasSize = drawingData.canvasSize;
    const coordinates: Coordinate[] = [];

    drawingData.paths.forEach((path: string) => {
      const points = extractPointsFromPath(path);
      points.forEach(point => {
        // Convert canvas coordinates to geographic coordinates
        // This is a simplified conversion - you might need more sophisticated mapping
        const latOffset = (point.y / canvasSize.height - 0.5) * 0.01;
        const lngOffset = (point.x / canvasSize.width - 0.5) * 0.01;
        
        coordinates.push({
          latitude: centerCoordinate.latitude - latOffset,
          longitude: centerCoordinate.longitude + lngOffset,
        });
      });
    });

    return coordinates.length > 0 ? coordinates : [centerCoordinate];
  };

  const extractPointsFromPath = (pathString: string): { x: number; y: number }[] => {
    // Extract coordinates from SVG path string
    // This is a simplified parser
    const points: { x: number; y: number }[] = [];
    const commands = pathString.split(/[ML]/);
    
    commands.forEach(command => {
      const coords = command.trim().split(',');
      if (coords.length === 2) {
        const x = parseFloat(coords[0]);
        const y = parseFloat(coords[1]);
        if (!isNaN(x) && !isNaN(y)) {
          points.push({ x, y });
        }
      }
    });

    return points;
  };

  const handleEditFarm = () => {
    Alert.alert(
      'Edit Farm',
      'Do you want to redraw your farm boundary?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: onEditFarm },
      ]
    );
  };

  const handleDeleteFarm = () => {
    Alert.alert(
      'Delete Farm',
      'Are you sure you want to delete this farm mapping? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: onDeleteFarm },
      ]
    );
  };

  if (!farmData || !mapRegion) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading farm map...</Text>
      </View>
    );
  }

  // Get Google Maps API key from environment
  const googleMapsApiKey = Constants.expoConfig?.android?.config?.googleMaps?.apiKey || 
                          process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Farm Map</Text>
      
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={mapRegion}
        mapType="satellite"
        googleMapsApiKey={googleMapsApiKey}
      >
        {/* Farm location marker */}
        <Marker
          coordinate={farmData.coordinate}
          title="Farm Center"
          description="Your farm location"
          pinColor="red"
        />

        {/* Farm boundary polygon */}
        {farmPolygon.length > 0 && (
          <Polygon
            coordinates={farmPolygon}
            strokeColor="#2196F3"
            strokeWidth={3}
            fillColor="rgba(33, 150, 243, 0.2)"
          />
        )}
      </MapView>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Farm Information</Text>
        <Text style={styles.infoText}>
          Location: {farmData.coordinate.latitude.toFixed(6)}, {farmData.coordinate.longitude.toFixed(6)}
        </Text>
        <Text style={styles.infoText}>
          Created: {new Date(farmData.timestamp || Date.now()).toLocaleDateString()}
        </Text>
        {farmData.lastModified && (
          <Text style={styles.infoText}>
            Last Modified: {new Date(farmData.lastModified).toLocaleDateString()}
          </Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={handleEditFarm}>
          <Text style={styles.buttonText}>Edit Farm</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteFarm}>
          <Text style={styles.buttonText}>Delete Farm</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  map: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
  },
  infoContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    margin: 10,
    borderRadius: 10,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoText: {
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
  editButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 120,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 120,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FarmMapView;