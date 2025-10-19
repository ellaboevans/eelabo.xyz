
'use client'

import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react'

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function CopyToClipboard({ children, className, style, ...props }: Props) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(children as string)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button title='Copy To Clipboard' onClick={handleCopy} {...props} className={`${className} bg-black border-[0.5px] border-amber-50/50 rounded transition-all duration-300 p-2`} style={style}>
      {copied ? <Icon icon="mdi:check" /> : <Icon icon="mdi:content-copy" />}
    </button>
  );
}