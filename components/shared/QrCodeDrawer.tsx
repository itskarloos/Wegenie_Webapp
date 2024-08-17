"use client"

import React, { useState } from 'react'
import QRCode from "qrcode"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '../ui/button';
import Image from 'next/image';



const QrCodeDrawer = ({campaignId}: {campaignId: string}) => {

  const [src,setSrc] = useState<string>('');

  const generate = () => {
    QRCode.toDataURL(`https://wegenie-webapp.vercel.app/${campaignId}`).then((val) => setSrc(val));
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size="lg" className="button sm:w-fit">Qr Code</Button>
      </DrawerTrigger>
      <DrawerContent className="bg-white">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Qr code</DrawerTitle>
            <DrawerDescription>Scan the Following Picture</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              
              <Image src={src} alt="qr code" width={300} height={300} />
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Collapise</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default QrCodeDrawer