import { Card } from "@/components/ui/card"
import Link from "next/link"
import React from "react"

const SimpleLinkPreview = ({ url }: { url: string }) => {
  return (
    <Card className="p-2">
      <Link href={url}>{url}</Link>
    </Card>
  )
}
export default SimpleLinkPreview
