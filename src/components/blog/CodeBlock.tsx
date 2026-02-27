'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
    children?: React.ReactNode;
}

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);
    const code =
        typeof children === 'object' && children && 'props' in children
            ? (children as { props: { children: string } }).props.children
            : String(children || '');

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group my-6">
            <button
                onClick={handleCopy}
                className="absolute right-2 top-2 p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors opacity-0 group-hover:opacity-100"
                aria-label="Copy code"
            >
                {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                ) : (
                    <Copy className="w-4 h-4 text-gray-300" />
                )}
            </button>
            <pre className={className} {...props}>
                {children}
            </pre>
        </div>
    );
}
