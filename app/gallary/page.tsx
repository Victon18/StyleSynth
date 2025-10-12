"use client";

import * as React from "react";
import { Card, Text, Button, Flex, Box, Badge } from "@radix-ui/themes";
import { DownloadIcon } from "@radix-ui/react-icons";

const designs = [
  { id: 1, emoji: "👗", title: "Evening Gown", category: "Dresses" },
  { id: 2, emoji: "👚", title: "Casual Top", category: "Tops" },
  { id: 3, emoji: "👖", title: "Denim Pants", category: "Pants" },
  { id: 4, emoji: "👠", title: "High Heels", category: "Shoes" },
  { id: 5, emoji: "👜", title: "Designer Bag", category: "Accessories" },
  { id: 6, emoji: "🥻", title: "Ethnic Dress", category: "Dresses" },
];

export default function GalleryPage() {
  return (
    <Box className="min-h-screen bg-gradient-to-b from-[#f7e6f7] via-[#f9ebf9] to-[#fdf6ff] text-[#2b173f] px-6 py-12">
      <Box className="max-w-6xl mx-auto text-center mb-12">
        <Text
          as="h1"
          className="text-5xl font-bold mb-3 bg-gradient-to-r from-[#d78bfd] to-[#ff9be9] text-transparent bg-clip-text"
        >
          AI Fashion Gallery
        </Text>
        <Text as="p" className="text-lg text-[#5b456a]">
          Explore AI-generated fashion concepts represented by emoji placeholders.
        </Text>
      </Box>

      <Flex wrap="wrap" gap="5" justify="center">
        {designs.map((item) => (
          <Card
            key={item.id}
            className="w-72 rounded-2xl shadow-lg border border-[#f3d4ff]/40 bg-white/70 backdrop-blur-sm hover:shadow-pink-200 transition-all duration-300 p-6"
          >
            <Flex direction="column" align="center" gap="3">
              <Badge
                variant="soft"
                color="purple"
                className="bg-[#f6e3ff] text-[#a64ca6] rounded-full text-sm"
              >
                {item.category}
              </Badge>

              <Text className="text-6xl mt-2">{item.emoji}</Text>

              <Text className="font-medium text-lg">{item.title}</Text>

              <Button
                variant="outline"
                className="mt-3 border border-[#e3baff] hover:bg-[#f7dcff] text-[#7a3aa8] transition"
              >
                <DownloadIcon /> Download Design
              </Button>
            </Flex>
          </Card>
        ))}
      </Flex>
    </Box>
  );
}

