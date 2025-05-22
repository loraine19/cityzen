import { Radio } from "@material-tailwind/react";
import { VoteOpinion, VoteTarget } from "../../../../../domain/entities/Vote";
import { PoolSurveyView } from "../../../../views/viewsEntities/poolSurveyViewEntity";
import { VoteDTO } from "../../../../../infrastructure/DTOs/VoteDTO";
import DI from "../../../../../di/ioc";
import { useState } from "react";
import { AlertModal } from "../../../common/AlertModal";
import { AlertValues } from "../../../../../domain/entities/Error";

export const VoteCard = ({ vote, refetch, open, close }: { vote: PoolSurveyView, refetch: (opinion: VoteOpinion) => void, open: boolean, close: () => void }) => {
    const [opinion, setOpinion] = useState<VoteOpinion>(vote.myOpinion ?? VoteOpinion.OK)
    const voteDTO = new VoteDTO({
        targetId: vote.id, target: vote.typeS === VoteTarget.POOL ?
            'POOL' as VoteTarget :
            'SURVEY' as VoteTarget,
        opinion
    } as VoteDTO);
    const postVote = async (data: VoteDTO) => await DI.resolve('postVoteUseCase').execute(data)
    const updateVote = async (data: VoteDTO) => await DI.resolve('updateVoteUseCase').execute(data)

    const body =
        <div className="flex gap-10">
            <Radio
                name="vote"
                label="Contre"
                value={VoteOpinion.NO}
                color='red'
                checked={voteDTO.opinion === VoteOpinion.NO}
                onChange={() => setOpinion(VoteOpinion.NO)}
            />
            <Radio
                name="vote"
                label="pas d'avis"
                value={VoteOpinion.NO}
                color='orange'
                checked={voteDTO.opinion === VoteOpinion.WO}
                onChange={() => setOpinion(VoteOpinion.WO)}
            />
            <Radio
                name="vote"
                label="Pour"
                value={VoteOpinion.OK}
                color='green'
                checked={voteDTO.opinion === VoteOpinion.OK}
                onChange={() => setOpinion(VoteOpinion.OK)}
            />
        </div>
    const [voteNotification, setVoteNotification] = useState<string | undefined>(undefined)

    const alertValues: AlertValues = {
        handleConfirm: async () => {
            const ok = vote.IVoted ? await updateVote(voteDTO) : await postVote(voteDTO)
            if (ok.error) {
                setVoteNotification(ok.error.message)
            }
            else {
                refetch(opinion);
                close();
            }
        },
        title: `${vote.IVoted ? 'Modifier mon vote ' : 'Voter'} pour ${vote.title} `,
        confirmString: vote.IVoted ? 'Modifier' : 'Confirmer',
        element: body,
        disableConfirm: false,
        isOpen: open,
        close: close,
        notif: voteNotification,
    }
    return (
        <div className="bg-cyan-100">
            <AlertModal values={alertValues} />
        </div>
    )
}
