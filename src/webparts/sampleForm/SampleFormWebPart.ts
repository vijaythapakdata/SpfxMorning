import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
// import { IReadonlyTheme } from '@microsoft/sp-component-base';
import {sp} from "@pnp/sp/presets/all";
import * as strings from 'SampleFormWebPartStrings';
import SampleForm from './components/SampleForm';
import { ISampleFormProps } from './components/ISampleFormProps';

export interface ISampleFormWebPartProps {
  ListName: string;
  CityOptions:any;
}

export default class SampleFormWebPart extends BaseClientSideWebPart<ISampleFormWebPartProps> {

  protected onInit(): Promise<void> {
    return super.onInit().then(()=> {
      sp.setup({
        spfxContext:this.context as any

      });
      this._getLookupValue();
    });
  }
  public async render(): Promise<void> {
    const element: React.ReactElement<ISampleFormProps> = React.createElement(
      SampleForm,
      {
        ListName:this.properties.ListName,
        siteurl:this.context.pageContext.web.absoluteUrl,
        context:this.context,
        DepartmentOptions:await this.getChoiceValues(this.context.pageContext.web.absoluteUrl,"Department"),
        GenderOptions:await this.getChoiceValues(this.context.pageContext.web.absoluteUrl,"Gender"),
        SkillsOptions:await this.getChoiceValues(this.context.pageContext.web.absoluteUrl,"Skills"),
        CityOptions:this.properties.CityOptions
      }
    );

    ReactDom.render(element, this.domElement);
  }

 
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('ListName', {
                  label: strings.ListFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
  //Get Choices
  private async getChoiceValues(siteurl:string,fieldValue:string):Promise<any>{
    try{
      const response=await fetch(`${siteurl}/_api/web/lists/getbytitle('First List')/fields?$filter=EntityPropertyName eq '${fieldValue}'`,
        {
          method:'GET',
          headers:{
            'Accept':'application/json;odata=nometadata'
          }
        }
      );
      if(!response.ok){
        throw new Error(`Error found while fetching choice field : ${response.status}-${response.text}`);
      }
      const data=await response.json();
      const choices=data?.value[0].Choices||[];
      return choices.map((choice:any)=>({
        key:choice,
        text:choice
      }));
    }
    catch(err){
console.error("Error ")
throw err;

    }
  }
  //Get Lookup value
  private async _getLookupValue():Promise<void>{
    try{
const response=await fetch(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Cities')/items?$select=Title,ID`,
  {
    method:'GET',
    headers:{
       'Accept':'application/json;odata=nometadata'
    }
  }
)
if(!response.ok){
  throw new Error(`Error found while fetching choice field : ${response.status}-${response.text}`);
}
const data=await response.json();
const cityval=data.value.map((city:{ID:string,Title:string})=>({
  key:city.ID,
  text:city.Title
}));
this.properties.CityOptions=cityval
    }
    catch(err){
console.error("Errors");
throw err;
    }
  }
}
