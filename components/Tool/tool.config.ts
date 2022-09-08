import type { StaticImageData } from 'next/image'

import { localTime } from '@/utils/time'
import pdfIcon from '@/public/icons/pdf.png'

export interface Tool {
  name: string,
  icon: StaticImageData,
  des?: string,
  click?: (param: Intro) => Promise<void>
}

export const exportPDF: Tool = {
  name: 'pdf',
  icon: pdfIcon,
  des: 'Export PDF',
  click: async ({ name }) => {
    const host = process.env.NEXT_PUBLIC_HOST;
    const port = process.env.NEXT_PUBLIC_PORT;
    const route = process.env.NEXT_PUBLIC_ROUTE;
    const res = await fetch(`${host}:${port}${route}/api/pdf`)
    const resBlob = await res.blob() // get response blob
    const blob = new Blob([resBlob])
    const blobUrl = window.URL.createObjectURL(blob)

    const aEle = document.createElement('a')
    aEle.setAttribute('download', `${name}-${localTime()}.pdf`)
    aEle.href = blobUrl
    aEle.click()
    aEle.remove()
    window.URL.revokeObjectURL(blobUrl)
  }
}
