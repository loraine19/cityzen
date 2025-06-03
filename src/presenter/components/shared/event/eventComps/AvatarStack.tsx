import { Typography } from "@material-tailwind/react";
import Popover, { PopoverContent, PopoverHandler } from "@material-tailwind/react/components/Popover";
import { Participant } from "../../../../../domain/entities/Participant";
import { Icon } from "../../../common/IconComp";
import { OnlineDot } from "../../../common/onlineDot";
import { AvatarUser } from "../../../common/AvatarUser";

type AvatarStackProps = { avatarDatas: Participant[] };
export function AvatarStack(props: AvatarStackProps) {
    const { avatarDatas } = props;

    return (
        <div className="flex items-center -space-x-3 max-w-100% overflow-auto rounded-full mr-2">
            {avatarDatas?.map((Participant: Participant, index) =>
                <Popover key={index} >
                    <PopoverHandler>
                        <div className="relative hover:!z-10">
                            <AvatarUser
                                Profile={Participant.User?.Profile}
                                avatarSize={'sm'}
                                avatarStyle="border-2 !h-[2.7rem] !w-[2.7rem] !border-white !hover:z-10 !focus:z-10" />
                        </div>
                    </PopoverHandler>
                    <PopoverContent className="!z-[1000]  !ml-24 !py-2">
                        <div className="p-2 w-auto flex items-center gap-4 ">
                            <div className="relative py-3 pr-2">
                                <Icon
                                    color='orange'
                                    fill
                                    style="absolute  !bg-orange-100 top-0 -right-2.5  z-50  "
                                    size='sm'
                                    link={`/chat?with=${Participant?.userId}`}
                                    bg
                                    title={`Envoyer un message à ${Participant.User?.Profile?.firstName}`}
                                    icon="sms"
                                />
                                <div className="relative">

                                    <AvatarUser
                                        Profile={Participant.User?.Profile} avatarSize={'sm'}
                                        avatarStyle="border-2 border-white scale-90" />
                                    <OnlineDot id={Participant?.userId} />
                                </div>
                            </div>
                            <div className="flex flex-col pl-2">
                                <Typography
                                    variant="h6"
                                    color="blue-gray">{Participant.User?.Profile?.firstName} {Participant.User?.Profile?.lastName}
                                </Typography>
                                <Typography
                                    variant="small"
                                    className="font-normal text-blue-gray-500  border-t border-blue-gray-50 pt-2">
                                    {Participant.User?.GroupUser?.map((group, index) =>
                                        <p key={index}
                                            className="!line-clamp-1">⌖ {group.Group.name.split(':')[0]}</p>)}
                                </Typography>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>

            )
            }
        </div >
    );
}