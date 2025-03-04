import * as React from 'react';
// import styles from './SampleForm.module.scss';
import type { ISampleFormProps } from './ISampleFormProps';
import { ISampleFormState } from './ISampleFormState';
import { Web } from '@pnp/sp/webs';
import "@pnp/sp/items";
import "@pnp/sp/lists";
import { ChoiceGroup, Dropdown, PrimaryButton, TextField } from '@fluentui/react';
import {PeoplePicker,PrincipalType} from "@pnp/spfx-controls-react/lib/PeoplePicker";
// import { escape } from '@microsoft/sp-lodash-subset';

export default class SampleForm extends React.Component<ISampleFormProps,ISampleFormState> {
  constructor(props:any){
    super(props);
    this.state={
      Name:"",
      EmailAddress:"",
      Age:"",
      Manager:[],
      ManagerId:[],
      Address:"",
      Department:"",
      Gender:""
    }
  }
  //Create Data
  public async createData(){
    //Siteurl
    let web=Web(this.props.siteurl);
    await web.lists.getByTitle(this.props.ListName).items.add({
      Title:this.state.Name,
      EmailAddress:this.state.EmailAddress,
      Age:parseInt(this.state.Age),
      ManagerId:{results:this.state.ManagerId},
      Address:this.state.Address,
      Department:this.state.Department,
      Gender:this.state.Gender
    }).then((data)=>{
      console.log("No Error found");
      alert("data has been saved successfully");
      return data;
    }).catch((err)=>{
      console.error("Error found while creating the data");
      throw err;
    });
    this.setState({
      Name:"",
      EmailAddress:"",
      Age:"",
      Manager:[],
      ManagerId:[],
      Address:"",
      Department:"",
      Gender:""
    });
  }

  //form event

  private handleChange=(FieldValue:keyof ISampleFormState,value:string |boolean|number):void=>{
    this.setState({[FieldValue]:value}as unknown as Pick<ISampleFormState,keyof ISampleFormState>)
  }
  public render(): React.ReactElement<ISampleFormProps> {
   

    return (
     <>
     <TextField value={this.state.Name}
     label='Name'
     onChange={(_,event)=>this.handleChange("Name",event||"")}
     />
      <TextField value={this.state.EmailAddress}
     label='Email Address'
     onChange={(_,event)=>this.handleChange("EmailAddress",event||"")}
     /> <TextField value={this.state.Age}
     label='Age'
     onChange={(_,event)=>this.handleChange("Age",event||0)}
     />
     <PeoplePicker
     context={this.props.context as any}
     personSelectionLimit={3}
     ensureUser={true}
     resolveDelay={1000}
    //  defaultSelectedUsers={[this.state.Manager?this.state.Manager:""]}
    defaultSelectedUsers={this.state.Manager}
     principalTypes={[PrincipalType.User]}
     webAbsoluteUrl={this.props.siteurl}
     onChange={this._getPeoplePickerValues}
     titleText='Manager'
     />
       <TextField value={this.state.Address}
     label='Permananet Address'
     onChange={(_,event)=>this.handleChange("Address",event||"")}
     multiline
     rows={5}
     />
     <Dropdown
     placeholder='--select--'
     options={this.props.DepartmentOptions}
     selectedKey={this.state.Department}
     label='Department'
     onChange={(_,Options)=>this.handleChange("Department",Options?.key as string||"")}
     />
     <ChoiceGroup
     options={this.props.GenderOptions}
     onChange={(_,options)=>this.handleChange("Gender",options?.key as string||"")}
     selectedKey={this.state.Gender}
     label='Gender'
     />
     <br/>
     <PrimaryButton text='Save' onClick={()=>this.createData()} iconProps={{iconName:'save'}}/>
     </>
    );
  }
  //Get PeoplePicker [Item Limit [1]]
//   private _getPeoplePicker=(items:any[]):void=>{
// if(items.length>0){
// this.setState({
//   Manager:items[0].text,
//   ManagerId:items[0].id
// });
// }
// else{
//   this.setState({
//     Manager:"",
//     ManagerId:0
//   });
// }
//   }
//Get Peoplepicker multiple selected
private _getPeoplePickerValues=(items:any):void=>{
  const managers=items.map((item:any)=>item.text)
  const managerId=items.map((item:any)=>item.id)
  this.setState({
    Manager:managers,
    ManagerId:managerId
  })
}
}
