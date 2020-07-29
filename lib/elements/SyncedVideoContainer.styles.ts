import { css } from 'lit-element';

export default css`
  .videos {
    display: grid;
    grid-gap: .5em;
    grid-template-columns: repeat(auto-fit, minmax(20em, 1fr));
  }
`;