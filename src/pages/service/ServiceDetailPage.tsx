import { useNavigate, useParams } from 'react-router-dom';
import NavBarTop from '../../components/NavBarTop';
import SubHeader from '../../components/SubHeader';
import { useContext, useEffect, useState } from 'react';
import CTAMines from '../../components/CATMines';
import UserContext from '../../contexts/user.context';
import { AcceptUserResp, deleteElement, GetCategory, imIn, takeElement } from '../../functions/GetDataFunctions';
import DataContext from '../../contexts/data.context';
import { action, Post, PostL, PostUser, Service } from '../../types/class';
import ServiceDetailComp from '../../components/servicesComps/ServiceDetailComp';
import parse from 'html-react-parser';
import CTA from '../../components/CTA';
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

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    //////CTAVALUES
    const category = GetCategory(selectedService)
    const type = selectedService.type === "get" ? "demande" : "offre"
    const mines = found?.user_id === user.id ? true : false

    const iResp = selectedService.user_id_resp === user.user_id ? true : false
    const isValidated = selectedService.status >= 2 ? true : false
    const disabledCTA = mines || iResp ? true : false
    const disabledEditCTA = selectedService.user_id_resp ? true : false


    const handleTake = (id: number) => {
        takeElement(id, serviceList, setServiceList, user)
        setDataInLocal({ ...data, services: serviceList })
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

    const buttonsValidate: action[] = [
        {
            icon: 'Besoins d\'aide',
            title: `Besoins d'aide`,
            body: JSON.stringify(data.services.find((element: any) => element.id === id)),
            function: () => { navigate(`/litige/create/${selectedService.id}`) }
        },
        {
            icon: 'Terminer',
            title: "Terminer",
            body: JSON.stringify(data.services.find((element: any) => element.id === id)),
            function: () => { handleFinish(selectedService.id) }
        },
    ]

    const buttons: action[] = [
        {
            icon: iResp ? `Vous avez déjà sélectionné cette ${type}` : `Selectionner ${selectedService.title}`,
            title: `Repondre à ${type} ${selectedService.title}`,
            body: `Repondre à ${type} ${selectedService.title}`,
            function: () => { handleTake(selectedService.id) }
        },
        {
            icon: 'Annuler',
            title: `Annuler votre réponse à ${type} ${selectedService.title}`,
            body: `Annuler votre réponse à ${type} ${selectedService.title}`,
            function: () => { handleTake(selectedService.id) }
        },
    ]

    useEffect(() => {

    }, [serviceList])

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
                        handleValidate={(id: number) => handleValidate(id)} /></div>
            </main>

            {mines ?
                <CTAMines id={selectedService.id}
                    values={isValidated ? buttonsValidate : undefined}
                />
                :
                <CTA
                    addBtn={true}
                    disabled={disabledCTA}
                    cancelBtn={iResp}
                    values={buttons}
                    element={selectedService} />
                // <CTAMines id={selectedService.id} values={CTAValues} disabled1={false} disabled2={false} />
            }

        </div >
    )
} 