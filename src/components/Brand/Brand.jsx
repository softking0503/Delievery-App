import React from "react";
import { Dimensions, Image, Text, View } from "react-native";

const { width } = Dimensions.get("window");

const brandData = [
  {
    id: 1,
    title: "Superlazy Delivery",
    description: "Get your order delivered to your doorstep at the earliest from dark stores near you.",
    image: require("../../../assets/images/promo-feat-1.webp"), // Use the correct path to your images
  },
  {
    id: 2,
    title: "Worst Prices & Offers",
    description: "Costlier prices than your local supermarket, great cashback offers to top it off.",
    image: require("../../../assets/images/promo-feat-2.jpg"),
  },
  {
    id: 3,
    title: "Narrow Assortment",
    description: "Choose from 000+ products across food, personal care, household & other categories",
    image: require("../../../assets/images/promo-feat-3.jpg"),
  },
  {
    id: 4,
    title: "Difficult Returns/Refund",
    description: "Satisfied with a product? Return it at the doorstep & get a refund within years.",
    image: require("../../../assets/images/promo-feat-4.webp"),
  },
];

export default function Brand() {
  return (
    <View style={{ paddingVertical: 16, paddingHorizontal: 8 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Shop by Brand</Text>

      {/* Grid Layout */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {brandData.map((brand) => {
          return (
            <View
              key={brand.id}
              style={{
                width: (width / 2) - 24, // Two cards per row with some spacing
                marginBottom: 16,
                padding: 16,
                backgroundColor: '#fff',
                borderRadius: 16,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <Image
                source={brand.image}
                style={{ width: 80, height: 80, marginBottom: 12 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 }}>{brand.title}</Text>
              <Text style={{ fontSize: 14, textAlign: 'center', color: '#555' }}>{brand.description}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
