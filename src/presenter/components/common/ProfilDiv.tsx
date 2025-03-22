import { Popover, PopoverHandler, Avatar, PopoverContent, Typography } from "@material-tailwind/react"
import { Icon } from "./IconComp"
import { Profile } from "../../../domain/entities/Profile"
import { DistanceCalculator } from "./CalculatorDistance"
import { useUserStore } from "../../../application/stores/user.store"
import AddressMapOpen from "./mapComps/AddressMapOpen"

type ProfileDivProps = { profile: Profile, size?: string }
export const ProfileDiv: React.FC<ProfileDivProps> = ({ profile, size = 'sm' }) => {
    const textSize = size === "xl" && "h5" || size === "sm" && "h6" || "small"
    const texteSize2 = size === "xl" && "text-lg" || size === "sm" && "text-sm" || "hidden"
    const user = useUserStore(state => state.user)


    return (
        <>
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

                            <Icon
                                color='orange'
                                fill
                                style="absolute !p-[0.3rem] !bg-orange-100 top-2 left-11  z-50  "
                                size='lg'
                                link={`/chat?with=${profile?.userId}`}
                                bg
                                title="Envoyer un message"
                                icon="sms"
                            />
                            <Avatar
                                src={profile?.image as string || "/image/person.svg"}
                                size="sm"
                                alt="avatar"
                                className="BgUser border-blue-gray-500" />
                            <div className="flex flex-col pl-2">
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
                        <div
                            className={`${profile?.addressShared ? '' : 'hover:!event-none'} flex gap-4 relative rounded-2xl !py-0`}>
                            <div className="relative flex  pl-1 pr-4">

                                <Icon
                                    disabled={profile?.addressShared ? false : true}
                                    icon="person_pin_circle"
                                    fill
                                    size="4xl"
                                    style={profile?.addressShared ? '!p-0' : 'hover:!event-none'}
                                    color={profile.addressShared ? "cyan" : "gray"} />

                                {profile?.addressShared && profile?.Address &&
                                    <div className={`absolute  -top-2 -right-2 ${profile?.addressShared ? 'flex' : 'hidden'}`}>
                                        <AddressMapOpen
                                            message={<DistanceCalculator
                                                lat1={profile?.Address?.lat}
                                                lon1={profile?.Address?.lng}
                                                lat2={user.Profile?.Address?.lat}
                                                lon2={user.Profile?.Address?.lng} /> as any}
                                            address={profile?.Address} />
                                    </div>}
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
        </>

    )
}