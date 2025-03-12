import { Popover, PopoverHandler, Avatar, PopoverContent, Typography, List, ListItem, ListItemPrefix } from "@material-tailwind/react"
import { Icon } from "./IconComp"
import { Profile } from "../../../domain/entities/Profile"

type ProfileDivProps = { profile: Profile, size?: string }
export const ProfileDiv: React.FC<ProfileDivProps> = ({ profile, size = 'sm' }) => {
    const textSize = size === "xl" && "h5" || size === "sm" && "h6" || "small"
    const texteSize2 = size === "xl" && "text-lg" || size === "sm" && "text-sm" || "hidden"

    return (
        <div className="flex items-center px-0 gap-2">
            <Popover placement="bottom-start">
                <PopoverHandler>
                    <Avatar
                        src={profile?.image as string || "/image/person.svg"}
                        size={size as any}
                        alt="avatar"
                        className="BgUser shadow" />
                </PopoverHandler>
                <PopoverContent className="w-72">
                    <div className="mb-4 flex items-center gap-4 border-b border-blue-gray-50 pb-4">
                        <Avatar
                            src={profile?.image as string || "/image/person.svg"}
                            size="sm"
                            alt="avatar"
                            className="BgUser border-blue-gray-500" />
                        <div className="flex flex-col">
                            <Typography
                                variant="h6"
                                color="blue-gray">{profile?.firstName} {profile?.lastName}
                            </Typography>
                            <Typography
                                variant="small"
                                className="font-normal text-blue-gray-500">
                                {profile?.skills}
                            </Typography>
                        </div>
                    </div>
                    <List className="p-0">
                        <ListItem className="rounded-2xl !py-0">
                            <ListItemPrefix>
                                <Icon
                                    icon="distance"
                                    fill
                                    size="2xl"
                                    color="blue-gray" />
                            </ListItemPrefix>
                            {profile?.Address?.city}, {profile?.Address?.zipcode}
                        </ListItem>
                    </List>
                </PopoverContent>
            </Popover>
            <div className="flex flex-col">
                <Typography
                    variant={textSize}
                    color="blue-gray"
                    className="border-b border-blue-gray-200 pr-4">
                    {profile?.firstName} {profile?.lastName}
                </Typography>
                <Typography
                    className={`font-normal text-blue-gray-500 ${texteSize2}`}>
                    ◦ {profile?.skills}
                </Typography>
            </div>
        </div>


    )
}