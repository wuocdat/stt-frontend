import {
    Button,
    Center,
    Flex,
    LoadingOverlay,
    Paper,
    ScrollArea,
    Stack,
    Text,
    TextInput,
    Title,
    rem,
    useMantineTheme,
} from "@mantine/core";
import { IconBolt } from "@tabler/icons-react";
import axios from "axios";
import { ChangeEvent, useState } from "react";

type Transcription = {
    mp3_file: string;
    text: string;
};

function App() {
    const theme = useMantineTheme();

    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [resultText, setResultText] = useState("");

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleTranscription = async () => {
        if (inputValue !== "") {
            setIsLoading(true);
            try {
                const { data } = await axios.post<Transcription>(
                    "http://localhost:5000/download",
                    {
                        youtube_link: inputValue,
                    }
                );

                if (data) setResultText(data.text);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <Center h="100vh" bg={theme.colors.gray[1]}>
            <Paper shadow="md" w={1000} p="xl" radius="md">
                <Flex direction="column" align="center">
                    <Title
                        transform="uppercase"
                        ta="center"
                        mt="lg"
                        color="blue"
                    >
                        Hệ thống bao vây thông tin trên nền tảng youtube
                    </Title>
                    <Stack w={500} mt={rem(32)} spacing="lg">
                        <TextInput
                            label={
                                <Title order={5} color="blue">
                                    Nhập url
                                </Title>
                            }
                            placeholder="Nhập url..."
                            size="lg"
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <Button
                            leftIcon={<IconBolt />}
                            sx={{ textTransform: "uppercase" }}
                            loading={isLoading}
                            onClick={handleTranscription}
                        >
                            chuyển đổi
                        </Button>
                    </Stack>
                    <ScrollArea
                        h={250}
                        w="100%"
                        mt={rem(72)}
                        p="lg"
                        bg={theme.colors.blue[0]}
                        sx={{ borderRadius: theme.spacing.xs }}
                    >
                        <LoadingOverlay visible={isLoading} />
                        <Text>{resultText}</Text>
                    </ScrollArea>
                </Flex>
            </Paper>
        </Center>
    );
}

export default App;
