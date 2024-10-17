import { PiWarningCircleFill } from "react-icons/pi"

interface HealthScore {
  yearOfStudy: number
}

const CautionCard: React.FunctionComponent<HealthScore> = ({ yearOfStudy }) => {
  return (
    <>
      {yearOfStudy === 4 ? (
        <div
          className="flex flex-col gap-2 bg-white rounded-md p-5 text-red-700
         shadow-lg"
        >
          <p className="flex flex-row gap-1 items-center text-xl font-bold">
            <PiWarningCircleFill size={24} />
            Caution
          </p>
          <p className="font-medium">
            For the resident who is not going to be here anymore, please contact the owner
          </p>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default CautionCard
