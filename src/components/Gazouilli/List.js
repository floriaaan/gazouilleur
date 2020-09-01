import React from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Carousel from "react-native-snap-carousel";

import Gazouilli from "./Gazouilli";

export default function List({ data, _render, loading }) {
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
    <Carousel
      useScrollView
      removeClippedSubviews={false}
      layout={"stack"}
      layoutCardOffset={`18`}
      data={data}
      renderItem={_render}
      sliderWidth={450}
      itemWidth={450}
    />
  );
}
