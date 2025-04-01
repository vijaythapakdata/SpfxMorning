import * as React from 'react';
// import styles from './SpfxCrud.module.scss';
import type { ISpfxCrudProps } from './ISpfxCrudProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { useState } from 'react';
import {SPHttpClient,SPHttpClientResponse} from "@microsoft/sp-http";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

interface EmployeeState{
  ID:number;
  Title:string;
  Age:string;
}

const  SpfxCrud :React.FC<ISpfxCrudProps>=(props:ISpfxCrudProps)=>{
  const [fullName,setFullName]=useState('');
  const [age,setAge]=useState('');
  const [allItems,setAllItems]=useState<EmployeeState[]>([]);

  //create item
  const createItem=async():Promise<void>=>{
    const body:string=JSON.stringify({
      'Title':fullName,
      'Age':age
    });
    try{
      const response:SPHttpClientResponse=await props.context.spHttpClient.post(`${props.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('MyList')/items`,

        SPHttpClient.configurations.v1,
        {
          headers:{
            'Accept':'application/json;odata=nometadata',
            'Content-type':'application/json;odata=nometadata',
            'odata-version':''
          },
          body:body
        }
      );
      if(response.ok){
        const responseJSON=await response.json();
        console.log(responseJSON);
        alert(`Item created successfully with ID : ${responseJSON.ID}`);
      }
      else{
        const responseJSON=await response.json();
        console.log(responseJSON);
        alert(`something went wrong please check the console`);
      }
    }
    catch(err){
      console.log(err);
    }
  }
  //Get Item by ID
  const getItemByID=():void=>{
    const idElement=document.getElementById('itemId') as HTMLInputElement|null;
    if(idElement?.value){
      const id:number=Number(idElement.value); // Make sure to convert the value to a number
      if(id>0){
        props.context.spHttpClient.get(`${props.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('MyList')/items(${id})`,
          SPHttpClient.configurations.v1,
          {
            headers:{
              'Accept':'application/json;odata=nometadata',
              'Content-type':'application/json;odata=nometadata',
              'odata-version':''
            }
          }
        )
        .then((response:SPHttpClientResponse)=>{
          if(response.ok){
            response.json().then((responseJSON)=>{
              setFullName(responseJSON.Title);
              setAge(responseJSON.Age);
            });
          }
          else{
            response.json().then((responseJSON)=>{
              console.log(responseJSON);
              alert(`Something went please console`);
            });
          }
        })
        .catch((err)=>{
          console.log(err);
        });

      }
      else{
        alert(`Please enter the valid id`)
      }
    }
    else{
      console.log("Error");
    }
  }
  //Get all Items
  const getAllItems=():void=>{
    props.context.spHttpClient.get(`${props.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('MyList')/items`,
      SPHttpClient.configurations.v1,
      {
        headers:{
          'Accept':'application/json;odata=nometadata',
          'Content-type':'application/json;odata=nometadata',
          'odata-version':''
        }
      }
    ).then((response:SPHttpClientResponse)=>{
      if(response.ok){
        response.json().then((responseJSON)=>{
          setAllItems(responseJSON.value);
          console.log(responseJSON);
        });
      }
      else{
        response.json().then((responseJSON)=>{
          console.log(responseJSON);
          alert(`something went wrong`);
        });
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  return(
    <>
    </>
  )
}
export default  SpfxCrud;