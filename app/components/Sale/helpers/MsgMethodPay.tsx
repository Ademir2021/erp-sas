type Props ={
    msg:string
}
export function MsgMethodPay ({msg}:Props){
  return (
  <div className="p-3">
          <p className="flex-1 text-center rounded-md bg-red-50 p-2 text-sm font-medium text-red-600">
            {msg}
          </p>
        </div>
  )
}