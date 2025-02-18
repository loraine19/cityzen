import { Avatar } from "@material-tailwind/react";
import Popover, { PopoverContent, PopoverHandler } from "@material-tailwind/react/components/Popover";
import { Participant } from "../../../../../domain/entities/Participant";

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
                            alt={Participant.User.Profile?.firstName + " " + Participant.User.Profile?.lastName}
                            className="border-2 border-white hover:z-10 focus:z-10 BgUser"
                            src={Participant.User.Profile?.image as string || "../public/person.svg"}
                            size="sm"
                        />
                    </PopoverHandler>
                    <PopoverContent className="!z-10 rounded-full !py-2">
                        {Participant.User.Profile?.firstName + " " + Participant.User.Profile?.lastName}
                    </PopoverContent>
                </Popover>

            )
            }
        </div>
    );
}