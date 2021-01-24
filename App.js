import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from "react-native-elements";
//import * as RNLocalize from "react-native-localize";
//import i18n from "i18n-js";
//import memoize from "lodash.memoize";

// Hooks
import useCalculationIMC from "./src/hooks/useCalculationIMC";

// Components
import WeightMetric from './src/components/WeightMetric';

import imcTableMan from "./src/json/imcTableMan";
import imcTableWoman from "./src/json/imcTableWoman";
import * as Font from "expo-font";

// const translationGetters = {
//   en: () => require("./src/translations/en.json"),
//   pt: () => require("./src/translations/pt.json"),
//   es: () => require("./src/translations/es.json"),
// };

// const translate = memoize(
//   (key, config) => i18n.t(key, config),
//   (key, config) => (config ? key + JSON.stringify(config) : key)
// );

// const setI18nConfig = () => {
//   const fallback = { languageTag: "en" };
//   const { languageTag } =
//     RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
//     fallback;

//   translate.cache.clear();

//   i18n.translations = { [languageTag]: translationGetters[languageTag]() };
//   i18n.locale = languageTag;
// };

export default (App) => {
  const [weight, setWeight] = useState("0");
  const [height, setHeight] = useState("0");
  const [age, setAge] = useState("0");
  const [isMale, setMale] = useState(true);

  const fetchFonts = () => {
    return Font.loadAsync({
      "Lato-Black": require("./assets/fonts/Lato-Black.ttf"),
      "Lato-BlackItalic": require("./assets/fonts/Lato-BlackItalic.ttf"),
      "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
      "Lato-BoldItalic": require("./assets/fonts/Lato-BoldItalic.ttf"),
      "Lato-Italic": require("./assets/fonts/Lato-Italic.ttf"),
      "Lato-Light": require("./assets/fonts/Lato-Light.ttf"),
      "Lato-LightItalic": require("./assets/fonts/Lato-LightItalic.ttf"),
      "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
      "Lato-Thin": require("./assets/fonts/Lato-Thin.ttf"),
      "Lato-ThinItalic": require("./assets/fonts/Lato-ThinItalic.ttf"),
    });
  };

  useEffect(() => {
    fetchFonts();
  }, []);

  const weightMetrics = isMale ? imcTableMan.map(imcRecord => {
    return (
          <View key={imcRecord.status}>
            <WeightMetric imcRecord={imcRecord} weight={weight} height={height} />
          </View>)
  })
    :
    imcTableWoman.map(imcRecord => {
      return (<View key={imcRecord.status}>
                <WeightMetric imcRecord={imcRecord} weight={weight} height={height} />
              </View>)
    })

  return (
    <View style={styles.container}>
      <ScrollView>

        <View style={{ alignSelf: "stretch", flexDirection: "column" }}>
          <TouchableOpacity
            onPress={() => {
              setMale(true);
            }}
          >
            <Text>Man</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setMale(false);
            }}
          >
            <Text>Female</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={weight}
            defaultValue="0"
            returnKeyType={"next"}
            onChangeText={(text) => {
              setWeight(text);
            }}
            onSubmitEditing={() => {
              this.secondTextInput.focus();
            }}
            blurOnSubmit={false}
          ></TextInput>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={height}
            defaultValue="0"
            onChangeText={(text) => {
              setHeight(text);
            }}
            ref={(input) => {
              this.secondTextInput = input;
            }}
          ></TextInput>
        </View>
        <Text>{useCalculationIMC(weight, height)}</Text>

        {/* <FlatList
          data={isMale ? imcTableMan : imcTableWoman}
          keyExtractor={(result) => result.status}
          renderItem={({ item }) => {
            return (
              <View key={item.status}>

                <WeightMetric imcRecord={item} weight={weight} height={height} />
              </View>
            );
          }}
        /> */}
        {weightMetrics}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  value: {
    fontSize: 24,
  },
  input: {
    backgroundColor: "gray",
    marginVertical: 5,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
    borderBottomWidth: 0,
    paddingVertical: 10,
  }
});
