import { Unit } from '@/types/measure';
import { toCapitalSentence } from '@/utils/transform';
import React, { Dispatch, SetStateAction, useMemo } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface UnitButtonProps {
  unit: Unit;
  setUnit: Dispatch<SetStateAction<Unit>>
}

export default function UnitButton({
  unit,
  setUnit
}: UnitButtonProps) {
  const unitText = useMemo(() => unit === Unit.METRIC ? 'celcius' : 'fahrenheit', [unit]);

  const handleClick = () => {
    setUnit(unit === Unit.METRIC ? Unit.IMPERIAL : Unit.METRIC);
  }

  return (
    <Pressable
      style={[styles.button, styles[unitText]]}
      onPress={handleClick}
    >
      <Text style={styles.text}>{toCapitalSentence(unitText)}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 24,
      
    borderWidth: 2,
    borderColor: 'black',

    minWidth: 100,
  },

  celcius: {
    backgroundColor: '#e6dd32',
  },

  fahrenheit: {
    backgroundColor: '#33b6bd',
  },

  text: {
    textAlign: 'center',
  }
});
