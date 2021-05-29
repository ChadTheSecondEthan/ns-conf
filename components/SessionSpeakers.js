import React from "react";
import { Text, View } from "react-native";
import styles from "../styles/styles";

export default function SessionSpeakers({
  session: { speakers = [], panelists = [], moderator, facilitator } = {},
  doNotRenderPanelists = false,
  onlyRenderPanelists = false,
  style = styles.m3,
}) {
  return speakers.length || panelists.length || moderator || facilitator ? (
    <View style={styles.marginBottomXxSmall}>
      {speakers.length && !onlyRenderPanelists ? (
        <Text style={style}>{speakers.map(({ name }) => name).join(", ")}</Text>
      ) : null}
      {facilitator && !onlyRenderPanelists ? (
        <Text style={style}>{facilitator.name}</Text>
      ) : null}
      {moderator && !onlyRenderPanelists ? (
        <Text style={style}>{moderator.name}</Text>
      ) : null}
      {panelists.length && !doNotRenderPanelists ? (
        <Text style={style}>
          {panelists.map(({ name }) => name).join(", ")}
        </Text>
      ) : null}
    </View>
  ) : null;
  // ) ? (
  //         <View style={styles.marginBottomXxSmall} >
  //             {speakers.length && !onlyRenderPanelists ? (
  //                 <Text
  //                     style={style}
  //                 >{speakers.map(({ name }) => name).join(', ')}</Text>
  //             ) : null}
  //             {facilitator && !onlyRenderPanelists ? (
  //                 <Text
  //                     style={style}
  //                 >Facilitator: {facilitator.name}</Text>
  //             ) : null}
  //             {moderator && !onlyRenderPanelists ? (
  //                 <Text
  //                     style={style}
  //                 >Moderator: {moderator.name}</Text>
  //             ) : null}
  //             {panelists.length && !doNotRenderPanelists ? (
  //                 <Text
  //                     style={style}
  //                 >Panelists: {panelists.map(({ name }) => name).join(', ')}</Text>
  //             ) : null}
  //         </View>
  //     ) : null;
}
