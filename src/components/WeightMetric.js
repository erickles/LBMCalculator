import React from "react";
import { View, StyleSheet, Text } from "react-native";

// Hooks
import useCalculationIMC from "../hooks/useCalculationIMC";
import useMatchIMC from "../hooks/useMatchIMC";

export default WeightMetric = ({ weight, height, imcRecord }) => {

    const imc = parseFloat(useCalculationIMC(weight, height));
    return  <View style={{flexDirection: 'row'}}>  
                <Text style={useMatchIMC(imc, imcRecord) && imc!==0 ? styles.textOneHighlighted : styles.textOne}>{imcRecord.status}</Text>
                <Text style={useMatchIMC(imc, imcRecord) && imc!==0 ? styles.textOneHighlighted : styles.textOne}>{imcRecord.from}-{imcRecord.to}</Text>
            </View>;
};

const styles = StyleSheet.create({    
    textOne: {
      //fontFamily: 'Lato-Regular',
      fontSize: 20
    },
    textOneHighlighted: {
      //fontFamily: 'Lato-Regular',
      fontSize: 20,
      fontWeight: 'bold'
    },
  });
