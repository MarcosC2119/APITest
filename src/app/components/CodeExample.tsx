import { useState } from 'react';

interface CodeExampleProps {
  code: string;
  language: 'bash' | 'json' | 'http';
  title?: string;
  showCopyButton?: boolean;
}

export default function CodeExample({ code, language, title, showCopyButton = true }: CodeExampleProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar al portapapeles:', err);
    }
  };

  const getLanguageColor = () => {
    switch (language) {
      case 'bash':
        return 'bg-blue-500/10 border-blue-500/20';
      case 'json':
        return 'bg-purple-500/10 border-purple-500/20';
      case 'http':
        return 'bg-green-500/10 border-green-500/20';
      default:
        return 'bg-gray-500/10 border-gray-500/20';
    }
  };

  const getLanguageLabel = () => {
    switch (language) {
      case 'bash':
        return 'Terminal';
      case 'json':
        return 'JSON';
      case 'http':
        return 'HTTP';
      default:
        return language;
    }
  };

  const formatCode = (code: string) => {
    if (language === 'json') {
      try {
        return JSON.stringify(JSON.parse(code), null, 2);
      } catch {
        return code;
      }
    }
    return code;
  };

  return (
    <div className="relative group">
      <div className={`absolute top-2 right-2 flex items-center gap-2 ${showCopyButton ? 'opacity-0 group-hover:opacity-100' : 'hidden'} transition-opacity`}>
        <span className="text-xs text-gray-400">{getLanguageLabel()}</span>
        <button
          onClick={copyToClipboard}
          className={`p-1.5 rounded-md text-sm ${
            copied
              ? 'bg-green-500/10 text-green-400 border border-green-500/20'
              : 'bg-white/[0.08] text-gray-400 hover:bg-white/[0.12] border border-white/[0.08]'
          } transition-colors`}
          title="Copiar al portapapeles"
        >
          {copied ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
          )}
        </button>
      </div>
      <div className={`rounded-lg border ${getLanguageColor()} overflow-hidden`}>
        <pre className="p-4 overflow-x-auto bg-black/80">
          <code className={`text-sm font-mono ${language === 'bash' ? 'text-blue-100' : language === 'json' ? 'text-purple-100' : 'text-green-100'}`}>
            {formatCode(code)}
          </code>
        </pre>
      </div>
    </div>
  );
} 