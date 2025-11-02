import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface ShareButtonsProps {
  clownName: string;
}

export function ShareButtons({ clownName }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `I just discovered I'm ${clownName}! Find out what kind of clown you are in The Clown Chronicles! 🎪`;
  const shareUrl = window.location.href;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'The Clown Chronicles',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or error occurred
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h4 className="text-gray-800 mb-3">Share Your Results</h4>
        <p className="text-gray-600 mb-6">Compare your crisis type with friends</p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex gap-4 justify-center flex-wrap"
      >
        <motion.button
          onClick={handleShare}
          className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white overflow-hidden shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500"
            initial={{ x: '100%' }}
            whileHover={{ x: '0%' }}
            transition={{ duration: 0.3 }}
          />
          <span className="relative z-10 flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Share
          </span>
        </motion.button>

        <motion.button
          onClick={handleCopy}
          className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl text-white overflow-hidden shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500"
            initial={{ x: '100%' }}
            whileHover={{ x: '0%' }}
            transition={{ duration: 0.3 }}
          />
          <span className="relative z-10 flex items-center gap-2">
            {copied ? (
              <>
                <Check className="w-5 h-5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                Copy Link
              </>
            )}
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}
