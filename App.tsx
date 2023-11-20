import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import RNFS from 'react-native-fs';

const FileReadWriteExample = () => {
  const [textToWrite, setTextToWrite] = useState('');
  const [readText, setReadText] = useState('');

  const filePath = `${RNFS.DocumentDirectoryPath}/example.txt`;

  useEffect(() => {
    // Read the file content when the component mounts
    readFile();
  }, [textToWrite]);

  const writeFile = async () => {
    try {
      await RNFS.writeFile(filePath, textToWrite, 'utf8');
      console.log('File written successfully!');
    } catch (error) {
      console.error('Error writing file:', error);
    }
  };

  const readFile = async () => {
    try {
      const content = await RNFS.readFile(filePath, 'utf8');
      setReadText(content);
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter text to write"
        value={textToWrite}
        onChangeText={setTextToWrite}
      />
      <Button title="Write to File" onPress={writeFile} />

      <Text>Read Text:</Text>
      <Text>{readText}</Text>
    </View>
  );
};

export default FileReadWriteExample;
