import * as React from 'react';
// import styles from './HandlingLargeList.module.scss';
import type { IHandlingLargeListProps } from './IHandlingLargeListProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import { useState,useEffect } from 'react';
import { IListItems } from './IListItems';
import { Service } from '../../../HandlingLargeListService/service';
import { DetailsList } from '@fluentui/react';

const HandlingLargeList:React.FC<IHandlingLargeListProps>=(props)=>{
  const [ListResult,setListResult]=useState<IListItems[]>([]);
  const _service=new Service(props.context);

  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const result=await _service.getListItemsPaged(props.ListName);
        setListResult(result)
      }
      catch(err){
        console.error("err",err);
        throw err;
      }
    };
    fetchData();
  },[props.ListName,_service])
  return(
    <>
    <DetailsList
    items={ListResult}/>
    </>
  )
}
export default HandlingLargeList;
