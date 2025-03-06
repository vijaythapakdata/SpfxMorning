import {sp} from "@pnp/sp/presets/all";
import { IListItems } from "../webparts/handlingLargeList/components/IListItems";
import { WebPartContext } from "@microsoft/sp-webpart-base";
export class Service{
    constructor(context:WebPartContext){
        sp.setup({
            spfxContext:context as any
        });
    }
    //Get List
    public async getListItems(ListName:string):Promise<IListItems[]>{
        try{
const items=await sp.web.lists.getByTitle(ListName).items.getAll();
return items.map((item:any)=>({
    Title:item.Title
}));
        }
        catch(err){
console.error("error");
throw err;
        }
    }
}