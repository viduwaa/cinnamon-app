import AsyncStorage from '@react-native-async-storage/async-storage';

const FARM_DATA_KEY = 'farm_mapping_data';

export interface FarmData {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  drawingData: {
    paths: string[];
    canvasSize: {
      width: number;
      height: number;
    };
    timestamp: number;
  };
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  timestamp: number;
  version?: string;
  lastModified?: number;
}

export class FarmStorage {
  // Save farm data to local storage
  static async saveFarmData(farmData: FarmData): Promise<boolean> {
    try {
      const dataToSave: FarmData = {
        ...farmData,
        timestamp: farmData.timestamp || Date.now(),
        version: '1.0', // For future data migration if needed
      };
      
      const jsonData = JSON.stringify(dataToSave);
      await AsyncStorage.setItem(FARM_DATA_KEY, jsonData);
      console.log('Farm data saved successfully');
      return true;
    } catch (error) {
      console.error('Error saving farm data:', error);
      return false;
    }
  }

  // Load farm data from local storage
  static async loadFarmData(): Promise<FarmData | null> {
    try {
      const jsonData = await AsyncStorage.getItem(FARM_DATA_KEY);
      if (jsonData !== null) {
        const farmData: FarmData = JSON.parse(jsonData);
        console.log('Farm data loaded successfully');
        return farmData;
      }
      return null;
    } catch (error) {
      console.error('Error loading farm data:', error);
      return null;
    }
  }

  // Check if farm data exists
  static async hasFarmData(): Promise<boolean> {
    try {
      const data = await AsyncStorage.getItem(FARM_DATA_KEY);
      return data !== null;
    } catch (error) {
      console.error('Error checking farm data:', error);
      return false;
    }
  }

  // Delete farm data
  static async deleteFarmData(): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(FARM_DATA_KEY);
      console.log('Farm data deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting farm data:', error);
      return false;
    }
  }

  // Update existing farm data (partial update)
  static async updateFarmData(updates: Partial<FarmData>): Promise<boolean> {
    try {
      const existingData = await this.loadFarmData();
      if (existingData) {
        const updatedData: FarmData = {
          ...existingData,
          ...updates,
          lastModified: Date.now(),
        };
        return await this.saveFarmData(updatedData);
      }
      return false;
    } catch (error) {
      console.error('Error updating farm data:', error);
      return false;
    }
  }

  // Export farm data (for sharing or backup)
  static async exportFarmData(): Promise<{ success: boolean; data?: FarmData; error?: string; exportDate?: string }> {
    try {
      const farmData = await this.loadFarmData();
      if (farmData) {
        return {
          success: true,
          data: farmData,
          exportDate: new Date().toISOString(),
        };
      }
      return { success: false, error: 'No farm data found' };
    } catch (error) {
      console.error('Error exporting farm data:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  // Import farm data (from backup or sharing)
  static async importFarmData(importedData: FarmData): Promise<boolean> {
    try {
      // Validate imported data structure
      if (!importedData.coordinate || !importedData.drawingData) {
        throw new Error('Invalid farm data structure');
      }

      const dataToImport: FarmData = {
        ...importedData,
        timestamp: importedData.timestamp || Date.now(),
        version: '1.0',
      };

      return await this.saveFarmData(dataToImport);
    } catch (error) {
      console.error('Error importing farm data:', error);
      return false;
    }
  }

  // Clear all app data (for troubleshooting)
  static async clearAllData(): Promise<boolean> {
    try {
      await AsyncStorage.clear();
      console.log('All app data cleared');
      return true;
    } catch (error) {
      console.error('Error clearing app data:', error);
      return false;
    }
  }

  // Get storage info (for debugging)
  static async getStorageInfo(): Promise<{
    totalKeys: number;
    farmDataExists: boolean;
    allKeys: string[];
  } | null> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const farmDataExists = keys.includes(FARM_DATA_KEY);
      
      return {
        totalKeys: keys.length,
        farmDataExists,
        allKeys: keys,
      };
    } catch (error) {
      console.error('Error getting storage info:', error);
      return null;
    }
  }
}