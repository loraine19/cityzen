import { Avatar, Typography } from "@material-tailwind/react";
import Popover, { PopoverContent, PopoverHandler } from "@material-tailwind/react/components/Popover";
import { Participant } from "../../../../../domain/entities/Participant";
import { Icon } from "../../../common/IconComp";
import { OnlineDot } from "../../../common/onlineDot";

type AvatarStackProps = { avatarDatas: Participant[] };
export function AvatarStack(props: AvatarStackProps) {
    const { avatarDatas } = props;
    return (
        <div className="flex items-center -space-x-3 max-w-100% overflow-auto rounded-full mr-2">
            {avatarDatas?.map((Participant: Participant, index) =>
                <Popover key={index} >
                    <PopoverHandler>
                        <Avatar
                            variant="circular"
                            alt={Participant.User?.Profile?.firstName + " " + Participant.User.Profile?.lastName}
                            className="border-2 border-white hover:z-10 focus:z-10 BgUser"
                            src={Participant.User?.Profile?.image as string || "../image/person.svg"}
                            size="sm"
                        />
                    </PopoverHandler>
                    <PopoverContent className="!z-[1000]  !ml-24 !py-2">
                        <div className="p-2  flex items-center gap-4 ">

                            <Icon
                                color='orange'
                                fill
                                style="absolute !p-[0.3rem] !bg-orange-100 top-3 left-12  z-50  "
                                size='lg'
                                link={`/chat?with=${Participant?.userId}`}
                                bg
                                title="Envoyer un message"
                                icon="sms"
                            />
                            <div className="relative">
                                <Avatar
                                    src={Participant.User?.Profile?.image as string || "/image/person.svg"}
                                    size="sm"
                                    alt="avatar"
                                    className="BgUser border-blue-gray-500" />
                                <OnlineDot id={Participant?.userId} />
                            </div>
                            <div className="flex flex-col pl-2">
                                <Typography
                                    variant="h6"
                                    color="blue-gray">{Participant.User?.Profile?.firstName} {Participant.User?.Profile?.lastName}
                                </Typography>
                                <Typography
                                    variant="small"
                                    className="font-normal text-blue-gray-500  border-t border-blue-gray-50 pt-2">
                                    {Participant.User?.Profile?.Address?.city}
                                </Typography>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>

            )
            }
        </div>
    );
}