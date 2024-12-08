import { useNavigate, useParams } from 'react-router-dom';
import NavBarTop from '../../../components/NavBarTop';
import SubHeader from '../../../components/SubHeader';
import { useContext, useEffect, useState } from 'react';
import CTAMines from '../../../components/CATMines';
import UserContext from '../../../contexts/user.context';
import { AcceptUserResp, GetCategory, imIn, takeElement } from '../../../functions/GetDataFunctions';
import DataContext from '../../../contexts/data.context';
import { action, Service } from '../../../types/class';
import ServiceDetailComp from '../../../components/servicesComps/ServiceDetailComp';
export default function ServiceDetailPage() {
    const { id } = useParams()
    const { user } = useContext(UserContext);
    const { data, setDataInLocal } = useContext(DataContext)
    const { flags } = data
    const navigate = useNavigate();
    let found = (data.services.find((service: Service) => service.id == parseInt(id!)))
    useEffect(() => {
        if (!found) {
            navigate("/service-" + id)
        }
    }, [found])
    const [selectedService] = useState<Service>(found ? (found) : (data.services[0]))
    const [serviceList, setServiceList] = useState<Service[]>(data.services);
    //////CTAVALUES
    const category = GetCategory(selectedService)
    const type = selectedService.type === "get" ? "demande" : "offre"
    const mines = found?.user_id === user.id ? true : false

    let isPost = selectedService.status === 0 ? true : false
    let isResp = selectedService.status === 1 ? true : false
    let isValidated = selectedService.status === 2 ? true : false
    let isFinish = selectedService.status === 3 ? true : false

    useEffect(() => {
        isPost = selectedService.status === 0 ? true : false
        isResp = selectedService.status === 1 ? true : false
        isValidated = selectedService.status === 2 ? true : false
        isFinish = selectedService.status === 3 ? true : false

    }, [selectedService.status])

    const handleTake = (id: number) => {
        takeElement(id, serviceList, setServiceList, user)
        setDataInLocal({ ...data, services: serviceList })
        console.log("take")
        console.log(selectedService.status)
    }

    const handleValidate = (id: number) => {
        AcceptUserResp(id, serviceList, setServiceList, 2);
        setDataInLocal({ ...data, services: serviceList })
    }
    const handleFinish = (id: number) => {
        AcceptUserResp(id, serviceList, setServiceList, 3);
        setDataInLocal({ ...data, services: serviceList })
    }
    const isFlaged = (element: any) => { return imIn(element, flags, user.id) ? true : false };

    //// AUTHOR


    const buttonsValidate: action[] = [
        {
            icon: isResp && "no" || isValidated && "Besoins d'aide ?" || isFinish && `finis le ${selectedService.finished_at?.toLocaleDateString()}` || 'no',
            title: isResp && "no" || isValidated && "Ouvrir un litige ?" || 'no',
            body: selectedService.title,
            function: () => {
                if (isValidated) { isValidated && navigate(`/litige/create/${selectedService.id}`) }
                else { return null }
            }
        },
        {
            icon: isResp && "no" || isValidated && 'Service finis ?' || isFinish && '' || 'no',
            title: isResp && "no" || isValidated && "Cloturer le service ?" || 'no',
            body: selectedService.title,
            function: () => {
                if (isResp) { handleFinish(selectedService.id) }
                else { return null }
            }
        },
        {
            icon: isResp && "valider ?" || isValidated && '' || isFinish && '' || '',
            title: isResp && "Accepter la reponse" || '',
            body: selectedService.title,
            function: () => {
                if (isResp) { handleValidate(selectedService.id) }
                else { return null }
            }

        },
    ]
    /// RESP 
    const buttons: action[] = [
        {
            icon: isResp && "annuler ?" || isValidated && '' || isFinish && `finis le ${selectedService.finished_at?.toLocaleDateString()}` || '',
            title: isResp && "Vous annulez votre réponse" || isValidated && "Ouvrir un litige ?" || '',
            body: selectedService.title + 'c',
            function: () => {
                if (isResp) { handleTake(selectedService.id) }
                else { return null }
            }
        },
        {
            icon: isPost && "répondre au service?" || isResp && '' || '',
            title: isPost && "postuler au service" || isResp && '' || '',
            body: selectedService.title + "g",
            function: () => {
                if (isPost) { handleTake(selectedService.id) }
                else { return null }
            }
        }
    ]

    // console.log(buttons[1].function())





    return (
        <div className="Body cyan">
            <header className="px-4">
                <NavBarTop />
                <SubHeader type={`${type} de service ${category}`}
                    closeBtn />
            </header>
            <main>
                <div className="flex  pt-6 pb-1 h-full">
                    <ServiceDetailComp
                        service={selectedService}
                        mines={mines} change={() => { }}
                        isFlaged={isFlaged(selectedService)}
                        handleValidate={(id: number) => handleValidate(id)} />
                </div>
            </main>

            {mines ?
                <CTAMines id={selectedService.id}
                    values={buttonsValidate}
                    disabled1={isFinish}
                    disabled2={isFinish}
                    button3={isResp ? buttonsValidate[2] : undefined}
                />
                :
                <CTAMines
                    id={selectedService.id}
                    values={buttons}
                />
            }

        </div >
    )
} 