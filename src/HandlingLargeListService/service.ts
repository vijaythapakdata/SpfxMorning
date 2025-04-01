import {ICamlQuery, sp} from "@pnp/sp/presets/all";
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
    //Paginated Batch

    // public async getListItemsPaged(ListName:string):Promise<IListItems[]>{
    //     const allItems:IListItems[]=[];
    //     let pagedItems:any=null;
    //     do{
    //         const camlQuery:ICamlQuery={
    //             ViewXml:`
    //             <View>
    //             <Query>
    //             <Where>
    //             <IsNotNull>
    //             <FieldRef Name='Title'/>
    //             </IsNotNull>
    //             </Where>
    //             </Query>
    //             <RowLimit>2</RowLimit>
    //             <Paged>TRUE</Paged>
    //             </View>
    //             `
    //         }
    //         const response=await sp.web.lists.getByTitle(ListName).getItemsByCAMLQuery(camlQuery,pagedItems);
    //         console.log(`Fetched batch of ${pagedItems.length} items`);
    //         allItems.push(...response.map((item:any)=>({
    //             Title:item.Title
    //         })));
    //         pagedItems=response.ListItemCollectionPosition||null
    //     }
    //     while(pagedItems);
    //     console.log(`Total items fetched : ${allItems.length}`);
    //     return allItems;
    // }
    public async getPaginationItems(ListName:string):Promise<IListItems[]>{
        const allItems:IListItems[]=[];
        let position:any// to store next page information
        do{
            const  camlQuery:ICamlQuery={
                ViewXml:`
                <View>
                <Query>
                <Where>
                <IsNotNull>
                <FieldRef Name='Title'/>
                </IsNotNull>
                </Where>
                </Query>
                <RowLimit>2</RowLimit>
                </View>
                `
            };
            //Fetching items with pagination
            const response=await sp.web.lists.getByTitle(ListName).getItemsByCAMLQuery(camlQuery,position);
            console.log(`Fetched batch of ${response.length} items`);
            allItems.push(...response.map((item:any)=>({
                Title:item.Title
            })));


        }
        while(position){
            console.log(`Total items fetched ${allItems.length}`);
            return allItems;
        }
    }

}