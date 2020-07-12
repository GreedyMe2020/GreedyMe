import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function App() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.text}>Here are some boxes of different colors</Text>

        <View style={[styles.subText, { backgroundColor: '#2aa198' }]}>
          <Text style={styles.boxText}> Cyan </Text>
        </View>
        <View style={[styles.subText, { backgroundColor: '#268bd2' }]}>
          <Text style={styles.boxText}> Blue </Text>
        </View>
        <View style={[styles.subText, { backgroundColor: '#d33682' }]}>
          <Text style={styles.boxText}> Magenta </Text>
        </View>
        <View style={[styles.subText, { backgroundColor: '#cb4b16' }]}>
          <Text style={styles.boxText}> Orange </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 40,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
