import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IHandlingLargeListProps {
   ListName:string;
   siteurl:string;
   context:WebPartContext;
}
