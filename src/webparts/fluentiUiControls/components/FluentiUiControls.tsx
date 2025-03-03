import * as React from 'react';
// import styles from './FluentiUiControls.module.scss';
import type { IFluentiUiControlsProps } from './IFluentiUiControlsProps';
import { PrimaryButton, TextField } from '@fluentui/react';
// import { escape } from '@microsoft/sp-lodash-subset';

export default class FluentiUiControls extends React.Component<IFluentiUiControlsProps> {

  //create


  public render(): React.ReactElement<IFluentiUiControlsProps> {
 

    return (
     <>
     <p>I am doing spfx</p>
     <PrimaryButton text='Save' iconProps={{iconName:'save'}}/>
     <hr/>
     <form>
<TextField type='text' label='Full Name'/>
<TextField type='email' label='Email' iconProps={{iconName:'mail'}}/>
<TextField type='password' canRevealPassword label='Password'/>
<TextField type='file' label='Document'/>
<TextField type='text' rows={5} multiline label='Address'/>
<TextField prefix='$' label='Salary'/>
     </form>
     </>
    );
  }
}
