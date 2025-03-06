import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IFileUploadProps {
  ListName:string;
  siteurl:string;
  context:WebPartContext;
}
