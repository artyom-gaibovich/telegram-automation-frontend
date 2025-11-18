import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { lucario } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { bem } from '@shared/libs';
import './CodeBlock.scss';

type CodeBlockProps = {
  language: string;
  value: string;
};

const b = bem('code-block');

export function CodeBlock({ language, value }: CodeBlockProps) {
  const customStyle = {
    ...lucario,
    'pre[class*="language-"]': {
      background: '#18202A',
      borderRadius: '12px',
      padding: '36px',
      fontSize: '0.9rem',
    },
    '.token.string': { color: '#A5D6FF' },
    '.token.function': { color: '#FFFFFF' },
    '.token.number': { color: '#A5D6FF' },
    '.token.operator': { color: '#FFFFFF' },
    '.token.comment': { color: '#777777', fontStyle: 'italic' },
    '.token.punctuation': { color: '#FFFFFF' },
  };

  return (
    <div className={b()}>
      <SyntaxHighlighter
        language={language}
        style={customStyle}
        PreTag="div"
        className={b('syntax-highlighter')}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
}
