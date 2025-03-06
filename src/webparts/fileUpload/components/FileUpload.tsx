import * as React from 'react';
// import styles from './FileUpload.module.scss';
import type { IFileUploadProps } from './IFileUploadProps';
import {Web} from "@pnp/sp/presets/all";
import { IFileUploadState } from './IFileUploadState';
// import { PrimaryButton} from '@fluentui/react';
export default class FileUpload extends React.Component<IFileUploadProps,IFileUploadState> {
  constructor(props:any){
    super(props);
    this.state={
      Attachments:[]
    }
  }
  //Handle File selection
  private handleFileChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
    const files=event.target.files;
    if(files){
      this.setState({Attachments:Array.from(files)})
    }
  }

  //upload file
  public async uploadDocuments(){
    try{
      let web=Web(this.props.siteurl);
      const list=web.lists.getByTitle(this.props.ListName);
      //Add an empty item first
      const item=await list.items.add({});
      const itemId=item.data.Id;
      //upload each file
      for(const file of this.state.Attachments){
        const array=await file.arrayBuffer();
        await list.items.getById(itemId).attachmentFiles.add(file.name,array);
      }
      console.log("Files uploaded successfully");
    }
    catch(err){
      console.log("Error",err)
    }
  }
  public render(): React.ReactElement<IFileUploadProps> {
    

    return (
     <>
     <input type='file' multiple onChange={this.handleFileChange}/>
     <br/>
     <button  onClick={()=>this.uploadDocuments()}>upload</button>
     </>
    );
  }
}
