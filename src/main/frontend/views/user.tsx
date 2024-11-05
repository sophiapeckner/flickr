// this page is for testing the user database
// will eventually be removed

import { AutoGrid } from '@vaadin/hilla-react-crud';
import { UserService } from 'Frontend/generated/endpoints';
import UserModel from 'Frontend/generated/com/flickr/UserModel';

import { ViewConfig } from "@vaadin/hilla-file-router/types.js";

export const config: ViewConfig = {
	title: "UserTest",
};

export default function UserView() {
  return (
	<div className='p-l'>
      <AutoGrid service={UserService} model={UserModel} />
    </div>
  );
}
