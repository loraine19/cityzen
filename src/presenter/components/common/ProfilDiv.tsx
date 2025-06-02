import { Popover, PopoverHandler, PopoverContent, Typography } from "@material-tailwind/react"
import { Icon } from "./IconComp"
import { Profile } from "../../../domain/entities/Profile"
import { DistanceCalculator } from "./CalculatorDistance"
import { useUserStore } from "../../../application/stores/user.store"
import AddressMapOpen from "./mapComps/AddressMapOpen"
import { OnlineDot } from "./onlineDot"
import { User } from "../../../domain/entities/User"
import { ProfileView } from "../../views/viewsEntities/profileViewEntity"
import { GroupUser } from "../../../domain/entities/GroupUser"
import { AvatarUser } from "./AvatarUser"

type ProfileDivProps = { profile: Partial<User>, size?: string }
export const ProfileDiv: React.FC<ProfileDivProps> = ({ size = 'sm', ...props }) => {
    const profile = new ProfileView(props.profile?.Profile as Profile)
    const userDiv = props.profile as User
    const textSize = size === "xl" && "h5" || size === "sm" && "h6" || "small"
    const texteSize2 = size === "xl" && "text-lg" || size === "sm" && "text-sm" || "hidden"
    const user = useUserStore(state => state.user)

    return (
        <>
            <div className={`realtive pl-1 pb-0.5 truncate z-50 flex items-center px-0 gap-7`}>
                <Popover placement="bottom-start">
                    <PopoverHandler>
                        <div className={`relative`}>
                            <AvatarUser Profile={profile} avatarSize={size} />
                            <OnlineDot id={profile?.userId} />
                        </div>
                    </PopoverHandler>
                    <PopoverContent className=" w-auto !p-6 z-50 ">
                        <div className="flex gap-6  pb-2 ">
                            <div className="mb-2 gap-4 ">
                                <Icon
                                    color='orange'
                                    fill
                                    style="absolute !bg-orange-100 top-2 left-11  z-50"
                                    size='sm'
                                    link={`/chat?with=${profile?.userId}`}
                                    bg
                                    title="Envoyer un message"
                                    icon="sms"
                                />
                                <AvatarUser Profile={profile} avatarSize={'sm'} />
                            </div>
                            <div className="flex flex-col pl-2">
                                <Typography
                                    variant="h6"
                                    color="blue-gray">{profile?.firstName} {profile?.lastName}
                                </Typography>
                                <Typography
                                    variant="small"
                                    className={profile?.skills ? "font-normal text-blue-gray-500" : 'hidden'}>
                                    • {profile?.skills}
                                </Typography>
                                <div className="font-normal flex flex-col text-blue-gray-500">
                                    {userDiv?.GroupUser?.map((group: GroupUser, index: number) =>
                                        <div
                                            className="!line-clamp-1 "
                                            key={index}>
                                            {'⌖ ' + group.Group?.name}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={`${profile?.addressShared ? '' : 'hover:!event-none'} flex gap-7 relative  pt-2 `}>
                            <div className="relative flex  ">
                                <Icon
                                    disabled={profile?.addressShared ? false : true}
                                    icon="person_pin_circle"
                                    fill bg
                                    size='xl'
                                    style={profile?.addressShared ? '-ml-2' : 'hover:!event-none'}
                                    color={profile?.addressShared ? "cyan" : "gray"} />
                                {profile?.addressShared && profile?.Address &&
                                    <div className={`absolute scale-[0.65] -top-7 -right-4  
                                    ${profile?.addressShared ? 'flex ' : 'hidden'}`}>
                                        <AddressMapOpen
                                            message={<DistanceCalculator
                                                lat1={profile?.Address?.lat}
                                                lon1={profile?.Address?.lng}
                                                lat2={user.Profile?.Address?.lat}
                                                lon2={user.Profile?.Address?.lng} /> as any}
                                            address={profile?.Address} />
                                    </div>
                                }
                            </div>
                            <DistanceCalculator
                                lat1={profile?.Address?.lat}
                                lon1={profile?.Address?.lng}
                                lat2={user.Profile?.Address?.lat}
                                lon2={user.Profile?.Address?.lng} />
                            <br></br>
                            {profile?.Address?.city}, {profile?.Address?.zipcode}
                        </div>
                    </PopoverContent>
                </Popover>
                <div className="flex flex-col truncate">
                    <Typography
                        variant={textSize}
                        color="blue-gray"
                        className="border-b border-blue-gray-200 pr-4  ">
                        {profile?.firstName} {profile?.lastName}
                    </Typography>
                    <Typography
                        className={`font-normal text-blue-gray-500 ${texteSize2} !line-clamp-1  max-w-90% pr-4`}>
                        {userDiv?.GroupUser?.map((group: GroupUser, index: number) =>
                            <span key={index} >
                                {' ⌖ ' + group.Group?.name + ' '}
                            </span>)}
                    </Typography>
                </div>
            </div>
        </>

    )
}