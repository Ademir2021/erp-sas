import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

type Props = {
    showForm: boolean
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ShowForm({ showForm, setShowForm }: Props) {
    return (
        <button
            type="button"
            onClick={() => setShowForm(prev => !prev)}
            className="cursor-pointer"
        >
            {showForm
                ? <ExpandLessIcon fontSize="large" />
                : <ArrowForwardIosIcon fontSize="small" />
            }
        </button>
    )
}