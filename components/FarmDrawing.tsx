import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Alert,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { PanGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

interface FarmDrawingProps {
  onDrawingComplete: (drawingData: any) => void;
}

const FarmDrawing: React.FC<FarmDrawingProps> = ({ onDrawingComplete }) => {
  const [paths, setPaths] = useState<string[]>([]);
  const [currentPath, setCurrentPath] = useState<string>('');
  const pathRef = useRef<string>('');

  const onGestureEvent = (event: any) => {
    const { absoluteX, absoluteY } = event.nativeEvent;
    
    if (!pathRef.current) {
      // Start new path
      pathRef.current = `M${absoluteX.toFixed(2)},${absoluteY.toFixed(2)}`;
    } else {
      // Continue path
      pathRef.current += ` L${absoluteX.toFixed(2)},${absoluteY.toFixed(2)}`;
    }
    
    setCurrentPath(pathRef.current);
  };

  const onHandlerStateChange = (event: any) => {
    const { state } = event.nativeEvent;
    
    if (state === State.BEGAN) {
      // Start drawing
      pathRef.current = '';
    } else if (state === State.END) {
      // Finish current path
      if (pathRef.current) {
        setPaths(prevPaths => [...prevPaths, pathRef.current]);
        pathRef.current = '';
        setCurrentPath('');
      }
    }
  };

  const clearDrawing = () => {
    setPaths([]);
    setCurrentPath('');
    pathRef.current = '';
  };

  const completeDrawing = () => {
    if (paths.length === 0) {
      Alert.alert('No Drawing', 'Please draw your farm boundary first');
      return;
    }

    // Convert paths to coordinate points
    const drawingData = {
      paths: paths,
      canvasSize: { width: width - 20, height: height * 0.6 },
      timestamp: Date.now(),
    };

    onDrawingComplete(drawingData);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.title}>Draw Your Farm Boundary</Text>
      <Text style={styles.instruction}>
        Draw the outline of your farm as seen from above (satellite view)
      </Text>

      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <View style={styles.drawingArea}>
          <Svg
            style={styles.svg}
            width={width - 20}
            height={height * 0.6}
          >
            {/* Draw completed paths */}
            {paths.map((path, index) => (
              <Path
                key={index}
                d={path}
                stroke="#2196F3"
                strokeWidth="3"
                fill="rgba(33, 150, 243, 0.1)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
            
            {/* Draw current path being drawn */}
            {currentPath && (
              <Path
                d={currentPath}
                stroke="#FF5722"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </Svg>
        </View>
      </PanGestureHandler>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.clearButton} onPress={clearDrawing}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.completeButton} onPress={completeDrawing}>
          <Text style={styles.buttonText}>Complete Drawing</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
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
  drawingArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    margin: 10,
  },
  svg: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  clearButton: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 120,
  },
  completeButton: {
    backgroundColor: '#4CAF50',
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

export default FarmDrawing;