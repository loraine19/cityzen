import {
  Checkbox,
  ListItem,
  ListItemPrefix,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  Switch,
} from "@material-tailwind/react";
import { Group } from "../../../../domain/entities/Group";
import { GroupUser, Role } from "../../../../domain/entities/GroupUser";
//kk
type CheckboxListGroupProps = {
  groups: Group[];
  userGroups: GroupUser[];
  setUserGroups: (groups: GroupUser[]) => void
}

export const CheckboxListGroup = ({ groups, setUserGroups, userGroups }: CheckboxListGroupProps) => {

  return (
    <div className="relative w-respLarge">
      <Menu placement="bottom-start">
        <MenuHandler className="relative flex justify-between h-max w-full z-50  items-center cursor-pointer border-b-[1px] py-1 border-blue-gray-200">
          <div className="relative flex justify-between h-max w-full">
            <Typography
              variant="small"
              className={`${userGroups && userGroups?.length > 0 ? "text-blue-gray-600 font-normal" : 'text-red-500'}`}>
              <span className="line-clamp-1" >{userGroups && userGroups?.length > 0
                ? (userGroups?.length > 1 ?
                  `Vos groupes et rôles` : `votre groupe et rôle`) +
                ` : 
                ${userGroups.map((group: GroupUser) => group.Group.name).join(', ')} ` :
                'Vous devez choisir un groupe'}
              </span>
            </Typography>
            <div className="h-5 w-5 mr-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="grey">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd">
                </path>
              </svg>
            </div>
          </div>
        </MenuHandler>
        <MenuList className="w-respLarge border-[1px] bg-transparent !-ml-6 shadow-none border-none ">
          <div className="bg-white divide-y-[1px] p-4 shadow-lg rounded-xl border-[1px] border-blue-gray-50">
            {groups.map((group: Group) =>
              <ListItem
                key={group.id}
                className="p-0">
                <label
                  htmlFor={group.id.toString()}
                  className="flex w-full cursor-pointer items-center px-3 py-2"
                >
                  <ListItemPrefix className="mr-3">
                    <Checkbox
                      color="cyan"
                      onChange={() => {
                        if (userGroups.find((groupUser: GroupUser) => groupUser.groupId === group.id)) {
                          setUserGroups(userGroups.filter((groupUser: GroupUser) => groupUser.groupId !== group.id));
                        } else {
                          const newGroupUser = new GroupUser({ groupId: group.id, Group: group, role: Role.MEMBER });
                          userGroups.push(newGroupUser);
                          setUserGroups([...userGroups]);
                        }

                      }}
                      onClick={(e) => e.stopPropagation()}
                      id={group.id.toString()}
                      checked={userGroups.find((groupU: GroupUser) => groupU.groupId === group.id) ? true : false}
                      ripple={false}
                      className="hover:before:opacity-0 rounded-full"
                      containerProps={{
                        className: "p-0",
                      }}
                    />
                  </ListItemPrefix>
                  <Typography>
                    {group.name}
                  </Typography>
                </label>
                {userGroups.find((groupUser: GroupUser) => groupUser.groupId === group.id) &&
                  <div className="flex w-max m-2 gap-4 flex-1 ">
                    <label
                      htmlFor="modo"
                      className="text-xs italic w-max text-blue-gray-300">
                      {userGroups.find((groupUser: GroupUser) => (groupUser.groupId === group.id && groupUser.role === Role.MODO))
                        ? "conciliateur"
                        : "pas conciliateur"}
                    </label>
                    <Switch
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        e.stopPropagation();
                        setUserGroups(userGroups.map((groupUser: GroupUser) => {
                          if (groupUser.groupId === group.id) {
                            return {
                              ...groupUser,
                              role: groupUser.role === Role.MODO ? Role.MEMBER : Role.MODO,
                            };
                          }
                          return groupUser;
                        }));
                      }}
                      color="orange"
                      checked={userGroups.find((groupUser: GroupUser) => (groupUser.groupId === group.id && groupUser.role === Role.MODO)) ? true : false}
                      id="modo"
                      ripple={false}
                      className="h-full w-full "
                      containerProps={{ className: "w-10 h-5" }}
                      circleProps={{ className: "before:hidden left-0.5 border-none bg-gray-200" }}
                    />
                  </div>}
              </ListItem>)}
          </div>
        </MenuList>
      </Menu>
    </div>
  );
}