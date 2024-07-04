"use client"
import LinkPreview, { LinkViewProps } from "@/app/link-preview/link-preview"
import SimpleLinkPreview from "@/app/link-preview/simple-link-preview"
import { getPreview } from "@/app/server"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React, { useState } from "react"

function getLargestFavicon(favicons: string[]): string {
  return favicons.sort((a: string, b: string) => {
    const matchA = a.match(/favicon-(\d+)/)
    const matchB = b.match(/favicon-(\d+)/)
    const sizeA = matchA ? parseInt(matchA[1]) : 0
    const sizeB = matchB ? parseInt(matchB[1]) : 0
    return sizeB - sizeA
  })[0]
}

function transformResponse(res: any, url: string): LinkViewProps {
  return {
    title: "title" in res ? res.title : null,
    description: "description" in res ? res.description : null,
    image: "images" in res && res.images.length > 0 ? res.images[0] : null,
    url: url,
    siteName: "siteName" in res ? res.siteName : null,
    favicon: "favicons" in res ? getLargestFavicon(res.favicons) : null,
  }
}

function normalizeUrl(url: string): string {
  if (!/^https?:\/\//i.test(url)) {
    return "https://" + url
  }
  return url
}

const LinkPreviews = () => {
  const [url, setUrl] = useState("")
  const [links, setLinks] = useState<Array<LinkViewProps | string>>([])
  const [error, setError] = useState<string | null>(null)

  const getData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!url.trim()) {
      setError("Please enter a valid URL.")
      return
    }
    setError(null)
    const normalizedUrl = normalizeUrl(url)
    setUrl("")
    const res = await getPreview(normalizedUrl)
    console.log(res)
    if (typeof res === "string") {
      setLinks((prevLinks) => [res, ...prevLinks])
      return
    }
    const linkPreview = transformResponse(res, normalizedUrl)
    setLinks((prevLinks) => [linkPreview, ...prevLinks])
  }

  return (
    <form
      className="md:w-[60vw] flex flex-col items-center gap-4"
      onSubmit={getData}>
      <h1 className="text-5xl tracking-tighter font-bold mb-4 text-center">
        Link Preview Generator
      </h1>

      <Input
        value={url}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUrl(e.target.value)
        }
        placeholder="Enter a URL to preview"
      />

      {error && <p className="text-red-500">{error}</p>}

      <Button type="submit">Create a new preview</Button>

      <div className="grid md:grid-cols-2 gap-10 mt-8">
        {links.map((link, index) => {
          if (typeof link === "string") {
            return <SimpleLinkPreview key={index} url={link} />
          } else {
            return <LinkPreview key={index} preview={link} />
          }
        })}
      </div>
    </form>
  )
}
export default LinkPreviews
