/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/core";

import React, { useContex, useState } from "react";
import { Link } from "react-router-dom";
import Backend from ":/lib/Backend";
import BackendContext from ":/contexts/BackendContext";
// import { Popup, Button } from "semantic-ui-react";
import Header from ":/components/Header";
import Footer from ":/components/Footer";
import useSession from ":/lib/useSession";
import useRouter from ":/lib/useRouter";
import Loading from ":/components/Loading";
import EntryId from ":/lib/EntryId";
import {
  Box,
  Container,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Heading,
  Switch,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { DimmerInner } from "semantic-ui-react";

export default function () {
  const session = useSession();
  const router = useRouter();
  const space_id = router.match.params.space_id;
  const [space, setSpace] = React.useState(null);
  const [helpMessage, setHelpMessage] = useState("");
  const [helpMessageTitle, setHelpMessageTitle] = useState("");

  const setNewHelpMessage = async () => {
    const spaceData = {
      meta: {
        ...space.meta,
        helpMessage: {
          description: helpMessage.length > 0 ? helpMessage : "Default Value",
          title:
            helpMessageTitle.length > 0 ? helpMessageTitle : "Default value",
        },
      },
    };
    await Backend.put(`/spaces/${space_id}`, spaceData);
    await Backend.get(`/spaces/${space_id}`).then((r) => {
      setSpace(r.data);
    });
  };

  React.useEffect(() => {
    Backend.get(`/spaces/${space_id}`).then((r) => {
      setSpace(r.data);
    });
  }, [space_id]);

  if (!space) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <div className="page-container">
        <div css={CSS}>
          <p>{JSON.stringify(space.meta)}</p>
          <h1>{space.name}</h1>
          <Container maxW="xl" centerContent>
            <Box padding="4" bg="green.300" maxW="3xl">
              <Heading m={4}>Edit Messages Sent by Bot</Heading>
              <Tabs variant="soft-rounded" colorScheme="green">
                <TabList>
                  <Tab>Help</Tab>
                  <Tab>Vibes</Tab>
                  <Tab>BadVibes</Tab>
                  <Tab>Vibes Distro</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <InputGroup>
                      <div>
                        <InputLeftAddon children="Help Title" />
                        <Input
                          type="text"
                          name="helpMessageTitle"
                          size="lg"
                          variant="outline"
                          value={helpMessageTitle}
                          onChange={(event) =>
                            setHelpMessageTitle(event.target.value)
                          }
                        ></Input>
                      </div>

                      <div>
                        <InputLeftAddon children="Help Message" />
                        <Input
                          type="text"
                          name="helpMessage"
                          size="lg"
                          variant="outline"
                          value={helpMessage}
                          onChange={(event) =>
                            setHelpMessage(event.target.value)
                          }
                        ></Input>
                      </div>
                      <h1>IN DM</h1>
                      <Switch size="md" />
                      <h1>IN FEED</h1>
                      <Switch size="md" />
                      <h1>IN CHNL</h1>
                      <Switch size="md" />
                    </InputGroup>
                    <Button onClick={setNewHelpMessage} colorScheme="blue">
                      Save
                    </Button>
                  </TabPanel>
                  <TabPanel>
                    <InputGroup>
                      <InputLeftAddon children="Vibe Title" />
                      <Input
                        type="text"
                        name="helpMessage"
                        size="lg"
                        variant="outline"
                        value={helpMessage}
                        onChange={(event) => setHelpMessage(event.target.value)}
                      ></Input>
                      <InputLeftAddon children="Vibe Message" />
                      <Input
                        type="text"
                        name="vibeMessage"
                        size="lg"
                        variant="outline"
                        value={helpMessage}
                        onChange={(event) => setHelpMessage(event.target.value)}
                      ></Input>
                    </InputGroup>
                    <h1>IN DM</h1>
                    <Switch size="md" />
                    <h1>IN FEED</h1>

                    <Switch size="md" />
                    <h1>IN CHNL</h1>

                    <Switch size="md" />
                    <Button onClick={setNewHelpMessage} colorScheme="blue">
                      Save
                    </Button>
                  </TabPanel>
                  <TabPanel>
                    <InputGroup>
                      <InputLeftAddon children="Bad Vibes Title" />
                      <Input
                        type="text"
                        name="helpMessage"
                        size="lg"
                        variant="outline"
                        value={helpMessage}
                        onChange={(event) => setHelpMessage(event.target.value)}
                      ></Input>
                      <InputLeftAddon children="Bad Vibes Message" />
                      <Input
                        type="text"
                        name="vibeMessage"
                        size="lg"
                        variant="outline"
                        value={helpMessage}
                        onChange={(event) => setHelpMessage(event.target.value)}
                      ></Input>
                    </InputGroup>
                    <h1>IN DM</h1>
                    <Switch size="md" />
                    <h1>IN FEED</h1>

                    <Switch size="md" />
                    <h1>IN CHNL</h1>

                    <Switch size="md" />
                    <Button onClick={setNewHelpMessage} colorScheme="blue">
                      Save
                    </Button>
                  </TabPanel>
                  <TabPanel>
                    <InputGroup>
                      <InputLeftAddon children="Vibe Distro Title" />
                      <Input
                        type="text"
                        name="helpMessage"
                        size="lg"
                        variant="outline"
                        value={helpMessage}
                        onChange={(event) => setHelpMessage(event.target.value)}
                      ></Input>
                      <InputLeftAddon children="Vibe Distro Message" />
                      <Input
                        type="text"
                        name="vibeMessage"
                        size="lg"
                        variant="outline"
                        value={helpMessage}
                        onChange={(event) => setHelpMessage(event.target.value)}
                      ></Input>
                    </InputGroup>
                    <h1>IN DM</h1>
                    <Switch size="md" />
                    <h1>IN FEED</h1>

                    <Switch size="md" />
                    <h1>IN CHNL</h1>

                    <Switch size="md" />
                    <Button onClick={setNewHelpMessage} colorScheme="blue">
                      Save
                    </Button>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Container>
        </div>
      </div>
    </>
  );
}
