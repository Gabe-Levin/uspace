import Loading from '../Loading/Loading';
import './SpacesList.scss';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import SpaceWithCreatorType from '../../interfaces/Interfaces';
import { Link } from 'react-router-dom';
import { Menu } from '@mantine/core';
import { Trash, Edit } from 'tabler-icons-react';
import API_SERVICE from '../../Api-Service';
import _ from 'lodash';

interface Incoming {
  spaces: SpaceWithCreatorType[];
  setAllSpaces: Function;
  allSpaces: SpaceWithCreatorType[];
}

function SpacesList(props: Incoming) {
  const { user, isLoading } = useAuth0();

  const deleteSpace = async (id: number) => {
    await API_SERVICE.deleteUserSpaceRoleBySpaceId(id);
    await API_SERVICE.deleteSpaceById(id);

    // deep clone spaces
    const clonedSpaces = _.cloneDeep(props.allSpaces);
    // find index of deleted space in state
    const indexOfDeletedSpace = clonedSpaces.findIndex((arrSpace) => arrSpace.id === id);
    // delete space from state
    clonedSpaces.splice(indexOfDeletedSpace, 1);
    // set spaces without deleted one to state
    props.setAllSpaces(clonedSpaces);
  };

  const spaceItem = props.spaces.map((space) => {
    const { username, pictureUrl } = space.userSpaceRoles[0].user;
    const { name } = space;
    const { id } = space;
    let isOwner = false;

    // check if user exists and if it's name matches the space creators name
    if (!isLoading && user && user.nickname === username) {
      isOwner = true;
    }

    return (
      <div className="space-item-wrapper" key={id}>
        {isOwner && (
          <Menu placement="center" position="top">
            <Menu.Label>Settings</Menu.Label>
            <Menu.Item icon={<Edit size={14} />}>Edit this Space</Menu.Item>
            <Menu.Item color="red" icon={<Trash size={14} />} onClick={() => deleteSpace(id)}>
              Delete this Space
            </Menu.Item>
          </Menu>
        )}
        <Link to={`/spaces/${id}`} className="spaces-item">
          <img src={pictureUrl} alt="Space Icon" />
          <div className="spaces-item-name">{name}</div>
          <div className="spaces-item-creator">{username}</div>
        </Link>
      </div>
    );
  });

  return <>{spaceItem}</>;
}

export default withAuthenticationRequired(SpacesList, {
  onRedirecting: () => <Loading />,
});
