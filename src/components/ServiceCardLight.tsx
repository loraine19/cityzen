import { Card, CardBody, Typography } from "@material-tailwind/react";
import { service } from "../types/service";
//import { userProfile } from "../types/user";
import { Link } from "react-router-dom";

interface ServiceCardProps {
    service: service;
}

export default function ServiceCardLight(props: ServiceCardProps) {
    const { service } = props;

    return (
        <>
            <Card color="white" shadow={false} className="w-full h-fit px-4 pt-4 !text-gray-800 ">
                <CardBody className=" p-0 border-b-[1px] border-gray-300 lg:border-none pb-4">
                    <div className="flex justify-between items-center">
                        <Typography variant="h5" className="font-bold">
                            {service.title}
                        </Typography>
                        <Link to={`/service/${service.id}`}>
                            <button type="button" className="bg-transparent w-8 h-8 rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-gray-800 scale-75">arrow_forward</span>
                            </button>
                        </Link>
                    </div>

                    <Typography className="text-sm">
                        <span className="line-clamp-2">{service.description}</span>
                    </Typography>
                </CardBody>
            </Card>
        </>
    );
}
