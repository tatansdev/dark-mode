import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const setAppearance = `
		const userAppearance = () => {
			if (window.localStorage.getItem('theme')) return window.localStorage.getItem('theme')

			return window.localStorage.setItem('theme', 'light')
		}

		document.body.dataset.theme = userAppearance()
	`;

    return (
      <Html>
        <Head />

        <body>
          <script dangerouslySetInnerHTML={{ __html: setAppearance }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
