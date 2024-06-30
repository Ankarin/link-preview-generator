import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import Image from "next/image";

export interface LinkViewProps {
  title: string | null;
  description: string | null;
  image: string | null;
  url: string | null;
  siteName: string | null;
  favicon: string | null;
}

const LinkPreview = ({ preview }: { preview: LinkViewProps }) => {
  return (
    <Card className="w-full max-w-96 flex flex-col  items-center">
      {preview.image ? (
        <img width={300} height={300} src={preview.image} alt="Link preview" />
      ) : preview.favicon ? (
        <img width={300} height={300} src={preview.favicon} alt="Favicon" />
      ) : null}
      <CardContent
        className="max-w-96"
        style={{ overflow: "auto", wordWrap: "break-word" }}
      >
        <CardTitle>{preview.title}</CardTitle>
        <CardDescription>{preview.url}</CardDescription>
        <p>{preview.description}</p>
        <CardDescription>{preview.siteName}</CardDescription>
      </CardContent>
    </Card>
  );
};
export default LinkPreview;
