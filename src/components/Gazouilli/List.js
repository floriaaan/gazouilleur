import React, { useState } from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Carousel, { Pagination } from "react-native-snap-carousel";

import Gazouilli from "./Gazouilli";
import { View } from "react-native";

export default function List({ data, _render, loading }) {
  const [active, setActive] = useState(0);

  const _renderSkeletons = ({ item, key }) => {
    return (
      <SkeletonPlaceholder
        containerStyle={{ flex: 1, width: 300 }}
        animationType="pulse"
        isLoading={true}
      >
        <SkeletonPlaceholder.Item
          marginTop={6}
          width={80}
          height={20}
          borderRadius={4}
        ></SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    );
  };

  return (
    <View>
      <Carousel
        useScrollView
        removeClippedSubviews={false}
        layout={"stack"}
        layoutCardOffset={`18`}
        data={data}
        renderItem={_render}
        sliderWidth={450}
        itemWidth={450}
        onSnapToItem={(index) => setActive(index)}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={active}
        containerStyle={{
          backgroundColor: "#eee",
          borderRadius: 50,
          marginHorizontal: 50,
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: "#ffb700",
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.7}
        inactiveDotScale={0.5}
      />
    </View>
  );
}
