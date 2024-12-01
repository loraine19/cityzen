import { Link } from "react-router-dom";
import NavBarBottom from "../../components/NavBarBottom";
import NavBarTop from "../../components/NavBarTop";
import { Card, CardBody } from "@material-tailwind/react";

export default function RulesPage() {
    return (
        <>
            <div className="Body gray">
                <header className="px-4">
                    <NavBarTop />
                    <div className="flex justify-between items-center">
                        <h1 className="text-4xl px-4 pb-4">
                            <strong>Les règles de communauté</strong> dans votre
                            quartier
                        </h1>
                        <Link to={`/`}>
                            <button
                                type="button"
                                className="bg-gray-500 w-12 h-12 rounded-full flex items-center justify-center mr-2"
                            >
                                <span className="material-symbols-outlined text-white ">
                                    close
                                </span>
                            </button>
                        </Link>
                    </div>
                </header>
                <main>
                    <Card className="my-4 mx-4">
                        <CardBody>
                            <h2 className="text-2xl font-bold text-blue-600 mb-4">
                                Lorem ipsum dolor sit amet consectetur
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Earum, amet saepe nemo vitae
                                consequuntur, officiis tempora laboriosam beatae
                                molestias dolores aliquid magnam veritatis sunt
                                aliquam.
                            </p>
                            <h2 className="text-2xl font-bold text-blue-600 my-4">
                                Lorem ipsum dolor
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Perspiciatis omnis vitae,
                                eaque corporis sapiente, cumque saepe voluptas
                                odio nobis nisi dignissimos esse quibusdam
                                tempora a.
                            </p>
                        </CardBody>
                    </Card>
                </main>
                <NavBarBottom />
            </div>
        </>
    );
}
