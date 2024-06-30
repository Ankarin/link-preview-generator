"use server";
import { getLinkPreview } from "link-preview-js";

export async function getPreview(url: string) {
  try {
    return await getLinkPreview(url, { followRedirects: "follow" });
  } catch (error) {
    console.log(error);
    return url;
  }
}
