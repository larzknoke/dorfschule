import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import "../styles/globals.css";

const theme = extendTheme({
  fonts: {
    body: `"Roboto", "ui-sans-serif"`,
  },
  radii: {
    md: ".2rem",
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "normal",
      },
    },
    Alert: {
      baseStyle: {
        container: {
          borderRadius: "md",
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS={false} theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
