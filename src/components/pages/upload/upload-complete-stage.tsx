import { AnimatePresence, motion } from "framer-motion";
import { Download, Globe } from 'lucide-react';
import Link from 'next/link';
import { debounce } from 'radash';
import { FC, useMemo, useRef, useState } from 'react';
import Lottie from 'react-lottie-player';

import ColorFilter from '@/components/common/color-filter';
import ClipboardButton from '@/components/common/copy-clipboard-btn';
import QRCode from '@/components/common/qr-code';
import TinyLoader from '@/components/common/tiny-loader';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { DEFAULT_COLORS } from "@/lib/constants";
import { useToast } from '@/lib/hooks/use-toast';
import { getQRAsSVGDataUri, getQRData } from '@/lib/qr';
import { cn } from '@/lib/utils';
import CompleteJson from "@/public/lotties/complete.json";

interface QRConfigData {
  value: string;
  fgColor?: string;
  hideLogo?: boolean;
}

interface UploadCompleteStageProps {
  transferUrl?: string;
  onCancel: () => void;
  isLoading: boolean;
}

interface QRColorState {
  fgColor: string;
}

const UploadCompleteStage: FC<UploadCompleteStageProps> = ({ transferUrl, onCancel, isLoading }) => {
  const { toast } = useToast();
  const downloadAnchorRef = useRef<HTMLAnchorElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Configuration for QR code color
  const [qrConfig, setQrConfig] = useState<QRColorState>({
    fgColor: DEFAULT_COLORS[0]
  });

  // Debounce color changes to prevent rapid updates
  const handleColorChange = debounce(
    { delay: 200 },
    (color: string) => setQrConfig((prev) => ({ ...prev, fgColor: color }))
  );

  // Generate QR code data based on transfer URL
  const qrData = useMemo<QRConfigData | null>(
    () => transferUrl ? getQRData({
      url: transferUrl,
      fgColor: qrConfig.fgColor,
      hideLogo: true,
    }) : null,
    [transferUrl, qrConfig.fgColor]
  );

  const handleCopyUrl = () => {
    toast({ title: "Transfer URL Copied" });
  };

  // Download QR code as SVG
  const handleDownloadQrCode = async () => {
    if (!qrData || !downloadAnchorRef.current || isDownloading) return;
    try {
      setIsDownloading(true);
      const svgUri = await getQRAsSVGDataUri(qrData);
      downloadAnchorRef.current.href = svgUri;
      downloadAnchorRef.current.download = `filego-transfer-qrcode.svg`;
      downloadAnchorRef.current.click();
      toast({ title: "QR Code downloaded successfully" });
    } catch (error) {
      console.error('Download failed:', error);
      toast({
        title: "Failed to download QR Code",
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };

  // Render QR Code section
  const renderQRCodeSection = () => {
    if (!qrData) return null;
    return (
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold">Generated QR Code</h4>
          <div className="flex items-center gap-1">
            <ColorFilter
              isActiveQrColor={true}
              onColorSelect={handleColorChange}
              selectedColor={qrConfig.fgColor}
            />
            <Button
              tooltip='Download QrCode Image'
              variant="secondary"
              size="icon"
              className="w-8 h-8 !rounded-sm"
              aria-label="Download QR Code"
              onClick={handleDownloadQrCode}
              disabled={isDownloading}
            >
              <Download className={cn(
                "w-4 h-4",
                { "animate-pulse": isDownloading }
              )} />
            </Button>
          </div>
        </div>
        <div className="relative mt-2 p-4 flex items-center justify-center overflow-hidden rounded-sm border border-input bg-white dark:bg-black">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ filter: "blur(2px)", opacity: 0.4 }}
              animate={{ filter: "blur(0px)", opacity: 1 }}
              exit={{ filter: "blur(2px)", opacity: 0.4 }}
              transition={{ duration: 0.1 }}
              className="relative flex size-full items-center justify-center"
            >
              <QRCode
                url={qrData.value}
                fgColor={qrData.fgColor}
                hideLogo={qrData.hideLogo}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col  gap-4">
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-[200px]">
             <TinyLoader />
          </div>
        ) : (
          transferUrl && (
            <div>
              <a
                ref={downloadAnchorRef}
                className="hidden"
                aria-hidden="true"
              />
              <div className="lottie-container -mt-4">
                <Lottie
                  loop
                  play
                  animationData={CompleteJson}
                  className="mx-auto"
                  style={{ width: 150, height: 150 }}
                />
              </div>
              <div className="bg-background border-border border rounded-md">
                <div className="px-4 py-2 flex items-center justify-between">
                  <h4 className="text-sm font-semibold">Generated Transfer Link</h4>
                  <div className="flex items-center gap-1">
                    <ClipboardButton
                      tooltipText='Copy Transfer Url'
                      textToCopy={transferUrl}
                      onCopied={handleCopyUrl}
                    />
                    <Link
                      href={transferUrl}
                      passHref={true}
                      className={cn("flex items-center rounded-md bg-secondary gap-2 px-4 py-1.5 text-xs border border-secondary",
                        "hover:bg-secondary/80 transition-colors")}
                    >
                      <Globe className="w-4 h-4 flex-shrink-0" />
                      Visit
                    </Link>
                  </div>
                </div>
                <Separator />
                {renderQRCodeSection()}
              </div>
            </div>
          )
        )}
      </div>
      <DialogFooter>
        <Button
          type="button"
          variant="destructive"
          className="w-full"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </DialogFooter>
    </div>
  );
};

export default UploadCompleteStage;