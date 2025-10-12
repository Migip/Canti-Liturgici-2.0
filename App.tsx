import { useColorScheme } from 'react-native';
import Homepage from './App/Homepage';
import clTheme from './globals/classes/colorTheme';

export default function App() {
  const colorScheme = useColorScheme();
  clTheme.configInstance(colorScheme);
  return (
    <Homepage />
  );
}
/*export default function App() {
  return (
    <View style={styles.container}>
      <Navigator/>
      <StatusBar style="auto" />
    </View>
  );
}*/

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
