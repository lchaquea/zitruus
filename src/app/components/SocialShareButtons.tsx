'use client';

import React from 'react';
import { Linkedin, Facebook, Link as LinkIcon, Mail, Phone } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface SocialShareButtonsProps {
  title: string;
  url: string;
  description?: string;
  className?: string;
  compact?: boolean;
}

// Custom X (Twitter) icon component
const XIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" fill="currentColor" />
  </svg>
);

// Custom WhatsApp icon component
const WhatsAppIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M17.415 14.382c-.298-.149-1.759-.867-2.031-.967-.272-.099-.47-.148-.669.15-.198.296-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.148-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.668-1.612-.916-2.207-.241-.579-.486-.5-.668-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.57-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0011.992 0C5.438 0 .102 5.335.1 11.892c-.001 2.096.546 4.142 1.588 5.945L0 24l6.304-1.654a11.882 11.882 0 005.684 1.448h.005c6.554 0 11.89-5.335 11.892-11.893a11.821 11.821 0 00-3.48-8.413" fill="currentColor" />
  </svg>
);

export default function SocialShareButtons({ 
  title, 
  url, 
  description = '', 
  className = '',
  compact = false
}: SocialShareButtonsProps) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = [
    {
      name: 'X',
      icon: <XIcon size={compact ? 16 : 20} />,
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'bg-black hover:bg-gray-900'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={compact ? 16 : 20} />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'bg-[#0077B5] hover:bg-[#006699]'
    },
    {
      name: 'Facebook',
      icon: <Facebook size={compact ? 16 : 20} />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-[#3b5998] hover:bg-[#344e86]'
    },
    {
      name: 'WhatsApp',
      icon: <WhatsAppIcon size={compact ? 16 : 20} />,
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: 'bg-[#25D366] hover:bg-[#20bd5a]'
    },
    {
      name: 'iMessage',
      icon: <Phone size={compact ? 16 : 20} />,
      url: `sms:&body=${encodedTitle}%20${encodedUrl}`,
      color: 'bg-[#34C759] hover:bg-[#2db14e]'
    },
    {
      name: 'Email',
      icon: <Mail size={compact ? 16 : 20} />,
      url: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
      color: 'bg-[#D44638] hover:bg-[#c04131]'
    }
  ];

  const copyToClipboard = () => {
    // Check if navigator.clipboard is supported
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url)
        .then(() => {
          toast.success('Link copied to clipboard!');
        })
        .catch((err) => {
          console.error('Failed to copy: ', err);
          toast.error('Failed to copy link');
        });
    } else {
      // Fallback for browsers that don't support clipboard API
      try {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          toast.success('Link copied to clipboard!');
        } else {
          toast.error('Failed to copy link');
        }
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        toast.error('Failed to copy link');
      }
    }
  };

  if (compact) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-1.5 rounded-full text-white ${link.color} transition-colors`}
            aria-label={`Share on ${link.name}`}
          >
            {link.icon}
          </a>
        ))}
        <button
          onClick={copyToClipboard}
          className="p-1.5 rounded-full text-white bg-dark-300 hover:bg-dark-200 transition-colors border border-gray-700"
          aria-label="Copy link"
        >
          <LinkIcon size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="flex flex-wrap gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center px-3 py-1.5 rounded-lg text-white ${link.color} transition-colors`}
            aria-label={`Share on ${link.name}`}
          >
            {link.icon}
            <span className="ml-2 text-sm">{link.name}</span>
          </a>
        ))}
        <button
          onClick={copyToClipboard}
          className="flex items-center justify-center px-3 py-1.5 rounded-lg text-white bg-dark-300 hover:bg-dark-200 transition-colors border border-gray-700"
          aria-label="Copy link"
        >
          <LinkIcon size={20} />
          <span className="ml-2 text-sm">Copy Link</span>
        </button>
      </div>
    </div>
  );
} 