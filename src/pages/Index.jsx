import React, { useEffect, useState } from "react";
import { Container, VStack, Text, Input, Box, Switch, useColorMode } from "@chakra-ui/react";
import Parser from "rss-parser";

const Index = () => {
  const [stories, setStories] = useState([]);
  const [filter, setFilter] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    const fetchStories = async () => {
      const parser = new Parser();
      const feed = await parser.parseURL("https://news.ycombinator.com/rss");
      setStories(feed.items);
    };

    fetchStories();
  }, []);

  const filteredStories = stories.filter(story =>
    filter ? story.link.includes(filter) : true
  );

  return (
    <Container centerContent maxW="container.md" py={4}>
      <VStack spacing={4} width="100%">
        <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
          <Text fontSize="2xl">Hacker News Top Stories</Text>
          <Switch isChecked={colorMode === "dark"} onChange={toggleColorMode} />
        </Box>
        <Input
          placeholder="Filter by domain"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        {filteredStories.map((story) => (
          <Box key={story.guid} p={4} borderWidth="1px" borderRadius="md" width="100%">
            <Text fontSize="lg" fontWeight="bold">
              <a href={story.link} target="_blank" rel="noopener noreferrer">
                {story.title}
              </a>
            </Text>
            <Text>{story.contentSnippet}</Text>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;