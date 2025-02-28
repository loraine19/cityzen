import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ServiceCategory, ServiceFilter } from "../../../../../domain/entities/Service";
import NavBarBottom from "../../../common/NavBarBottom";
import NavBarTop from "../../../common/NavBarTop";
import SubHeader from "../../../common/SubHeader";
import TabsMenu from "../../../common/TabsMenu";
import { Label, TabLabel } from "../../../../../domain/entities/frontEntities";
import { SkeletonGrid } from "../../../common/Skeleton";
import DI from '../../../../../di/ioc';
import { getLabel } from "../../../../views/viewsEntities/utilsService";
import { LoadMoreButton } from "../../../common/LoadMoreBtn";
import { serviceCategories } from "../../../../constants";
import IssueCard from "./IssueCard";
import { IssueView } from "../../../../views/viewsEntities/issueViewEntity";
import { Radio } from "@material-tailwind/react";
import { useUserStore } from "../../../../../application/stores/user.store";
import { Role } from "../../../../../domain/entities/GroupUser";

export default function ConciationListPage() {
    const [notif, setNotif] = useState<string>('');
    const [tabSelected] = useState<string>('');
    const [mine, setMine] = useState<boolean>(false);
    const [step, setStep] = useState<string>('');
    const [filter, setFilter] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const issueViewModelFactory = DI.resolve('issueViewModel');
    const { issues, isLoading, error, fetchNextPage, hasNextPage, refetch, count } = issueViewModelFactory(step);
    const [Params, setParams] = useSearchParams();
    const params = { filter: Params.get("filter"), category: Params.get("category") }
    const user = useUserStore().user

    useEffect(() => { setCategory(params.category || ''); setFilter(params.filter || '') }, []);

    const filterName = (): string => mine && 'les miens' || filter === ServiceFilter.GET && 'demande' || filter === ServiceFilter.DO && 'offre' || ''



    const filterTab = async (value?: ServiceFilter) => {
        setParams({ filter: value as string || '', category: category });
        if (value !== filter) { setCategory('') }
        setFilter(value || '');
        setMine(false)
        switch (value) {
            case ServiceFilter.MINE: { setMine(true), setStep(''); break; }
            case ServiceFilter.GET: { setMine(false), setStep('') }; break;
            case ServiceFilter.DO: { setMine(false), setStep('') }; break;
            default: { setMine(false), setStep('') }; break;
        }
        setParams({ filter: value as string || '', category: category })
    };

    const serviceTabs: TabLabel[] = [
        { label: "tous", value: '', result: () => filterTab() },
        { label: "demande", value: ServiceFilter.GET, result: () => filterTab(ServiceFilter.GET) },
        { label: "en cours", value: ServiceFilter.DO, result: () => filterTab(ServiceFilter.DO) },
        { label: "terminés", value: ServiceFilter.MINE, result: () => filterTab(ServiceFilter.MINE) },
    ]

    const search = (searchLabel: Label) => {
        const value = searchLabel.value;
        if (value) {
            setCategory(value);
            setParams({ search: tabSelected, category: value });
        }
    };

    useEffect(() => {
        !isLoading && setNotif(count > 0 ? '' : `Aucune concialation ${tabSelected} ${category !== '' && category ? ' ' : ''} n'a été trouvé`);
        console.log(user)
    }, [issues]);

    useEffect(() => {
        const notifUpdate =
            (count === 0 && !isLoading) &&
            `Aucune concialation ${filter !== '' ? getLabel(filter, serviceTabs).toLowerCase() : ''} ${category !== '' ? getLabel(category, serviceCategories).toLowerCase() : ''} n'a été trouvé`
            || error && "Erreur lors du chargement des conciliations, veuillez réessayer plus tard"
            || '';
        setNotif(notifUpdate);
    }, [issues, isLoading, error, filter, category]);

    const divRef = useRef(null);
    const [isBottom, setIsBottom] = useState(false);
    const handleScroll = () => {
        if (divRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = divRef.current;
            if (scrollTop + clientHeight + 2 >= scrollHeight) {
                setIsBottom(true);
                if (hasNextPage) {
                    fetchNextPage();
                }
            } else {
                setIsBottom(false);
            }
        }
    };

    return (
        <div className="Body gray">
            <header className="px-4 !gap-0">
                <NavBarTop />
                <SubHeader
                    closeBtn
                    qty={count}
                    type={`conciliation ${filterName()} ${category ? ServiceCategory[category as string as keyof typeof ServiceCategory] : ''}`} />
                <div className="flex gap-10">
                    <Radio
                        disabled={count > 100}
                        name="modo"
                        label="Je ne suis conciliateur"
                        value={Role.MODO}
                        checked={user.GroupUser?.role === Role.MODO}
                        onChange={() => { user.GroupUser.role = Role.MODO }}
                    />
                    <Radio
                        disabled={count > 100}
                        name="modo"
                        label="Je ne suis pas conciliateur"
                        value={Role.MEMBER}
                        checked={user.GroupUser?.role === Role.MEMBER}
                        onChange={() => {
                            user.GroupUser.role = Role.MEMBER
                        }}
                    />
                </div>
                <TabsMenu labels={serviceTabs} />
                {notif &&
                    <div className="w-full flex justify-center p-8">
                        {notif}
                    </div>}
            </header>
            <main ref={divRef}
                onScroll={() => handleScroll()}
                className="Grid2 ">
                {isLoading || error || user.GroupUser?.role === Role.MEMBER ?
                    [...Array(window.innerWidth >= 768 ? 2 : 1)].map((_, index) => (
                        <SkeletonGrid
                            key={index}
                            count={4} />
                    ))
                    :
                    issues.map((issue: IssueView, index: number) => (
                        <div className="SubGrid" key={index}>
                            <IssueCard
                                issue={issue}
                                change={search}
                                mines={mine}
                                update={refetch} />
                        </div>))}
                <LoadMoreButton
                    isBottom={isBottom}
                    hasNextPage={hasNextPage}
                    handleScroll={() => handleScroll()} />
            </main>
            <NavBarBottom color={'blue-gray'} />
        </div>
    );
}
