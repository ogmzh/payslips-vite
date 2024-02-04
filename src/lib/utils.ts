import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory } from "@capacitor/filesystem";

import { Payslip } from "./types";

const convertImageToBase64 = async (file: string) => {
  try {
    const response = await fetch(import.meta.env.BASE_URL + file);
    const blob = await response.blob();
    const base64String = await convertBlobToBase64(blob);
    return base64String;
  } catch (error) {
    throw new Error("Error fetching or converting image to base64");
  }
};

const convertBlobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (!reader.result) {
        return reject("No result");
      }

      resolve(reader.result as string);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(blob);
  });
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleDownload = async (payslip?: Payslip) => {
  if (!payslip) return;

  const { file, fromDate } = payslip;
  const outputFileName = format(fromDate, "MM-yyyy") + ".jpeg";

  if (Capacitor.isNativePlatform()) {
    try {
      const base64 = await convertImageToBase64(file.slice(1));
      await Filesystem.writeFile({
        recursive: true,
        path: outputFileName,
        data: base64,
        directory: Directory.Documents,
      });
    } catch (error) {
      console.error("write error", error);
    }
  } else {
    const link = document.createElement("a");
    link.href = file;
    link.download = outputFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
