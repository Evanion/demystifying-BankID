import * as React from 'react';
import styled from '@emotion/styled';

const Button = styled.button<ButtonProps>`
  display: inline-block;
  padding: 0.3em 1.2em;
  margin: 0 0.1em 0.1em 0;
  border: 0.16em solid rgba(255, 255, 255, 0);
  border-radius: 2em;
  box-sizing: border-box;
  text-decoration: none;
  font-size: 1.5em;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
  text-align: center;
  transition: all 0.2s;
  background-color: ${({ copied, copying }) =>
    copied ? '#4ef18f' : copying ? '#f1bb4e' : '#f14e4e'};
  &:active,
  &:focus {
    outline: none;
  }
`;

export const CopyButton: React.FC<Props> = ({ text }) => {
  const [isCopied, setCopy] = React.useState(false);
  const [isCopying, setCopying] = React.useState(false);

  const copySnippet = (content: string) => async () => {
    setCopy(false);
    setCopying(true);
    await navigator.clipboard.writeText(content);
    setTimeout(() => {
      setCopy(true);
      setCopying(false);
    }, 300);
  };
  const label = isCopied ? 'Copied!' : isCopying ? 'Copying' : 'Copy Code';
  return (
    <div
      style={{
        textAlign: 'right',
        paddingTop: 10,
        position: 'absolute',
        bottom: 15,
        right: 35,
      }}
    >
      <Button copied={isCopied} copying={isCopying} onClick={copySnippet(text)}>
        {label}
      </Button>
    </div>
  );
};

interface Props {
  text: string;
}

interface ButtonProps {
  copied: boolean;
  copying: boolean;
}
