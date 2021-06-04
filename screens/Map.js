import React from "react"
import { Image, ScrollView, View } from "react-native"
import styles, { Window } from "../styles/styles"

Map.navigationOptions = ({ route: { params: { room = "" } = {} } }) => ({
  title: `Map - ${
    (MAPS.find(({ match }) => room.match(match)) || {}).name || "General"
  }`,
})

const MAPS = [
  {
    match: /brighton.*alta/i,
    name: "Brighton/Alta",
    source: require("../assets/maps/BrightonAlta.png"),
  },
  {
    match: /alta/i,
    name: "Alta",
    source: require("../assets/maps/Alta.png"),
  },
  {
    match: /cottonwood/i,
    name: "Big Cottonwood",
    source: require("../assets/maps/BigCottonwood.png"),
  },
  {
    match: /brighton/i,
    name: "Brighton",
    source: require("../assets/maps/Brighton.png"),
  },
  {
    match: /deer.*valley/i,
    name: "Deer Valley",
    source: require("../assets/maps/DeerValley.png"),
  },
  {
    match: /ballroom/i,
    name: "Grand Ballroom",
    source: require("../assets/maps/GrandBallroom.png"),
  },
  {
    match: /powder/i,
    name: "Powder Mtn/Solitude/Sundance",
    source: require("../assets/maps/PowderMtn.png"),
  },
  {
    match: /wildcat.*sidewinder/i,
    name: "Wildcat/Sidewinder",
    source: require("../assets/maps/WildcatSidewinder.png"),
  },
  {
    match: /sidewinder/i,
    name: "Sidewinder",
    source: require("../assets/maps/Sidewinder.png"),
  },
  {
    match: /snowbird/i,
    name: "Snowbird",
    source: require("../assets/maps/Snowbird.png"),
  },
  {
    match: /sundance/i,
    name: "Sundance",
    source: require("../assets/maps/Sundance.png"),
  },
  {
    match: /wasatch/i,
    name: "Wasatch",
    source: require("../assets/maps/Wasatch.png"),
  },
  {
    match: /wildcat/i,
    name: "Wildcat",
    source: require("../assets/maps/Wildcat.png"),
  },
  {
    match: /north.*star/i,
    name: "North Star",
    source: require("../assets/maps/NorthStar.png"),
  },
  {
    match: /zion/i,
    name: "Zion",
    source: require("../assets/maps/Zion.png"),
  },
  {
    match: /exec.*board/i,
    name: "Executive Boardroom",
    source: require("../assets/maps/ExecutiveBoardroom.png"),
  },
  {
    match: /^/,
    name: "General",
    source: require("../assets/maps/Map.png"),
  },
]

export default function Map({ route: { params: { room = "" } = {} } }) {
  const { source } = MAPS.find(({ match }) => room.match(match)) || {}
  return (
    <ScrollView maximumZoomScale={4} minimumZoomScale={1}>
      <View style={styles.view}>
        <Image
          source={source}
          style={{
            width: Window.width * 0.9,
            height: Window.height * 0.9,
          }}
          resizeMode="contain"
        />
      </View>
    </ScrollView>
  )
}
