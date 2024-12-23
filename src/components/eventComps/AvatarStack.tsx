import { Avatar } from "@material-tailwind/react";
import Popover, { PopoverContent, PopoverHandler } from "@material-tailwind/react/components/Popover";
import { Participant } from "../../types/class";

type AvatarStackProps = { avatarDatas: Participant[] };
export function AvatarStack(props: AvatarStackProps) {
    const { avatarDatas } = props;
    console.log(avatarDatas[0].User.Profile)
    return (
        <div className="flex items-center -space-x-3">
            {avatarDatas?.map(({ User }, index) =>

                <Popover key={index}>
                    <PopoverHandler>
                        <Avatar

                            variant="circular"
                            alt={User.Profile.firstName + " " + User.Profile.lastName}
                            className="border-2 border-white hover:z-10 focus:z-10"
                            src={User.Profile.image as string}
                            size="sm"
                        />

                    </PopoverHandler>
                    <PopoverContent>
                        {User.Profile.firstName + " " + User.Profile.lastName}
                    </PopoverContent>
                </Popover>

            )
            }
        </div>
    );
}