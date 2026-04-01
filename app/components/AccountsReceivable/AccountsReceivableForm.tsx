import { TAccountsReceivable } from "@/app/models/TAccountsReceivable";
import { AccountsReceivableList } from "./AccountsReceivableList";

type Props = {
    accountsReceivable: TAccountsReceivable[]
}

export default function AccountsReceivableForm({accountsReceivable}:Props){

    return<>
    <p>AccountsReceivableForm</p>
    <AccountsReceivableList
    accountsReceivable={accountsReceivable}
    />
    </>
}