import React from 'react';
import {
  Deck,
  Slide,
  Heading,
  FlexBox,
  Image,
  UnorderedList,
  Link,
  ListItem,
  Appear,
  Text,
  Notes,
  CodePane,
  Stepper,
  Box,
} from 'spectacle';
import { theme } from '../styles/theme';
import { memeText } from '../styles/meme';
import vsDark from 'prism-react-renderer/themes/vsDark';
import trap from '../assets/trap.gif';
import omgJsFramework from '../assets/omg-js-framework.png';
import NxLogo from '../assets/nx-logo-white.svg';
import ReactLogo from '../assets/React-icon.svg';
import NestLogo from '../assets/nest-logo.svg';
import NextLogo from '../assets/next-logo.svg';
import dustinDrumroll from '../assets/drumroll-dustin.gif';
import BankIDLogo from '../assets/bankid.svg';
import alrightyThen from '../assets/alrightythen.gif';
import understandNothing from '../assets/understand-nothing.jpg';
import notSureIfSleeping from '../assets/not-sure-if-boring-lecture-or-just-tired.jpg';
import { genProject, genProjectCmd } from '../code/nx';
import { CopyButton } from '../components/CopyButton';
import {
  genBankidModule,
  genBankidModuleCmd,
  genBankidModuleSteps,
  setupAgent,
  setupAgentCmd,
  setupAgentSteps,
  setupController,
  setupControllerSteps,
  setupHandlers,
  setupInterface,
  setupService,
  setupServiceSteps,
  setupSwagger,
  setupSwaggerSteps,
} from '../code/nest';
import { InlineCode } from '../components/InlineCode';

const fade = { to: { opacity: 1, zoom: 1 }, from: { opacity: 0, zoom: 0.1 } };
export const App = () => {
  const [isSleeping, setSleeping] = React.useState(false);
  return (
    <Deck theme={theme} backgroundColor="#333">
      <Slide>
        <FlexBox height="100%" flexDirection="column">
          <Heading margin="0" fontSize="90px">
            Demystifying BankID for the common developer
          </Heading>
          <Appear elementNum={0} transitionEffect={fade}>
            <FlexBox with="100%">
              <Heading
                margin="0px 32px"
                color="primary"
                fontSize="h3"
                textAlign="left"
                with="100%"
              >
                ...but mainly a lot of JS
                <br /> stuff
              </Heading>
              <Image src={trap} />
            </FlexBox>
          </Appear>
        </FlexBox>
      </Slide>
      <Slide>
        <Heading>What we will learn</Heading>
        <UnorderedList>
          <ListItem>
            Managing your application with a modern Monorepo
            <br />
            <Link href="https://nx.dev">nx.dev</Link>
          </ListItem>
          <ListItem>
            Building an Enterprise level Microservice backend
            <br />
            <Link href="https://nestjs.com">nestjs.com</Link>
          </ListItem>
          <ListItem>
            Prerendered frontend, with dynamic SSR content
            <br />
            <Link href="https://nextjs.org">nextjs.org</Link>
          </ListItem>
          <ListItem>
            Maximize your customers trust with BankID
            <br />
            <Link href="https://www.bankid.com/utvecklare/rp-info">
              bankid.com/utvecklare/rp-info
            </Link>
          </ListItem>
        </UnorderedList>
        <Notes>
          <UnorderedList>
            <ListItem>
              how and why you should manage your project with a monorepo
            </ListItem>
            <ListItem>
              Jump straight to writing business logic without vendor lock-in
            </ListItem>
            <ListItem>Can you really have your cake and eat it too?</ListItem>
            <ListItem>
              And we are going to take a look at the BankID API
            </ListItem>
          </UnorderedList>
        </Notes>
      </Slide>
      <Slide>
        <FlexBox height="100%">
          <Image src={omgJsFramework} width={500 * 2} height={375 * 2} />
        </FlexBox>
      </Slide>
      <Slide>
        <Heading>Why Monorepo?</Heading>

        <UnorderedList>
          <ListItem>
            <b>Shared code</b> - Keep code DRY across the project, reuse code
            like validators, UI Components, and types. Also share between
            frontend and backend
          </ListItem>
          <ListItem>
            <b>Atomic changes</b> - Make interconnected changes between
            microservices and clients in a single commit
          </ListItem>
          <ListItem>
            <b>Developer mobility</b> - Keep your way of building and testing
            applications consistent. Promote cross team contributions.
          </ListItem>
          <ListItem>
            <b>Single set of dependencies</b> - Your project have that one
            service with way outdated dependencies.
          </ListItem>
        </UnorderedList>
        <Notes>
          <UnorderedList>
            <ListItem>
              Easily share code between the different services and clients in
              your project
            </ListItem>
            <ListItem>
              Validation objects (joi), TS Types (DTOs etc), UI Components.
            </ListItem>
            <ListItem>
              No longer any need to coordinate commits across multiple repos
            </ListItem>
            <ListItem>
              Developers can be apprehensive to contribute to other teams code,
              having it all located in one place lowers the step.
            </ListItem>
            <ListItem>
              With all microservices and clients sharing a single node_modules,
              keeping your third party dependencies up to date gets a lot easier
            </ListItem>
          </UnorderedList>
        </Notes>
      </Slide>
      <Slide>
        <Heading>NX</Heading>
        <FlexBox>
          <Image src={NxLogo} />
          <div>
            <UnorderedList>
              <ListItem>
                Supports many modern tools and frameworks
                <br />
                (Next, Nest, Angular, Cypress, StoryBook, Ionic, + more)
              </ListItem>
              <ListItem>
                A single <code>node_modules</code> for your entire microservice
                project
              </ListItem>
              <ListItem>
                Used by many large companies
                <br /> (American Airlines, Audi, Cisco, FedEx, General Motors,
                Microsoft, Redhat)
              </ListItem>
            </UnorderedList>
          </div>
        </FlexBox>
      </Slide>
      <Slide>
        <FlexBox height="100%" flexDirection="column">
          <Image src={ReactLogo} width={500} />
          <Text fontSize={60}>React Native</Text>
          <div
            style={{
              position: 'absolute',
              height: 20,
              width: 600,
              transform: 'rotate(-45deg)',
              backgroundColor: '#f00',
              content: '',
              borderRadius: 10,
            }}
          />
          <div
            style={{
              position: 'absolute',
              height: 20,
              width: 600,
              transform: 'rotate(45deg)',
              backgroundColor: '#f00',
              content: '',
              borderRadius: 10,
            }}
          />
        </FlexBox>
        <Notes>
          <Text>
            Unfortunately Nx doesn't have any official support for react-native
            yet
          </Text>
        </Notes>
      </Slide>
      <Slide>
        <Heading>Nest</Heading>
        <FlexBox>
          <Image src={NestLogo} width={250} />
          <div>
            <UnorderedList>
              <ListItem>
                Modular architecture - Built on top of Express.js and consists
                of several smaller modules.
              </ListItem>
              <ListItem>
                A complete platform backbone with several communication options
              </ListItem>
              <ListItem>
                Leverages the latest features, design patterns, and mature
                solutions from across the JavaScript echosystem.
              </ListItem>
            </UnorderedList>
          </div>
        </FlexBox>
        <Notes>
          <UnorderedList>
            <ListItem>
              when you want to use a database ORM or communication stratergy,
              you just yarn install a binding/factory for it.
            </ListItem>
            <ListItem>
              Nest have turnkey solutions for advanced microservice
              architecture, like gRPC, CQRS, Kafka, Redis, Nats etc.
            </ListItem>
            <ListItem>Angular@next style dependency injection.</ListItem>
          </UnorderedList>
        </Notes>
      </Slide>
      <Slide>
        <Heading>Next</Heading>
        <FlexBox>
          <Image src={NextLogo} width={250} />
          <div>
            <UnorderedList>
              <ListItem>
                Hybrid - supports both SSG and SSR
                <br />
                (Server-Side-Generated and Server-Side-Rendered)
              </ListItem>
              <ListItem>
                Incremental static generation - Update SSG after build time
                without redeploy
              </ListItem>
              <ListItem>
                API Routes - make your frontend your API gateway
              </ListItem>
            </UnorderedList>
          </div>
        </FlexBox>
        <Notes>
          <UnorderedList>
            <ListItem>
              when you want to use a database ORM or communication stratergy,
              you just yarn install a binding/factory for it.
            </ListItem>
            <ListItem>
              Nest have turnkey solutions for advanced microservice
              architecture, like gRPC, CQRS, Kafka, Redis, Nats etc.
            </ListItem>
            <ListItem>Angular@next style dependency injection.</ListItem>
          </UnorderedList>
        </Notes>
      </Slide>
      <Slide>
        <FlexBox height="100%" flexDirection="column">
          <Image src={dustinDrumroll} width={500 * 2} height={250 * 2} />
          <div style={memeText}>Drumroll please!</div>
        </FlexBox>
        <Notes>Dustin from Stranger Things</Notes>
      </Slide>
      <Slide>
        <Heading>BankID</Heading>
        <FlexBox>
          <Image src={BankIDLogo} width={250} />
          <div>
            <UnorderedList>
              <ListItem>
                9,5 million digital banking customers have the ability to get
                BankID
                <br />
                (98,7% of Swedens population ages 21-50)
              </ListItem>
              <ListItem>
                During 2020, 8,5 million customers will have BankID, 7,8 million
                of those will have a Mobile BankID.
              </ListItem>
              <ListItem>
                BankID will process 4,8 billion transactions during 2020 (auth
                and sign)
              </ListItem>
            </UnorderedList>
          </div>
        </FlexBox>
        <Notes>
          <UnorderedList>
            <ListItem>
              over 98% of Swedens inhabitants, source; SCB and BankID
            </ListItem>
          </UnorderedList>
        </Notes>
      </Slide>
      <Slide>
        <FlexBox height="100%" flexDirection="column">
          <Image src={alrightyThen} width={480 * 2.5} height={270 * 2.5} />
        </FlexBox>
      </Slide>
      <Slide>
        <Heading>Setup a new Nx project</Heading>
        <CodePane language="bash" autoFillHeight={true} theme={vsDark}>
          {genProject}
        </CodePane>
        <CopyButton text={genProjectCmd} />
      </Slide>
      <Slide>
        <Heading>Add Certficates and env variables</Heading>
        <UnorderedList>
          <ListItem>
            We will store the certificate and key in a cert folder
          </ListItem>
          <ListItem>
            We will manage some environment variables in a .env file in the
            project root
          </ListItem>
        </UnorderedList>
        <CopyButton text="BANKID_URL=https://appapi2.test.bankid.com/rp/v5" />
      </Slide>
      <Slide>
        <Heading>Create the BankID module</Heading>
        <Stepper defaultValue={[]} values={genBankidModuleSteps.highlights}>
          {(value, step) => [
            <CodePane
              key={1}
              language="bash"
              autoFillHeight
              theme={vsDark}
              highlightStart={value[0]}
              highlightEnd={value[1]}
            >
              {genBankidModule}
            </CodePane>,
            <Box
              key={2}
              position="relative"
              bottom="0rem"
              left="0rem"
              right="0rem"
              bg="black"
            >
              {genBankidModuleSteps.messages.map(
                (current) =>
                  step === current.step && (
                    <Text key={current.step} fontSize="1.5rem" margin="0rem">
                      {current.message}
                    </Text>
                  )
              )}
            </Box>,
          ]}
        </Stepper>
        <CopyButton text={genBankidModuleCmd} />
        <Notes>
          Don't forget to change the loaded module in{' '}
          <InlineCode>main.ts</InlineCode> or make sure that{' '}
          <InlineCode>app.module.ts</InlineCode> imports{' '}
          <InlineCode>BankidModule</InlineCode>.
          <UnorderedList>
            {genBankidModuleSteps.messages.map((current) => (
              <ListItem key={current.step}>{current.message}</ListItem>
            ))}
          </UnorderedList>
        </Notes>
      </Slide>
      <Slide>
        <Heading>Setup httpsAgent</Heading>
        <Stepper
          defaultValue={[]}
          values={[
            [1, 3],
            [8, 16],
            [11, 13],
          ]}
        >
          {(value, step) => [
            <CodePane
              key={1}
              language="typescript"
              autoFillHeight
              theme={vsDark}
              indentSize={4}
              highlightStart={value[0]}
              highlightEnd={value[1]}
            >
              {setupAgent}
            </CodePane>,
            <Box
              key={2}
              position="relative"
              bottom="0rem"
              left="0rem"
              right="0rem"
              bg="black"
            >
              {setupAgentSteps.map(
                (current) =>
                  step === current.step && (
                    <Text key={current.step} fontSize="1.5rem" margin="0rem">
                      {current.message}
                    </Text>
                  )
              )}
            </Box>,
          ]}
        </Stepper>
        <CopyButton text={setupAgentCmd} />
        <Notes>
          Don't forget to change the loaded module in{' '}
          <InlineCode>main.ts</InlineCode> or make sure that{' '}
          <InlineCode>app.module.ts</InlineCode> imports{' '}
          <InlineCode>BankidModule</InlineCode>.
          <UnorderedList>
            {setupAgentSteps.map((current) => (
              <ListItem key={current.step}>{current.message}</ListItem>
            ))}
            <ListItem>
              Development version of the certificate is provided in the
              developer portal
            </ListItem>
          </UnorderedList>
          <CopyButton text="https://www.bankid.com/utvecklare/rp-info" />
        </Notes>
      </Slide>
      <Slide>
        <Heading>Let's setup the service</Heading>
        <Stepper defaultValue={[]} values={setupServiceSteps.highlights}>
          {(value, step) => [
            <CodePane
              key={1}
              language="typescript"
              autoFillHeight={true}
              theme={vsDark}
              indentSize={4}
              highlightStart={value[0]}
              highlightEnd={value[1]}
            >
              {setupService}
            </CodePane>,
            <Box
              key={2}
              position="relative"
              bottom="0rem"
              left="0rem"
              right="0rem"
              bg="black"
            >
              {setupServiceSteps.messages.map(
                (current) =>
                  step === current.step && (
                    <Text key={current.step} fontSize="1.5rem" margin="0rem">
                      {current.message}
                    </Text>
                  )
              )}
            </Box>,
          ]}
        </Stepper>
        <CopyButton text={setupService} />
        <Notes>
          <UnorderedList>
            {setupServiceSteps.messages.map((current) => (
              <ListItem key={current.step}>{current.message}</ListItem>
            ))}
          </UnorderedList>
        </Notes>
      </Slide>
      <Slide>
        <Heading>The handlers</Heading>
        <CodePane
          key={1}
          language="typescript"
          autoFillHeight={true}
          theme={vsDark}
          indentSize={4}
        >
          {setupHandlers}
        </CodePane>
        <CopyButton text={setupHandlers} />
        <Notes>
          create a file <InlineCode>handlers/handlers.ts</InlineCode>
        </Notes>
      </Slide>
      <Slide>
        <Heading>We need some Interfaces as well</Heading>
        <CodePane
          language="typescript"
          autoFillHeight={true}
          theme={vsDark}
          indentSize={4}
        >
          {setupInterface}
        </CodePane>
        <Box
          position="relative"
          bottom="0rem"
          left="0rem"
          right="0rem"
          bg="black"
        >
          <Text fontSize="1.5rem" margin="0rem">
            This file contains TS definitions of properties specified in the
            BankID documentation
          </Text>
        </Box>
        <CopyButton text={setupInterface} />
        <Notes>
          This file contains TS definitions of properties specified in the
          BankID documentation
        </Notes>
      </Slide>
      <Slide>
        <Heading>Controller time!</Heading>
        <Stepper defaultValue={[]} values={setupControllerSteps.highlights}>
          {(value, step) => [
            <CodePane
              key={1}
              language="typescript"
              autoFillHeight={true}
              theme={vsDark}
              indentSize={4}
              highlightStart={value[0]}
              highlightEnd={value[1]}
            >
              {setupController}
            </CodePane>,
            <Box
              key={2}
              position="relative"
              bottom="0rem"
              left="0rem"
              right="0rem"
              bg="black"
            >
              {setupControllerSteps.messages.map(
                (current) =>
                  step === current.step && (
                    <Text key={current.step} fontSize="1.5rem" margin="0rem">
                      {current.message}
                    </Text>
                  )
              )}
            </Box>,
          ]}
        </Stepper>
        <CopyButton text={setupController} />
        <Notes>
          <UnorderedList>
            {setupControllerSteps.messages.map((current) => (
              <ListItem key={current.step}>{current.message}</ListItem>
            ))}
          </UnorderedList>
        </Notes>
      </Slide>
      <Slide>
        <FlexBox height="100%" flexDirection="column">
          <Image
            src={isSleeping ? notSureIfSleeping : understandNothing}
            width={789 * 0.9}
            height={768 * 0.9}
          />
        </FlexBox>
        <Notes>
          How many are sleeping?{' '}
          <button onChange={() => setSleeping(true)}>Sleeping</button>
        </Notes>
      </Slide>
      <Slide>
        <Heading>Give me some swagger!</Heading>

        <CodePane
          language="bash"
          autoFillHeight={true}
          theme={vsDark}
          indentSize={4}
        >
          $ yarn add @nestjs/swagger swagger-ui-express
        </CodePane>
        <CopyButton text="yarn add @nestjs/swagger swagger-ui-express" />
        <Notes>Let's add swagger for easier API exploration</Notes>
      </Slide>
      <Slide>
        <Heading>Register Swagger</Heading>

        <CodePane
          key={1}
          language="typescript"
          autoFillHeight={true}
          theme={vsDark}
          indentSize={4}
          highlightStart={13}
          highlightEnd={19}
        >
          {setupSwagger}
        </CodePane>
        <Box
          key={2}
          position="relative"
          bottom="0rem"
          left="0rem"
          right="0rem"
          bg="black"
        >
          <Text fontSize="1.5rem" margin="0rem">
            We register Swagger module in the bootstrapper
          </Text>
        </Box>

        <CopyButton text={setupSwagger} />
        <Notes>
          <UnorderedList>
            {setupSwaggerSteps.messages.map((current) => (
              <ListItem key={current.step}>{current.message}</ListItem>
            ))}
          </UnorderedList>
        </Notes>
      </Slide>
    </Deck>
  );
};
