/* eslint-disable prettier/prettier */
import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
  ImageBackground 
} from "react-native";
import { scrollInterpolator, animatedStyles } from "./animations";
import Carousel from "react-native-snap-carousel";

const App = () => {
  const swiper = useRef(null);
  const SLIDER_WIDTH = Dimensions.get("window").width;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.68);
  const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 12) / 9);

  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState([
    {
      title: "Item 1",
      img: require("./1.jpg"),
    },
    {
      title: "Item 2",
      img: require("./2.jpg"),
    },
    {
      title: "Item 3",
      img: require("./3.jpg"),
    },
    {
      title: "Item 4",
      img: require("./4.jpg"),
    },
    {
      title: "Item 5",
      img: require("./5.jpg"),
    },
  ]);
  
  const renderItem = ({ item }) => {
    return (
      <ImageBackground
        source={item.img}
        style={[
          styles.itemContainer,
          { width: ITEM_WIDTH, height: ITEM_HEIGHT, marginTop: ITEM_HEIGHT * .1},
        ]}
        resizeMode='cover'
      >
        <Text style={styles.itemLabel}>{`Item ${item.img}`}</Text>
      </ImageBackground>
    );
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            flex: 0.12,
            justifyContent: "flex-end",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <Text style={{fontSize: 30, fontWeight: "bold"}}>Swiper 3D Coverflow</Text>
        </View>
        <View style={{ flex: 0.88}}>
          <Carousel
            ref={swiper}
            data={carouselItems}
            renderItem={renderItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            inactiveSlideOpacity={1}
            containerCustomStyle={styles.carouselContainer}
            onSnapToItem={(index) => setActiveIndex(index)}
            scrollInterpolator={scrollInterpolator}
            slideInterpolatedStyle={animatedStyles}
            translateVertical = {false} // Propiedad de ejemplo pasando parametros a la animacion
            useScrollView={true}
          />
          <Text style={styles.counter}>{activeIndex + 1}</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 25,
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  itemLabel: {
    color: "white",
    fontSize: 24,
  },
  counter: {
    marginBottom: 25,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default App;
