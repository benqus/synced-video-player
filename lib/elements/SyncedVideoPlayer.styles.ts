import { css } from 'lit-element';

export default css`
  article {
    position: relative;
  }

  header {
    position: absolute;
    top: 0;
    width: 100%;
    color: white;
    background-color: black;
    font-size: .75em;
  }

  h3, p {
    padding: 0;
    margin: 0;
  }

  .subtitle {
    font-size: .8em
  }

  .metadata {
    position: absolute;
    top: 0;
    right: 0;
  }

  video {
    width: 100%;
  }

  aside {
    position: absolute;
    right: 0;
    bottom: 1.5em;
  }
`;