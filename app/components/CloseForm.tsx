import CloseIcon from '@mui/icons-material/Close';

type Props = {
    setCloseForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CloseForm({
    setCloseForm
}: Props) {
    return (
        <div className="flex mb-2 justify-end">
        <button
        className='cursor-pointer'
            type='button'
            onClick={() => setCloseForm(prev => !prev)} 
        >
            <CloseIcon fontSize='medium' titleAccess='Close' />
        </button>
        </div>
    )
}